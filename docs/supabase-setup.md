# Supabase 设置与运维指南

本文描述已部署的安全道具预约后端。系统架构、表与 RPC 的完整说明见 [Supabase 技术说明](SUPABASE_ARCHITECTURE.md)。

## 先检查仓库版本

安全预约 migrations 应位于 `supabase/migrations/`。若当前工作副本中没有该目录或 migration 文件，不要从头凭本文重写 SQL，也不要直接在生产 Dashboard 临时拼表；先同步/查看 GitHub `main` 的受审查 migration 文件，确认工作区改动后再切换到包含它们的版本。

当前生产项目 ref 为 `mtruobyauroqwuefanlp`（截至 2026-10-31）。在任何数据库操作前，核对 Supabase Dashboard 顶部项目 ref，避免在错误项目执行迁移。

本活动已有生产项目，不需要重新创建项目。

## 执行迁移

在 Supabase Dashboard 左侧打开 **SQL Editor → New query**。按顺序将每个迁移文件的全部 SQL 粘贴并运行：

1. `202609290001_safety_tool_reservations.sql`：库存、预约及道具明细表，RLS，库存/原子申请 RPC，实时广播触发器。
2. `202609290002_safety_tool_admin.sql`：管理员白名单、只允许管理员读取预约数据的 policy、管理员状态 RPC。
3. `202609290003_student_number.sql`：必填学号字段和对应的创建预约 RPC 签名。

旧预约会保留；旧记录的学号可以为空，新预约通过新版 RPC 必须提供学号。

只有目标数据库尚未包含对应变更时才运行。迁移文件本身应保留在版本控制中；修改已执行的迁移会导致环境漂移，应另加新的增量 migration。运行后检查 SQL Editor 没有错误，并在 Table Editor 核对 `equipment_inventory`、`reservations`、`reservation_items`、`reservation_admins`。不要为了让 UI 显示明细而开放匿名表读取权限。

## 网站连接配置

从 Supabase Project Settings 复制 Project URL 和 **Publishable key**（旧项目可用 anon key）。GitHub 仓库 **Settings → Secrets and variables → Actions → Variables** 中配置：

- `SUPABASE_URL`：同一 Supabase 项目的 Project URL。
- `SUPABASE_PUBLISHABLE_KEY`：同一项目的公开 Publishable/anon key。

静态网页中出现这两个公开值是预期设计。不要使用数据库密码、Secret key 或 `service_role` key。GitHub Pages source 使用 **GitHub Actions**；修改配置后在 Actions 重新运行部署工作流，并确认部署成功。

## 配置管理员

完成实地放置并实际发送通知邮件后，才在管理页面点击“确认已放置并已通知”；打开邮件草稿本身不算已发送。

1. 在 Supabase **Authentication → Sign In / Providers** 关闭公开注册。
2. 在 **Authentication → Users** 邀请管理员邮箱，由管理员通过邮件设置密码。
3. 复制该用户的 Auth 用户 UUID（界面可能显示为 User UID）。
4. 确保 migration 002 已执行后，在 SQL Editor 添加该 UID：

   ```sql
   insert into public.reservation_admins (user_id)
   values ('替换成 Auth User UUID')
   on conflict (user_id) do nothing;
   ```

5. 访问 `https://rerecords.space/safety-tool-admin.html` 登录。页面仅供白名单管理员查看预约资料。不要共用管理员账号。

移除管理员时，从白名单撤销该 UUID，并视运营需要禁用/删除对应 Auth 用户。若需清除个人资料，先按项目的数据保留规则处理；删除父预约会级联删除 `reservation_items`。

## 上线冒烟检查

- 公开预约页显示每种道具 2 套，匿名角色不能直接查询三张业务表。
- 领取日最早是日本时间今天 + 3 日，最多提前 365 日；归还日不能早于领取日；借期最多 14 天。
- 用虚构申请验证 RPC 返回 `pending` 和预约编号，`reservation_items` 中有实际道具数量。
- 重叠日期把某道具占满后，availability 显示库存不足/最早日期，超额创建返回 `UNAVAILABLE` 且不产生部分记录。
- 管理员可以看完整申请、道具明细和学号；非管理员账号不可读。
- 确认取消释放库存。`pending` / `ready` 占用库存，`cancelled` / `returned` 不占库存。
- 邮件只会由管理员页面打开日英邮件草稿，不会自动发出。只有物品放入取件盒且邮件实际发送后才标记 `ready`。
- 测试完删除虚构预约和邮件草稿，不要使用真实参与者资料测试。

## 常见问题

- **未连接 / 页面关闭：** 检查 GitHub Actions Variables 与构建产物是否包含正确 URL/key，然后重新运行部署。
- **RPC 参数不匹配：** 确认 migration 003 已在当前项目执行。学号加入后，旧 RPC 签名不能满足前端调用。
- **管理员登录成功却无权查看：** 检查用户 UUID 是否插入 `reservation_admins`，并确认 migration 002。
- **表编辑器看不到道具：** 道具和数量保存在 `reservation_items`，按预约 ID 与 `reservations` 关联；管理员网页已显示嵌套明细。
- **实时库存未刷新：** 前端有 30 秒轮询和页面 focus 更新；网络状态不影响创建 RPC 最终的事务库存校验。

个人信息仅供预约管理。限制 Dashboard 管理员，避免导出传播，并为活动结束后的预约资料确定删除期限。新增业务报名请阅读 [新报名系统扩展边界](SUPABASE_ARCHITECTURE.md#新报名系统的建议边界)，单独设计表和权限。
