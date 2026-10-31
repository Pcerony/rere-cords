# 工程文档索引

面向后续维护者和 AI 开发者。先阅读项目总览，再按任务查阅对应系统文档。本文档以 2026-10-31 可访问的线上实现和公开仓库中的迁移文件为依据；若代码与文档不符，以代码和 Supabase 实际 schema 为准，并同步更新文档。

| 文档 | 内容 |
| --- | --- |
| [项目工程总览](PROJECT_ENGINEERING.md) | 架构、页面、部署、数据边界、扩展原则 |
| [Supabase 安全道具预约系统](SUPABASE_ARCHITECTURE.md) | 表结构、RPC、权限、库存事务、管理员流程、排障 |
| [Supabase 设置指南](supabase-setup.md) | Dashboard / GitHub Pages 一步步设置与上线检查 |
| [作品提交集成说明](submission-integration.md) | 作品参加入口及未来在线报名/提交接入建议 |
| [作品报名部署与管理](event-registration-setup.md) | 独立报名页、Edge Function、私有图片、权限及上线验收 |
| [本地作品上传原型](submission-prototype.md) | 本地文件上传原型的启动、API 和限制 |

## 给后续 AI 的首要约束

- 新的活动报名系统是一个独立业务域。不要把报名记录塞进 `reservations` / `reservation_items`，也不要复用安全道具预约的状态和库存 RPC。
- 先阅读本目录架构说明和迁移文件，再检查当前分支的实际代码、RLS 与 Supabase Dashboard schema；不要只根据 Table Editor 的表名推断权限。
- 任何浏览器端代码只使用 Supabase Project URL 和 Publishable/anon key。绝不把数据库密码、Secret key 或 `service_role` key 写进 HTML、JS、GitHub Pages、日志或文档。
- 涉及姓名、学号、邮箱、报名材料的表必须默认私有。公开入口通过校验后的 RPC 或受控服务端 API 写入；管理读取使用认证、角色校验和 RLS。
- 变更数据库时新增有序、可重复部署的 migration，并同步更新本目录、测试及部署说明。不可只在 Dashboard 手工改 schema 而不把变更放入版本控制。
