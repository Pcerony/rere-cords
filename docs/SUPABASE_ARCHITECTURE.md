# Supabase 安全用具预约系统技术说明

本文件记录当前安全用具预约功能的数据库契约与信任边界，供维护者和后续 AI 开发时参考。完整设置步骤见 [supabase-setup.md](supabase-setup.md)。已知 migration 文件：

- [`202609290001_safety_tool_reservations.sql`](https://github.com/Pcerony/rere-cords/blob/main/supabase/migrations/202609290001_safety_tool_reservations.sql)
- [`202609290002_safety_tool_admin.sql`](https://github.com/Pcerony/rere-cords/blob/main/supabase/migrations/202609290002_safety_tool_admin.sql)
- [`202609290003_student_number.sql`](https://github.com/Pcerony/rere-cords/blob/main/supabase/migrations/202609290003_student_number.sql)

截至 2026-10-31，公开站点的 Supabase URL 指向项目 ref `mtruobyauroqwuefanlp`。此标识不是密钥。Publishable key 是公开浏览器配置；文档不记录其具体值。绝不使用或发布 Secret/`service_role` key。

> 当前 OneDrive 工作副本可能比 GitHub `main` 落后，且本地未必包含上述文件。执行迁移前先检查当前仓库和 Supabase 已应用版本，不要重复手工拼接 SQL。线上公开实现可以用于核对；以仓库已审查 migration 和 Dashboard 实际 schema 为准。

## 数据模型

### `public.equipment_inventory`

| 字段 | 含义 |
| --- | --- |
| `equipment_id` | 主键，枚举 `cutter`、`goggles`、`mask`、`gloves` |
| `display_name` | 显示名 |
| `total_units` | 总套数，约束 0–50；初始化每种 2 套 |
| `updated_at` | 更新时间 |

库存变化不是逐笔扣减的单独计数。可用库存由预约日期区间中状态有效的预约明细动态计算，因此对归还/取消日期的未来预约也可提前规划。

### `public.reservations`

关键字段：`id` UUID、唯一 `reservation_code`、`participant_name`、`student_number`、`course`、`email`、`pickup_date`、`return_date`、`status`、`created_at`、`updated_at`。学生番号在 migration 003 添加；新申请要求 1–40 字符，旧申请可为 NULL。

状态枚举为 `pending`、`ready`、`cancelled`、`returned`。合法转换：`pending → ready | cancelled`；`ready → cancelled | returned`。`cancelled`、`returned` 是终态。日期约束包括归还日不早于领取日、最远提前 365 天、最长 14 天（日期差最多 13）。

### `public.reservation_items`

每条记录由 `(reservation_id, equipment_id)` 组成复合主键，关联一个预约和一种库存道具，`quantity` 为 1 或 2。删除父预约时明细级联删除。四种道具：小刀 `cutter`、护目镜 `goggles`、防尘口罩 `mask`、安全手套 `gloves`。

### `public.reservation_admins`

私有管理员白名单，以 `auth.users.id` 为主键并级联删除。创建 Auth 账号并不自动授权管理页面，必须显式加入该表。

## RPC 与数据流合同

所有函数使用 Supabase PostgREST RPC。输入输出名称是前后端契约，改名时必须同时更新客户端、SQL migration、测试和本文件。

### `get_equipment_availability(p_pickup_date date, p_return_date date, p_items jsonb)`

可由公开匿名用户和已登录用户调用。返回每种道具的 `equipment_id`、`total_units`、`available_units`、`earliest_available_date`。输入 `p_items` 格式为 `{ "cutter": 1, "mask": 2 }`。日期和道具必须经过数据库验证。最早可约日期按指定借用天数长度向后寻找。

### `create_equipment_reservation(...)`

公开申请 RPC。当前参数：

```text
p_name text
p_student_number text
p_course text
p_email text
p_pickup_date date
p_return_date date
p_items jsonb
```

成功返回 JSON：`{ ok: true, reservation_id, reservation_code, status: "pending" }`。库存冲突返回 `{ ok: false, code: "UNAVAILABLE", conflicts: [...] }`，每项包含道具、可借数量和最早日期；冲突不应写入半条预约。

数据库端完成字段、日期、数量验证，再以事务级 advisory lock 串行化预约创建，重新算所选完整日期区间库存，确认所有道具可用后写入父预约和明细。浏览器先前查到的余量不能作为成功保证。Supabase RPC 调用整体在数据库事务内运行。

迁移 003 为老 RPC 改名为私有实现，新增带 `p_student_number` 的公开签名；成功时在同一个 RPC 事务中写入学生番号。部署新前端但未应用 migration 003 会因 RPC 签名不匹配而无法提交。

### `is_reservation_admin()`

仅 `authenticated` 可执行。根据 `auth.uid()` 查询 `reservation_admins` 并返回布尔值。它只用于服务端权限判定，不能把前端隐藏/显示页面当作授权边界。

### `admin_set_reservation_status(p_reservation_id uuid, p_status text)`

仅 `authenticated` 可执行；函数内部再次要求调用者是管理员，并锁定目标预约行、校验状态转换后更新状态。客户端不能直接写状态字段。

### 实时库存通知

数据库触发器在预约和库存表插入、更新或删除后广播 `inventory_changed` 到 Realtime topic `rerecords-equipment-inventory`。公开预约页订阅广播刷新库存。无法订阅时页面通过重新获得焦点和 30 秒轮询恢复。实时消息是刷新提示，不是库存数据本身；仍须请求 availability RPC。

## 权限和威胁边界

- 三张主业务表启用 RLS。对 `anon` 和 `authenticated` 撤销直接表权限；公开用户不能直接 SELECT/INSERT/UPDATE `reservations` 或 `reservation_items`。
- `reservation_admins` 启用 RLS 且没有公开读取策略。
- `authenticated` 有表级 SELECT 能力，但对应行级策略要求 `is_reservation_admin()`。未授权用户即使登录也不能看到报名个人资料。
- 公开角色只能调用被明确授予的库存汇总 RPC 和创建预约 RPC。安全定义函数使用空 `search_path` 并限定 schema 引用；内部库存函数不向普通角色开放。
- 管理员邮箱密码由 Supabase Auth 管理，网页没有注册入口。关闭公开注册，管理员由 Supabase Dashboard 邀请/创建，然后登记 User UUID 到管理员白名单。
- Publishable/旧版 anon key 本质上是公开标识，不承担保密。真正保护依赖 RLS、函数授权、函数内部校验。Secret/service_role key 可绕过 RLS，禁止放在浏览器、仓库或静态托管配置中。
- 邮件不由 Supabase 自动发送。管理员页面用 `mailto:` 预填收件人和日英草稿，操作人检查后手动发送；之后手动确认 `ready`。不要将“打开邮件草稿”视为发送成功或批准。

## 新报名系统的建议边界

新的“活动报名”与安全道具预约是不同领域：预约围绕库存、日期区间和借还状态；报名围绕报名人、报名资格、报名材料和审核/录取状态。建议独立命名表（例如 `event_registrations`、`event_registration_files`）和独立 RPC/页面，不修改预约现有状态机。

开始设计前先确认报名字段、重复报名规则、截止日期、附件要求、审核角色、撤回规则、保留期限和报名者回执。每个个人信息表单都采用最少必要字段。学生番号、邮箱及附件属于个人信息：默认不可公开读取，管理员按最小权限访问，设置清晰的数据删除时间和备份清理办法。报名人数/剩余名额如需并发控制，应由数据库事务原子校验，不要依赖前端计数。

是否复用同一 Supabase 项目应按权限隔离与运营所有权决定：共用项目并不代表共用表、策略或管理员角色。可按业务分离管理员白名单/RPC；若报名数据敏感度、保留周期、管理员团队或可用性要求不同，应评估独立 Supabase 项目。不要在未评估 RLS 边界前让报名管理员自动获得预约个人资料访问权，反之亦然。

## 迁移与操作安全

1. 检查 Supabase 当前项目 ref 和已应用 migration，确认与目标环境相符。
2. 在仓库新增带序号/日期的 SQL migration；避免覆盖已执行 migration。对已有数据用可回滚或兼容的增量变更。
3. migration 至少定义 schema/约束、RLS、显式 revoke/grant、必要 policy、函数权限、状态机和触发器；所有 `SECURITY DEFINER` 函数固定 `search_path` 并做调用者校验。
4. 在测试/预览环境验证匿名权限、未授权已登录用户、管理员、边界日期、库存同时提交及失败无部分写入。
5. 按项目设置流程执行 SQL，再部署前端。破坏性迁移和不可恢复数据删除须先制定备份/恢复步骤。
6. 不把真实学生、邮箱或预约详情复制到文档、测试 fixture、截图或 issue。测试记录使用虚构数据，完成后按清理策略删除。

## 排障速查

| 现象 | 优先检查 |
| --- | --- |
| 页面显示 Supabase 未连接 | GitHub Actions 的 URL / Publishable key 配置和部署构建产物；两者应来自同一项目 |
| `create_equipment_reservation` 找不到或参数不匹配 | migration 003 是否已在正确 Supabase 项目执行；检查当前 function overload |
| Table Editor 看得到预约但看不到道具 | 道具明细在 `reservation_items`，按 `reservation_id` 关联；管理台通过嵌套查询读取 |
| 匿名用户可以读取预约详情 | 立即检查 grants、RLS 是否启用和所有 SELECT policy；不要依赖页面不公开链接 |
| 管理员登录后没有记录/提示无权限 | Auth User UUID 是否在 `reservation_admins`；migration 002 与 `is_reservation_admin()` 是否正确部署 |
| 状态操作失败 | 检查当前状态是否允许该转换；业务规则只允许 pending→ready/cancelled、ready→cancelled/returned |
| 库存未即时变化 | 看 Realtime broadcast 订阅；页面焦点/30秒轮询应兜底；提交 RPC 的事务判断仍为最终结果 |

不要通过开放预约表给 `anon`、给所有 authenticated 用户授予通配 policy，或在前端放入 service role 来“修复”上述问题。
