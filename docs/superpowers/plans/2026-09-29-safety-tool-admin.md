# 安全道具管理员页面实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 增加一个有 Supabase 身份验证和数据库 allowlist 保护的专用管理页面，集中查看并处理安全道具预约。

**Architecture:** GitHub Pages 托管登录与管理 UI，使用当前公开 Supabase 配置及 supabase-js。新的 SQL migration 维护私有管理员 allowlist、仅限获准管理员的查询策略和状态变更 RPC；浏览器不持有任何高权限 key。

**Tech Stack:** 静态 HTML/CSS/JavaScript modules、Supabase JS v2、PostgreSQL RLS/RPC、Node.js `node:test`。

---

## 文件职责

- 新建 `safety-tool-admin.html`：管理登录表单、预约列表及状态操作结构。
- 新建 `safety-tool-admin.css`：复用网站全局样式，管理台桌面表格/窄屏列表布局。
- 新建 `safety-tool-admin.js`：Supabase 登录、授权后查询、显示映射、筛选及状态 RPC。
- 新建 `supabase/migrations/202609290002_safety_tool_admin.sql`：allowlist、RLS policies、权限与安全状态 RPC。
- 修改 `.github/workflows/deploy-pages.yml`：把管理员静态资源纳入 Pages；现有 rsync 默认已包含新页面。
- 修改 `docs/supabase-setup.md`：写出 Auth 用户创建、UUID 授权 SQL、部署与管理员日常操作。
- 修改 `tests/supabase-reservation.test.mjs` 及新建 `tests/safety-tool-admin.test.mjs`：锁定数据库安全和 UI/行为合同。

## Task 1: 锁定数据库授权边界

**Files:**
- Create: `supabase/migrations/202609290002_safety_tool_admin.sql`
- Test: `tests/supabase-reservation.test.mjs`

- [ ] **Step 1: 写失败测试**：断言管理员表 RLS 开启且撤销 anon/authenticated 直接访问；三个业务表的 SELECT policy 调用管理员检查函数；状态 RPC 检查 `auth.uid()` allowlist 并只接受 `ready`、`cancelled`、`returned`；anon 无权执行状态 RPC。
- [ ] **Step 2: 运行 `node --test tests/supabase-reservation.test.mjs`**，确认新增断言因 migration 不存在而失败。
- [ ] **Step 3: 最小实现 migration**：创建 `reservation_admins(user_id uuid primary key references auth.users on delete cascade, created_at timestamptz)`；启用 RLS 并撤销客户端直读写；创建固定空 `search_path` 的 `SECURITY DEFINER` 管理员检查函数；按该函数为 `reservations`、`reservation_items`、`equipment_inventory` 增加 authenticated SELECT policies 和必要 GRANT；创建检查用户身份及目标状态的 `admin_set_reservation_status(uuid,text)` RPC，只更新状态和 `updated_at`，有效目标仅为上述三个状态；撤销 public/anon 执行权，仅向 authenticated 授权。
- [ ] **Step 4: 复跑 `node --test tests/supabase-reservation.test.mjs`**，确认数据库安全合同通过且旧匿名限制仍通过。

## Task 2: 管理视图和登录状态行为

**Files:**
- Create: `safety-tool-admin.html`
- Create: `safety-tool-admin.js`
- Test: `tests/safety-tool-admin.test.mjs`

- [ ] **Step 1: 写模块测试**：验证道具 ID 显示为小刀、护目镜、口罩、安全手套；状态过滤只保留匹配记录；预约行渲染包含编号、姓名、课程、邮箱、领取/归还日、道具数量和状态；RPC 失败结果不视为成功。
- [ ] **Step 2: 运行 `node --test tests/safety-tool-admin.test.mjs`**，确认因管理模块缺失而失败。
- [ ] **Step 3: 实现纯展示/过滤函数和管理页**：登录表单使用邮箱/密码；初始只显示登录界面；授权读取通过 `.from('reservations').select('id,reservation_code,participant_name,course,email,pickup_date,return_date,status,created_at,reservation_items(equipment_id,quantity)')`，并依赖 RLS 拒绝非管理员；道具 ID 映射为中文；筛选支持全部、待处理、已放置并通知、已取消、已归还；状态操作使用 `admin_set_reservation_status` RPC。
- [ ] **Step 4: 登录后初始查询、监听 Auth 状态、登出清空预约 UI；查询/RPC 错误分别显示中文说明；变更前弹出目标状态确认，成功后重新取数；待处理仅能转已放置或取消，已放置仅能转取消或已归还，终态不显示无效操作。**
- [ ] **Step 5: 运行 `node --test tests/safety-tool-admin.test.mjs`**，确保纯函数和静态资源合同通过。

## Task 3: 管理台样式与页面测试

**Files:**
- Create: `safety-tool-admin.css`
- Modify: `tests/safety-tool-admin.test.mjs`

- [ ] **Step 1: 写失败的结构样式测试**：断言页面绑定专属样式、包含 viewport、登录/列表 `aria-live` 提示、无注册按钮，并在 CSS 有窄屏布局规则。
- [ ] **Step 2: 运行 `node --test tests/safety-tool-admin.test.mjs`**，确认缺少 CSS/结构时失败。
- [ ] **Step 3: 实现样式**：沿用网站的字体、色彩、边框与间距；宽屏采用可扫描表格；窄屏以预约条目网格展示且不横向挤压字段；状态标签使用文字和高对比状态色；按钮提供焦点状态与禁用状态；不增加卡片嵌套或装饰性面板。
- [ ] **Step 4: 复跑页面测试并检查 `git diff --check`**。

## Task 4: Supabase 初始化和管理员操作中文文档

**Files:**
- Modify: `docs/supabase-setup.md`
- Test: `tests/supabase-reservation.test.mjs`

- [ ] **Step 1: 写文档合同测试**：检查指南说明创建 Auth 用户、关闭公开注册、复制 Auth User UUID、执行 allowlist INSERT、管理员页面 URL、状态操作次序和手动邮件通知。
- [ ] **Step 2: 运行 `node --test tests/supabase-reservation.test.mjs`**，确认相关中文文档断言先失败。
- [ ] **Step 3: 补充准确的 Dashboard 中文操作步骤**：先在 Supabase Auth 用户页创建管理员邮箱/密码；复制用户 UUID；在 SQL Editor 执行 `insert into public.reservation_admins (user_id) values ('这里替换为Auth用户UUID');`；部署 migration 后登录管理页；先实地放置并邮件通知再改成 `ready`；取消用 `cancelled`；归还后用 `returned`。说明禁用公开注册，且管理页不自动发送邮件。
- [ ] **Step 4: 复跑文档合同测试**。

## Task 5: 部署配置、整套验证和线上迁移

**Files:**
- Modify: `.github/workflows/deploy-pages.yml`（仅当部署过滤或配置确实需要调整）
- Verify: all admin page, migration, tests, docs

- [ ] **Step 1: 全量本地验证**：执行 `npm test` 和 `git diff --check`，修复发现的问题并重跑至通过。
- [ ] **Step 2: 核验输出文件过滤**：确认 `safety-tool-admin.html/js/css` 被复制到 `_site`，而迁移 SQL、文档和私有配置不会意外发布。
- [ ] **Step 3: 将代码推送至 `main` 并等待 GitHub Actions 成功；确认页面可访问但在数据库迁移前不能读取预约资料。**
- [ ] **Step 4: 在已登录 Supabase 项目 SQL Editor 中执行新增 migration；创建/授权管理员；验证获准管理员能看到明细，普通 anon 及未授权登录用户读写均被拒绝，再从管理页确认一次状态刷新和库存变化。**
- [ ] **Step 5: 在桌面与窄屏检查登录、预约列表、空状态、错误状态和登出；最终仅报告已实际验证的线上行为，不把本地测试等同于 Supabase 线上授权验证。**
