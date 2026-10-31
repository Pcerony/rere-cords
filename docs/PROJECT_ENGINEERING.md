# RERE-CORDS 项目工程总览

## 项目是什么

RERE-CORDS 是九州大学大桥校区的可持续设计展览与作品募集网站。公开站点以静态 HTML、CSS 和原生 JavaScript 为主，由 GitHub Pages 发布；Supabase 为少量需要持久数据、并发校验或认证的流程提供后端。视觉规范和产品定位分别见仓库根目录的 `DESIGN.md`、`PRODUCT.md`。

## 系统边界

2026-10-31 工作分支新增作品报名：`event-registration.html/js` 调用独立的 `event-registration` Edge Function，写入独立报名表和私有图片 bucket；`event-registration-admin.html/js` 使用独立报名管理员白名单。代码已加入不代表后端已部署，完整上线条件见 [作品报名部署](event-registration-setup.md)。下图保留已发布的原系统范围。

```text
参与者浏览器
  ├─ index.html + app.js + translations.js ─ 公开活动信息与多语言页面
  ├─ safety-tool-reservation.html + safety-tool-reservation.js ─ 安全用具申请
  │     └─ Supabase RPC：只读可用库存 / 原子创建预约
  └─ submission-prototype.html ─ 本地作品上传原型（不是线上生产服务）

管理员浏览器
  └─ safety-tool-admin.html + safety-tool-admin.js
        ├─ Supabase Auth：邮箱密码登录
        ├─ RLS：只允许管理员读取预约数据
        ├─ RPC：受控状态转换
        └─ mailto：预填日英邮件草稿；管理员检查后手动发送

GitHub Actions ─ 静态文件发布到 GitHub Pages ─ rerecords.space
Supabase ─ PostgreSQL / RLS / RPC / Auth / Realtime Broadcast
```

此图中的公开安全预约页和 Supabase SQL 来自 GitHub `main` 上已发布的实现。当前打开的本地工作副本可能落后于线上版本：若找不到 `safety-tool-*.html/js` 或 `supabase/migrations/`，不要自行重建或假定它们不存在；先同步/检查远程仓库的当前 `main`，再在正确分支上开发。不要覆盖工作区已有改动。

## 主要模块

- `index.html`、`app.js`、`styles.css`：主页结构、交互和样式。
- `translations.js`、`scripts/generate-translations.mjs`：主页语言内容与翻译生成工具。预约表和管理员页各自有小范围的 UI 文案映射；管理员支持中文和英文，公开预约页支持多语言，并与主页保存的语言偏好联动。
- `campus-map-data.js`：交互式校园地图的本地数据。
- `safety-tool-reservation.html/js/css`：公开安全用具预约表单、库存状态和输入校验。
- `safety-tool-admin.html/js/css`：认证后的管理员预约操作台。
- `safety-tool-reservation-config.js`：构建时注入的 Supabase Project URL 和 Publishable key；只允许公开 key。
- `supabase/migrations/*.sql`：数据库 schema、权限策略、函数和触发器的版本化真源。
- `submission-prototype.*`、`prototype-server/`：独立本地上传原型。默认监听 localhost，不等同于已部署、受认证保护的正式报名系统。
- `tests/`：Node 内置 test runner 的静态站点、客户端合同与业务逻辑测试。

## 安全用具预约的业务流程

1. 参与者填写姓名、必填学生番号/学号、课程/专业、邮箱，选择四种道具及每项 1–2 套、领取日和归还日。
2. 最早领取日为日本时间提交日之后第三个自然日；最长提前 365 天申请；借用最多 14 个自然日，领取日和归还日均占库存。
3. 浏览器调用库存 RPC 显示余量和所选数量最早可预约日期。该显示仅是实时参考，提交时数据库必须再次校验。
4. 创建成功返回 `RRC-YYYYMMDD-XXXXXXXX` 编号，初始状态 `pending`。此时不是批准，也不是可以立即领取。
5. 管理员登录专用页面检查申请、实地将物品放在 7 号馆 2 楼 MEDIA STUDIO 门前盒子，打开日英双语邮件草稿，人工检查并发送。
6. 邮件实际发出且物品已放置后，管理员将状态改为 `ready`。参与者收到邮件再领取，并按申请日期归还；管理员随后改为 `returned`。
7. `pending` 和 `ready` 都占用库存；`cancelled` 和 `returned` 不占用库存。取消可以释放库存。

## 部署与本地开发

项目是静态站点，仓库使用 GitHub Pages 和自定义域名 `rerecords.space`。GitHub Actions 部署 workflow 会把 Supabase URL 和 Publishable key 注入发布产物。变量未配置时页面应保持关闭预约提交，不应悄悄使用假数据。

在仓库根目录：

```bash
npm install
npm test
npm run prototype
```

`npm run prototype` 只启动本机作品上传原型；它不是安全预约服务，也不要对公网开放。修改 JS 后可运行对应文件的 `node --check`。部署数据库时按 `supabase-setup.md` 逐条执行版本化 migrations，并在真实 Supabase 项目验证权限和流程。

## 工程约定

- 静态前端不保存服务端密钥，不在客户端实现可信的库存/资格/状态判断。边界校验必须在 PostgreSQL RPC 或经过认证的服务端重复实施。
- 数据库 schema 的修改都应先形成 migration，再更新文档、测试和 Dashboard。migration 文件是数据库变更的版本控制记录，Dashboard 中手工改动不能代替它。
- 预约/报名类功能优先采用独立表、独立 RPC、明确角色和窄权限；避免用一张宽泛“万能表”混合身份、报名、借用或作品提交数据。
- 错误提示不暴露 SQL、密钥、内部堆栈或其他参与者资料。日志避免记录学生番号、邮箱等不必要的个人数据。
- 上线前验证手机布局、多语言、键盘可达性、重复提交、并发库存/名额、无权限访问和恢复策略。

## 仍需注意

作品上传原型的 `prototype-server/` 使用本机文件系统且默认仅绑定 `127.0.0.1`，明确缺少生产级登录、限流、病毒扫描、隐私保留策略和远端备份。新报名系统不可直接把这个原型暴露到公网。应基于新的需求设计独立生产后端，并把访问控制、数据保留/删除、附件限制及备份作为上线条件。
