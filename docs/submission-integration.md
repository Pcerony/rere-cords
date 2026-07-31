# RERE-CORDS 提交入口接入说明

## 当前状态

主页当前使用活动邮箱接收数字作品资料。按钮通过 `mailto:` 打开参与者的邮件客户端；实物作品则投入7号馆2层 MEDIA STUDIO 房间前的回收箱。

## 配置合同

```js
window.RERE_CORDS_SUBMISSION_CONFIG = {
    enabled: true,
    formUrl: 'mailto:rerecords2026@gmail.com?subject=RERE-CORDS%202026%20Work%20Submission',
    fallbackDocumentUrl: ''
};
```

`formUrl` 当前可使用 `mailto:`，未来也可替换为 Apps Script Web App 或其他 `http` / `https` 接收页面。`fallbackDocumentUrl` 用于未来的纸质参与表或备用说明文档，只允许使用 `http` 或 `https`。配置中不得写入令牌或 Drive 权限信息。

## 未来切换到在线表单的顺序

1. 创建专用 Drive 文件夹和结果 Sheets，并记录运营方可识别的名称。
2. 部署 Apps Script Web App，确认访问权限、表单校验、文件归档和 Sheets 记录都能完成一条测试提交。
3. 在独立测试副本中填入测试地址，确认主页按钮能打开接收页面。
4. 确认测试数据和测试文件已删除或标记为测试后，再把同一配置更新到正式站点。
5. 若接收端出现异常，立即把 `formUrl` 恢复为当前活动邮箱的 `mailto:` 地址。

## 责任边界

静态主页不直接访问 Drive 或 Sheets，也不保存 Google 凭据。当前数字作品需将作品信息与参与表整理为 PDF，并连同规定的图像、说明视频及必要补充资料发送到活动邮箱。未来接入在线表单时，仍需在接收端明确文件格式、容量、数量和处理流程。

## 官方参考

- [Apps Script Web Apps](https://developers.google.com/apps-script/guides/web)
- [HTML Service communication](https://developers.google.com/apps-script/guides/html/communication)
