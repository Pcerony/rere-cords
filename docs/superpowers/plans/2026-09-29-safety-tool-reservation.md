# 加工安全道具预约系统实施计划

> **执行说明：** 按任务逐项实施；每项均先写失败测试、确认失败原因，再做最小实现并复测。保留工作区已有的未提交修改，不覆盖或撤销。

**目标：** 在加工安全说明中加入预约入口和多语言预约页，使用 Supabase 原子地处理有库存限制、至少提前三天、等待管理员确认的道具预约。

**架构：** GitHub Pages 继续提供静态网站；预约页通过公开 Supabase URL 与 anon/publishable key 调用受限 RPC。数据库负责校验和原子库存分配，匿名客户端只能读取汇总库存和提交申请。管理员通过 Supabase Dashboard 查看待处理申请、实地放置物品、手动发送通知邮件并将状态改为已放置。

**技术栈：** 现有原生 HTML/CSS/JavaScript、Node.js 内置测试运行器、Supabase JS v2（固定 CDN 版本）、Supabase PostgreSQL/RPC/RLS/Realtime。

---

## 文件职责

- 修改 `index.html`：在 `#safety` 加入预约入口；按本站页面结构新增独立预约页面（`safety-tool-reservation.html`）。
- 修改 `styles.css`：仅添加预约入口和预约页所需的响应式样式，维持现有设计语言。
- 新建 `safety-tool-reservation.js`：表单状态、前端校验、库存展示、提交和确认流程。
- 新建 `safety-tool-reservation-config.js`：读取公开 Supabase URL/key 配置；配置为空时保持关闭。
- 修改 `app.js`、`translations.js`：为当前 13 种站点语言加入预约入口和预约页文案，不改变既有翻译。
- 新建 `supabase/migrations/202609290001_safety_tool_reservations.sql`：表、索引、RLS、库存／预约 RPC 与匿名 Realtime 通知。
- 新建 `.github/workflows/deploy-pages.yml`：运行测试并部署 GitHub Pages，从 Actions Variables 注入公开 Supabase 配置；源代码配置文件保持空白。
- 新建 `docs/supabase-setup.md`：用中文逐步说明创建 Supabase 项目、执行 SQL、取 URL/key、配置 GitHub Pages、测试预约和管理员人工通知流程。
- 修改 `tests/static-site.test.mjs`；新建 `tests/safety-tool-reservation.test.mjs` 与 `tests/supabase-reservation.test.mjs`：覆盖页面、表单逻辑和 SQL 安全／并发规则。
- 保留 `index.html`、`app.js`、`submission-config.js` 和 `tests/static-site.test.mjs` 当前已有的未提交改动；编辑前先检查 diff，将功能增量合并到当前内容。

## 任务 1：锁定预约规则与接口契约

**文件：**
- 新建：`tests/safety-tool-reservation.test.mjs`
- 新建：`safety-tool-reservation.js`

- [ ] **步骤 1：先写失败测试**

用 `node:test` 验证导出的纯函数 `getMinimumPickupDate(today)` 返回第三天（周一为基准返回周四）；验证 `validateReservation(form, today)` 拒绝早于第三天的领取日期、归还日早于领取日、空道具、超出 1–2 的数量和无效邮箱，并接受有效申请。

- [ ] **步骤 2：确认测试按预期失败**

测试文件通过 `import { getMinimumPickupDate, validateReservation } from '../safety-tool-reservation.js'` 导入 API。运行 `node --test tests/safety-tool-reservation.test.mjs`。预期因 `safety-tool-reservation.js` 尚无导出函数而失败，不得是语法或测试框架错误。

- [ ] **步骤 3：实现纯规则函数**

只实现 `getMinimumPickupDate(today)`、`validateReservation(form, today)` 和固定四种道具配置。`form` 字段为 `name`、`course`、`email`、`pickupDate`、`returnDate`、`items`（形如 `{ cutter: 1, goggles: 2 }`）。日期加法按显式 `today` 的日历日运算，使用 `YYYY-MM-DD` 比较，预约结束日包含在占用范围内。

- [ ] **步骤 4：验证规则测试通过**

重新运行同一命令，预期全部通过；再运行 `npm test` 确认基线测试没有被影响。

## 任务 2：创建安全的 Supabase 数据层

**文件：**
- 新建：`tests/supabase-reservation.test.mjs`
- 新建：`supabase/migrations/202609290001_safety_tool_reservations.sql`
- 新建：`docs/supabase-setup.md`

- [ ] **步骤 1：先写 SQL 契约测试**

用 Node `node:fs` 读取 migration，断言包含四种道具且初始数量各为 2、状态 `pending/ready/cancelled/returned`、启用 RLS、创建预约 RPC、最低提前日数校验、串行化锁，以及匿名角色不能直接 SELECT 个人预约数据。

- [ ] **步骤 2：确认契约测试失败**

运行 `node --test tests/supabase-reservation.test.mjs`。预期因 migration 不存在或必要 SQL 条款缺失而失败。

- [ ] **步骤 3：写最小安全数据库 migration**

创建 `equipment_inventory`、`reservations`、`reservation_items`。日期按日本时区 `Asia/Tokyo` 解释，`pickup_date >= (now() at time zone 'Asia/Tokyo')::date + 3`，`return_date >= pickup_date`。预约明细数量限 1–2，状态只有 `pending`、`ready`、`cancelled`、`returned`。通过 `daterange(pickup_date, return_date + 1, '[)')` 实现领取日和归还日均占用。创建 RPC 使用全局 `pg_advisory_xact_lock`，在一个事务中校验全部项目和库存后才插入申请及明细；`pending` 和 `ready` 状态均扣占区间库存，`cancelled` 和 `returned` 状态不继续占用。冲突时整体回滚并返回明确冲突结果。库存 RPC 只返回库存数、所查日期的可用数和符合所选数量／时长的最早可用日，不返回预约明细或个人资料。使用固定 `search_path` 的 `SECURITY DEFINER` RPC，撤销 public 默认执行权限，仅授予 `anon` 和 `authenticated` 必需 RPC 执行权限；匿名角色不得直接读取预约表。添加只广播 `inventory_changed` 无个人字段的 Supabase Broadcast 数据库触发器。

- [ ] **步骤 4：补齐中文操作指南**

在 `docs/supabase-setup.md` 写出逐屏操作流程：新建项目、SQL Editor 执行 migration、Project URL 与 anon/publishable key 的位置、将公开配置放进站点配置文件、Realtime channel 测试、创建测试申请、Supabase Table Editor 中由管理员确认、实地放置、向申请邮箱手动发送「已放置可领取」邮件、改状态为 `ready`，以及标记取消／归还。明确不要复制 service-role key 到网站。

- [ ] **步骤 5：验证 SQL 文本契约和整站测试**

运行 `node --test tests/supabase-reservation.test.mjs` 和 `npm test`。SQL 在用户的 Supabase 项目执行前，不能仅凭文本测试宣称托管数据库已部署或并发行为已在线验证；文档须如实说明由下一步控制台测试验证。

## 任务 3：实现配置关闭态和多语言预约界面

**文件：**
- 新建：`safety-tool-reservation-config.js`
- 新建：`safety-tool-reservation.html`
- 修改：`app.js`、`translations.js`、`styles.css`
- 修改：`tests/static-site.test.mjs`

- [ ] **步骤 1：先加页面和配置失败测试**

测试预约页含 `name`、`course`、`email`、`items`、`pickupDate`、`returnDate` 字段、库存区及 `aria-live` 表单状态区；`index.html` 安全说明区包含预约入口；配置文件不含凭证且未配置时预约关闭；所有 `data-i18n` 新增键在 13 种支持语言中均有非空翻译；页面只引用固定版本 Supabase JS CDN 且不包含 service-role key。

- [ ] **步骤 2：确认静态测试按预期失败**

运行 `node --test tests/static-site.test.mjs`，预期在尚未实现预约结构／文案处失败。

- [ ] **步骤 3：建立配置和页面骨架**

创建 `window.RERE_CORDS_RESERVATION_CONFIG = { supabaseUrl: '', supabaseAnonKey: '' }`；预约页仅在两项配置齐全且客户端 SDK 可用时开放交互。加入语言选择器兼容、可访问标签、`aria-live` 状态区、地点提示和待管理员确认说明。

- [ ] **步骤 4：补充全部语言文案与样式**

按已有 `app.js` / `translations.js` 结构为简中、繁中、日、英、韩、印尼、越南、泰、孟加拉、阿拉伯、法、印地、芬兰语提供完整翻译。响应式布局按现有样式，不增加装饰卡片堆叠；表单标签、库存、截止归还日及收到邮件后再领取的提醒在窄屏均完整可见。

- [ ] **步骤 5：测试页面合同和语言完整性**

运行 `node --test tests/static-site.test.mjs`，预期新增检查和原检查都通过。遇到本地已有的测试改动要合并，不得重写或丢弃其内容。

## 任务 4：接入库存、日期建议与申请提交

**文件：**
- 修改：`safety-tool-reservation.js`
- 修改：`safety-tool-reservation.html`
- 修改：`tests/safety-tool-reservation.test.mjs`

- [ ] **步骤 1：测试库存模型和响应状态**

增加测试验证未选中的道具不提交、数量正确传入、用户更改日期或道具后重新查询、Realtime `inventory_changed` 只触发库存刷新；确认成功仅显示「申请已提交／等待管理员确认」，库存冲突显示 RPC 给出的建议日期，网络故障不显示成功态。

- [ ] **步骤 2：确认新增行为测试失败**

运行 `node --test tests/safety-tool-reservation.test.mjs`，预期因库存查询／提交处理未定义或行为未实现而失败。

- [ ] **步骤 3：调用 Supabase RPC 并渲染实时库存**

使用固定版本 Supabase JS v2 创建客户端；日期、道具或数量变化时调用 `get_equipment_availability({ p_pickup_date, p_return_date, p_items })` RPC；提交时调用 `create_equipment_reservation({ p_name, p_course, p_email, p_pickup_date, p_return_date, p_items })` RPC。订阅不含个人字段的 `inventory_changed` Broadcast，收到事件重新查询库存；失焦恢复时刷新，订阅失败时使用 30 秒轮询兜底。显示每类当前可用量和无法满足时的最早日期。

- [ ] **步骤 4：提交待管理员确认的申请**

前端执行纯函数校验后调用 create RPC。成功时显示申请编号、所申请道具和日期、归还期限、领取地址，并醒目说明管理员确认并放置后会发送邮件，收到邮件前不可领取。冲突、配置缺失、RPC 错误、断网分别显示可理解的状态；任何失败都不显示已提交或已确认。

- [ ] **步骤 5：验证行为测试通过**

运行 `node --test tests/safety-tool-reservation.test.mjs` 和 `npm test`，预期均通过。

## 任务 5：补充安全与部署指导并做整体验收

**文件：**
- 修改：`docs/supabase-setup.md`
- 修改：`tests/static-site.test.mjs`
- 涉及：全部预约页、预约 JS、配置、SQL migration 与相关 CSS

- [ ] **步骤 1：增加安全回归检查**

测试静态资源不包含 service-role/secret key；匿名 SQL 权限无 reservation 表读取；reservation create RPC 使用事务锁；状态切换仅由管理员在 Supabase Dashboard 执行；邮件由管理员手动发送，网站不谎称已发信。

- [ ] **步骤 2：确认安全测试失败或识别缺失项**

运行 `node --test tests/supabase-reservation.test.mjs tests/static-site.test.mjs`，确认新增检查覆盖到既有实现。

- [ ] **步骤 3：修复实现／文档中的安全缺口**

按失败断言补足权限、状态说明、凭证边界或管理员操作步骤；不得通过开放预约表 SELECT 或把 service-role key 暴露给浏览器来绕过问题。

- [ ] **步骤 4：运行整套本地测试和静态服务检查**

运行 `npm test`；启动 `npm run prototype` 之外的静态预览命令 `node scripts/static-server.mjs`，在浏览器核对预约页首屏、窄屏、无配置关闭态。静态预览通过仅验证前端，Supabase RPC/Realtimes 需在用户按中文指南配置后验证。

- [ ] **步骤 5：总结配置步骤和已知上线门槛**

列出用户下一步需要在 Supabase 控制台完成的动作。未取得实际 Supabase URL/key 且未执行线上测试前，明确说明预约功能仍未启用，不能声称实时预约已上线。
