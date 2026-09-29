# Supabase 预约系统设置指南

这份指南会带你把已经注册的 Supabase 账号接到 RERE-CORDS 网站。预约页在完成数据库和 GitHub Pages 配置前会保持关闭，不会接受无法保存的申请。

## 一、创建 Supabase 项目

1. 登录 [Supabase Dashboard](https://supabase.com/dashboard)，点击 **New project**。
2. 选择你的组织，项目名称可填 `rere-cords-safety-tools`。
3. 数据库密码请使用密码管理器生成并保存，不要发到聊天、邮件或代码库。
4. 区域选择离福冈较近的亚洲区域（若可选，优先 Tokyo）。创建项目并等待状态变为可用。

如果你已经创建了项目，直接进入下一步即可。

## 二、创建预约数据表和安全规则

1. 在本地打开 `supabase/migrations/202609290001_safety_tool_reservations.sql`。
2. 在 Supabase 项目左侧进入 **SQL Editor**，点击 **New query**。
3. 将 migration 文件中的 SQL 全部粘贴到查询编辑区，点击 **Run**。
4. 确认执行完成且没有红色错误。此脚本会建立库存、预约和道具明细表、匿名访问限制、库存查询及原子预约 RPC，并为四种道具各初始化两套库存。
5. 左侧进入 **Table Editor**，确认出现 `equipment_inventory`、`reservations` 和 `reservation_items` 三张表。库存应为 `cutter`、`goggles`、`mask`、`gloves` 各 2 套。

不要在 Table Editor 给 `anon` 或 `authenticated` 开放 `reservations` / `reservation_items` 的读取权限。匿名参与者只能经由安全 RPC 查询汇总库存或递交申请。

## 三、取得网站需要的公开连接信息

1. 在 Supabase 项目点 **Connect**，或进入 **Project Settings → API Keys**。
2. 复制 **Project URL**，它的格式通常是 `https://项目编号.supabase.co`。
3. 复制 **Publishable key**（通常以 `sb_publishable_` 开头）。若你的项目界面仍显示旧版 `anon` key，也可以使用它。
4. **不要使用或公开 Secret key / `service_role` key**。网站只需要 Publishable key（或旧版 anon key）；预约数据的安全由数据库 RLS 和受限 RPC 保证。

Supabase Publishable key 和项目 URL 是设计为可出现在浏览器里的公开配置，不是数据库密码。部署工作流会将它们写入 GitHub Pages 构建产物，不会把项目值写入网站源代码。

## 四、设置 GitHub Pages 部署变量

1. 打开网站 GitHub 仓库 `Pcerony/rere-cords`，进入 **Settings → Secrets and variables → Actions → Variables**。
2. 点击 **New repository variable**，创建 `SUPABASE_URL`，值填上一步的 Project URL。
3. 再创建 `SUPABASE_PUBLISHABLE_KEY`，值填 Publishable key（或旧版 anon key）。这两个值用于网站浏览器连接 Supabase；不要将数据库密码或 Secret key 放入 Variables、Secrets 或任何前端文件。
   如果你已经把这两个值保存为同名的 **Repository secrets**，也可以保留原样；部署工作流会优先读 Variables，缺少时读取同名 Secrets。Publishable key 本身是公开用途，不是 Supabase Secret/service_role key。
4. 进入仓库 **Settings → Pages → Build and deployment**，把 **Source** 设为 **GitHub Actions**。仓库加入 `.github/workflows/deploy-pages.yml` 后，Pages 将由这个工作流发布；原先的分支发布方式不再负责更新网站。
5. 在 `main` 分支推送包含本工作流的更新后，打开仓库 **Actions**，检查 `Deploy static site` 工作流是否完成。部署完成后，Pages 环境会显示发布网址。保留仓库里的 `CNAME`，自定义域名会继续使用。

如果没有设置两个变量，网站会正常发布，但预约页会明确显示「尚未开放」。设置变量后可在 **Actions** 页面重新运行工作流。

## 五、检查实时库存和预约

1. 打开网站的「加工安全说明」，点击「预约安全道具」，或直接访问 `safety-tool-reservation.html`。
2. 完成连接后，每种道具应显示 2 套库存。更改日期或选择道具后，页面会重新查询可用库存；另一个参与者提交申请时，库存变动会实时刷新。网络或实时连接中断时，页面会在恢复焦点或轮询时再次查询。
3. 领取日期最早为日本时间的提交日之后第三个自然日，最远可预约一年；每次借用最多 14 天。选定的领取日和归还日都会占用库存；整个借用区间内任一天库存不足，申请都不会写入。
4. 用测试姓名和邮箱提交一次申请。页面显示申请编号及「待管理员确认」后，在 Supabase **Table Editor → reservations** 中确认新记录状态为 `pending`，再到 `reservation_items` 检查道具和数量。
5. 用相同日期和道具再尝试占满库存。超过两套时，申请应被拒绝并给出最早可预约日期；确认 `reservations` 中没有产生这次失败申请的部分记录。
6. 测试完成后，取消测试预约并将测试数据清理掉，不要把测试邮件发给真实参与者。

## 六、收到申请后的管理员操作

预约申请会直接进入 Supabase 的 `reservations` 表，状态为 `pending`。网站不会自动批准申请，也不会自动发送电子邮件；管理员需要定期查看 Supabase **Table Editor → reservations**。`reservation_items` 表可查看每项道具及数量。

收到申请后按以下顺序处理：

1. 检查申请的领取日期、归还日期、道具数量及参与者邮箱，确认能够准备。
2. 先实地将对应道具放入「7号馆二楼 MEDIA STUDIO 房间前的小盒子」。
3. 放置完成后，使用团队邮箱向申请中的邮箱发送通知，告知预约编号、已放置道具、领取地点及必须归还日期。**收到这封邮件前，参与者不应前往领取。**
4. 邮件发送后，在 `reservations` 表中把该记录状态改为 `ready`。`pending` 和 `ready` 都会占用库存，因此确认或放置状态改变不会释放道具。
5. 参与者取消或管理员无法履约时，将状态改为 `cancelled`，库存才会重新开放。道具实际归还后改为 `returned`。

参与者邮件模板（将方括号内容替换为实际信息）：

```text
件名 / Subject: RERE-CORDS 安全道具已放置 / Safety tools ready [预约编号]

[姓名] 您好：
您预约的 [道具与数量] 已放入九州大学大桥校区 7 号馆二楼 MEDIA STUDIO 房间前的小盒子。
预约编号：[预约编号]
请于 [归还日期] 前归还。请仅领取为您准备的道具。

Hello [Name],
Your reserved [tools and quantities] are now in the small box in front of MEDIA STUDIO, Building 7, 2F, Kyushu University Ohashi Campus.
Reservation: [reservation code]
Please return the items by [return date] and take only the tools reserved for you.
```

## 七、隐私与运维

- 预约记录含姓名、所属课程、邮箱和日期。只让负责预约的管理员访问 Supabase Dashboard；不要导出或转发整张预约表。
- 预约结束并确认道具归还或申请取消后，及时从 Supabase 删除不再需要的个人资料记录。删除父预约会级联删除对应道具明细。
- 如果参与者要求取消，管理员在 Dashboard 将状态设为 `cancelled`。不要开放公开页面直接读取或编辑预约表。
- 若误设或泄露 Secret key / `service_role` key，立即在 Supabase 项目设置中轮换；Publishable key 泄露不等同于数据库密码泄露，但仍要依赖 RLS 和 RPC 限制权限。
- 页面显示库存是实时参考值；最终申请由数据库在事务中再次检查。两人同时抢最后库存时，只有先获得库存的一份申请会成功。
- 预约提交接口面向公开网页，基础方案没有 CAPTCHA/匿名用户限流；若出现虚假申请或恶意占库存，需要增加服务端 CAPTCHA 或限流（勿在浏览器中放置 Secret/service_role key）。
- 预约提交接口面向公开网页，基础方案没有 CAPTCHA/匿名用户限流；若出现虚假申请或恶意占库存，需要增加服务端 CAPTCHA 或限流（勿在浏览器中放置 Secret/service_role key）。

## 故障排查

- **页面显示尚未开放：** 检查 GitHub Actions 的 `SUPABASE_URL` 和 `SUPABASE_PUBLISHABLE_KEY` Variables 或同名 Secrets 是否拼写正确，然后重新运行 `Deploy static site`。
- **库存 RPC 报错：** 确认 migration 已在当前 Supabase 项目完整执行，且 Project URL 对应此项目。
- **预约无法提交：** 检查日期是否至少提前三天、归还日期是否晚于或等于领取日期，以及所选日期段是否有足够库存。
- **库存未即时刷新：** 重新聚焦页面确认轮询可更新；检查 Supabase Realtime 状态与项目是否暂停。预约提交 RPC 的数据库库存检查始终是最终结果。
