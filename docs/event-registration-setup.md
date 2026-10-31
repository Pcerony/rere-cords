# 作品报名：部署与管理

## 生产验收记录（2026-10-31）

活动负责人最新确认：报名与实物提交时间 **2026年11月1日至11月20日（日本时间）** 仅作书面提醒，不作为技术限制。首页入口始终可点击，服务端不按开始或截止时间拒绝提交。旧设计/计划中的时间限制以本次变更为准。首页首屏下方提供安全用具预约与作品报名两个快捷大按钮，报名章节保留同等尺寸入口。

- 正式报名：`https://rerecords.space/event-registration.html`；管理后台：`https://rerecords.space/event-registration-admin.html`。
- 原项目已恢复健康；新增 migration `202610310001` 已执行并登记；Edge Function `event-registration` 已部署，生产开关已开启。
- Turnstile 使用 `rerecords.space` 的 Managed 组件；公开 Site key 由 GitHub Actions 注入，Secret 仅保存在 Supabase。没有迁移 DNS、购买套餐或把 Secret 写入仓库。
- 已把现有唯一一位安全用具管理员显式加入报名白名单。生产 RLS/权限检查通过；匿名读取报名表、文件元数据和真实私有图片被拒绝，无效 captcha 被拒绝。管理员实际登录应由本人使用原账号完成；验收没有代输密码或伪造登录令牌。
- 真实浏览器提交成功，回执 `RRC-W-E2290A6EB7B4427BB09F6CA1D321C72A`。虚构作者、`example.org` 邮箱、沙龙意向、视频链接及图片元数据均收到。测试附件使用本站公开 `favicon.png`；从私有存储下载后与源文件逐字节及 SHA-256 一致，1647 bytes。
- 测试记录明确标为“[上线测试-20261031] 非参展作品”，不算真实报名；是否清理由负责人确认，不擅自永久删除。原安全预约记录仍为4条，库存 RPC 正常。
- 本地和 GitHub Actions 自动测试通过；本地共105项，Deno 检查通过。无扩展内置浏览器完成真实收件；原 Chrome 扩展环境验证较慢，不能把自动化或特定浏览器的挑战结果当成所有访问者的结果。验证组件失败时页面会显示安全的错误代码，绝不绕过服务端验证。

浏览器可能缓存静态配置10分钟，正式开放时已更新 `event-registration-config.js?v=2`；诊断增强使用 `event-registration.js?v=2`。以后变更公开配置或依赖模块时同样更新引用版本。仅关闭网页开关不能保证立即阻止旧页面的请求；紧急停止收件应关闭函数，不能依赖已移除的日期限制。

现有 `202609290001` 至 `202609290003` 的安全预约结构原先通过手工 SQL 部署，远程 migration 历史未登记这些旧版本。这次没有重跑或擅自补记它们；后续不可直接对全部本地 migration 执行 `db push`，应先审计旧 schema 并修复基线历史。

## 当前交付与边界

系统提供独立作品报名页 `event-registration.html`、管理页 `event-registration-admin.html`、Edge Function、私有图片存储及 migration。它不修改安全道具预约表、库存、RPC 或原管理员白名单。源码默认 `enabled: false`，生产构建已通过配置开启；其他环境不应把未连接的表单当作提交成功。

报名流程：回收箱旁纸条填写作者名、邮箱，随作品放入箱子；扫描指向报名页的二维码，在线使用相同姓名、邮箱提交作品名和200字以内简介。沙龙意向、专业、学年、出身地、补充说明、图片及视频链接为选填。视频支持任意 HTTP(S) 服务，不下载、抓取或嵌入远程内容。图片最多3张，每张5 MiB，JPEG/PNG/WebP；不接受 SVG、视频文件和其他格式。文件头校验不是完整的病毒扫描或图像解码验证。

一个邮箱可提交不同作品。暂不提供公众查询、修改、撤回或批量导出页面，避免未经身份验证暴露个人资料。更正或删除通过活动邮箱人工处理。提交成功显示编号，不自动发邮件，也不意味着已核对线下实物。

## 1. 核对项目与数据库

目标项目 ref 应为 `mtruobyauroqwuefanlp`，操作前以 Dashboard 为准。先核对已应用 migration，保留现有安全预约配置和数据。

审查并执行新的 `supabase/migrations/202610310001_event_registrations.sql`（一个事务）。不要重跑旧 migration。新建内容：

- `event_registrations`：报名及线下核对状态。
- `event_registration_files`：私有图片路径、MIME、大小、摘要。
- `event_registration_admins`：独立管理员白名单。
- 私有 bucket `event-registration-photos`。
- 仅服务角色可调用的 `commit_event_registration`；报名管理员可调用核对 RPC。

这份 migration 为一次性版本化变更，不是随意重复执行的初始化脚本。若部分对象此前手工创建，停止并先核对 schema，不要加宽权限来跳过错误。

## 2. 配置 Turnstile

在 Cloudflare Turnstile 创建站点，将实际官网域名加入允许列表。保管 Secret key，仅将 Site key 用于网页。表单 action 为 `registration`；服务端同时校验 action、hostname 和验证结果。开发测试使用独立测试密钥与允许的本地域名，不把测试密钥用在生产环境。

## 3. Edge Function

从仓库根目录使用 Supabase CLI，登录并连接已核对的项目。设置下列函数环境变量，通过 Dashboard Secrets 或 CLI 安全输入；不要把私钥写入仓库、静态 JS、命令参数示例或截图。

| 环境变量 | 值 |
| --- | --- |
| `REGISTRATION_ALLOWED_ORIGINS` | `https://rerecords.space`；如另有正式入口，用逗号列出完整 origin，不用 `*` |
| `TURNSTILE_SECRET_KEY` | Turnstile 服务端 Secret key |
| 原 `REGISTRATION_OPENS_AT` | `2026-11-01T00:00:00+09:00`，已停用，函数不读取 |
| 原 `REGISTRATION_CLOSES_AT` | `2026-11-21T00:00:00+09:00`，已停用，函数不读取 |

`SUPABASE_URL` 与 `SUPABASE_SERVICE_ROLE_KEY` 使用 Edge Runtime 提供的服务端环境值。它们不进入前端。若项目未提供兼容的服务角色环境值，先在后端配置好受保护的服务凭据再部署，不要使用 Publishable key 代替服务权限。

```sh
supabase functions deploy event-registration --project-ref mtruobyauroqwuefanlp --no-verify-jwt
```

`supabase/config.toml` 仅对这个函数关闭 legacy JWT 验证，因为公众无需登录；它不是管理员 API。函数用 Turnstile、严格 origin、日期、实际请求体字节上限及字段/图片校验保护写入。公开 apikey 不是密码。管理员读写仍由 Auth/RLS/RPC 控制。大规模流量攻击还需平台级限流/预算告警；人机验证不等于绝对防滥用。

## 4. 管理员

2026-10-31 已获活动负责人确认：授权给现有安全用具管理员。沿用现有 Auth 账号，但必须单独添加作品报名白名单，不能改成所有已登录用户均可读取。关闭公开注册，不共用账号。在 Dashboard 中核对现有安全用具管理员的 Auth 用户 UUID，再执行：

```sql
insert into public.event_registration_admins(user_id)
values ('替换为已核对的 Auth 用户 UUID')
on conflict do nothing;
```

登录 `https://rerecords.space/event-registration-admin.html`。页面每页25条，按实体核对状态筛选，查看作品资料、视频链接及5分钟有效的私有图片链接。核对线下纸条与实物后标记“已核对”；误操作可撤销。图片链接属于临时访问凭据，不转发、不截图传播。退出登录会清除页面记录。移除管理员白名单不会撤销已经签发但尚未过期的5分钟链接。

## 5. GitHub Pages

现有 `SUPABASE_URL` 和 `SUPABASE_PUBLISHABLE_KEY` 继续用于公开连接配置。新增 GitHub Actions **Variables**：

- `TURNSTILE_SITE_KEY`：公开 Site key。
- `REGISTRATION_ENABLED`：完成下面的上线验收后才设为 `true`；其他值都关闭提交。

部署 workflow 注入 `event-registration-config.js`。关闭时表单显示准备中并禁用提交，配置缺失时不假装成功。主站报名入口指向 `https://rerecords.space/event-registration.html`，二维码也使用这个地址。没有把图形二维码生成或线下纸条设计混入网站变更。

## 6. 上线验收

本地测试只能证明局部契约，不代替真实 Supabase 验收。正式开启前，使用虚构姓名和 `example.org` 邮箱测试：

- 无附件报名、图片报名、各平台视频链接；成功后 Dashboard 可查到同一编号，图片可下载。
- 必填项空白、201字符、超大/超量/伪装图片、非 HTTP(S) 链接全部拒绝。
- 无 captcha、过期 captcha、错误 origin、截止后请求拒绝；缺配置关闭。
- 匿名读表/读附件/调用提交 RPC、普通已登录用户读资料及更新状态全部拒绝。
- 安全道具管理员若不在报名白名单，无报名访问权；反向隔离同样成立。
- 两个相同 submission UUID 和相同内容的并发请求只产生一条记录，返回相同编号；不同内容复用 UUID 被拒绝。
- 网络中断后用同一页面重试不重复创建；成功提示前后均与数据库记录核对。不要刷新/关闭未确认的页面，内存中的重试标识不会跨页面保存。
- 管理员核对/撤销、分页、筛选、退出后清屏；手机、键盘、日中英切换。
- 原安全预约流程仍可申请、查看、通知和归还。

## 7. 清理、保留与恢复

2026-10-31 已获活动负责人确认：报名个人资料与附件保留至 **2027年2月28日**，由活动组织者负责清理。日中英隐私说明已同步该期限；当前没有自动删除任务，不应误以为系统已安排定时清理。上线时应核对并设置供应商备份保留策略，避免备份无限期保留个人信息。删除报名记录不会自动删除 Storage 文件：先按 `event_registration_files` 路径清理存储，再删除记录。

文件上传在数据库事务外。已完成上传但后续上传失败时尝试清理；数据库响应丢失时保留文件，避免误删实际上已经提交的附件。相同内容重试只保留胜出记录关联的文件，其余尝试清理。后台巡检超过24小时且没有 `event_registration_files` 引用的对象，人工核对后清理；不要删除仍在上传的文件。存储请求本身结果不明确时也可能有孤立对象，不能只依赖接口即时清理。

故障时先将 GitHub `REGISTRATION_ENABLED` 关闭并重新发布，必要时关闭函数部署；不要开放 RLS 或将 bucket 改为 public。保留已收到的数据，参与者联系活动邮箱。任何删除生产表或 bucket 的回滚需先备份并明确授权。

## 本地验证

```sh
npm test
npx --yes deno check --node-modules-dir=none --no-lock supabase/functions/event-registration/index.ts
node scripts/static-server.mjs
```

可选 `scripts/check-registration-db.mjs` 使用 PGlite 验证真实 PostgreSQL 约束、事务与 RLS。通过临时安装并设置 `PGLITE_MODULE` 指向模块可避免修改网站依赖；它使用本地 Auth/Storage schema 替身，不验证 Supabase 网关、Storage API、真实 Auth 或跨连接并发。浏览器 QA 的成功/失败响应若采用拦截替身，必须标明，不当成真实收件证明。

参考：[私有 Storage](https://supabase.com/docs/guides/storage/buckets/fundamentals)、[函数验证配置](https://supabase.com/docs/guides/functions/function-configuration)、[Turnstile 服务端验证](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)。
