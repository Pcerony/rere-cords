# RERE-CORDS 作品上传原型

## 用途

这个原型用于验证数字作品从参与者浏览器到运营方收件箱的完整链路。它会真实接收表单和附件、写入本机文件系统、生成提交编号与 SHA-256 文件摘要，并允许在独立确认台中重新读取和下载收到的内容。

现有公开主页及其邮件提交入口保持不变。原型字段、格式和容量限制是体验用默认值，不代表最终活动规则。

## 启动

首次运行：

```bash
npm install
npm run prototype
```

服务默认只监听本机：

- 参与者上传页：`http://127.0.0.1:4174/`
- 运营方确认台：`http://127.0.0.1:4174/submission-admin.html`

在终端按 `Ctrl+C` 停止服务。可通过 `PORT=5000 npm run prototype` 临时使用其他端口。

## 原型字段与限制

必填信息包括姓名、邮箱、作品标题、作品类型、作品说明和至少一个文件；所属机构为选填。

允许 JPEG、PNG、WebP、GIF、PDF、MP4、WebM、TXT、CSV、JSON 和 ZIP。一次最多 8 个文件，单个最多 25 MiB，总计最多 100 MiB。

## 如何确认收到

1. 在参与者页完成一次提交。
2. 记录成功区域显示的 `RRC-...` 提交编号、服务器接收时间和附件摘要。
3. 点击“在确认台查看”，或单独打开运营方确认台。
4. 确认同一提交编号、创作者、作品标题、文件数量、文件名和哈希摘要均存在。
5. 对图像查看缩略图，对任意附件使用“下载附件”验证保存的文件。

每条记录存储在：

```text
prototype-data/<submission-id>/
  manifest.json
  <stored-upload-1>
  <stored-upload-2>
```

`prototype-data/` 已被 Git 忽略。删除该目录即可清空所有原型提交；不要把真实参与者数据加入 Git。

## API 合同

- `GET /api/health`：服务状态。
- `POST /api/submissions`：接收 `multipart/form-data`。
- `GET /api/submissions`：返回所有接收记录，最新记录优先。
- `GET /api/submissions/:id`：返回一条接收清单。
- `GET /api/submissions/:id/files/:fileId`：读取已保存附件。

错误响应采用：

```json
{
  "code": "INVALID_FIELDS",
  "message": "Work title is required."
}
```

## 安全边界

这是本地工作流原型，不是可直接上线的生产系统。它通过默认绑定 `127.0.0.1` 限制访问范围，并实现字段、类型、数量、大小、路径与文件名校验，但没有正式管理员登录、参与者身份验证、病毒扫描、限流、远程备份、隐私同意、数据保留与删除策略。

切换到公网方案时，应保留页面和收据数据合同，把文件系统存储替换为经过认证的接收 API 与持久对象存储，并在上线前补齐上述安全能力。

## 验证

运行全部自动化检查：

```bash
npm test
node --check prototype-server/server.mjs
node --check prototype-server/storage.mjs
node --check submission-prototype.js
node --check submission-admin.js
```
