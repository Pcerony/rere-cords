# RERE-CORDS 提交入口接入说明

## 当前状态

主页入口默认关闭。`submission-config.js` 中的 `enabled` 必须保持为 `false`，直到外部接收页面完成测试。

## 配置合同

```js
window.RERE_CORDS_SUBMISSION_CONFIG = {
    enabled: false,
    formUrl: '',
    fallbackDocumentUrl: ''
};
```

`formUrl` 用于未来的 Apps Script Web App 或其他外部接收页面；`fallbackDocumentUrl` 用于未来的纸质参与表或备用说明文档。两个地址都只能使用 `http` 或 `https`，不能写入令牌或 Drive 权限信息。

## 正式开放前的顺序

1. 创建专用 Drive 文件夹和结果 Sheets，并记录运营方可识别的名称。
2. 部署 Apps Script Web App，确认访问权限、表单校验、文件归档和 Sheets 记录都能完成一条测试提交。
3. 在独立测试副本中填入测试地址，将 `enabled` 改为 `true`，确认主页按钮能打开接收页面。
4. 确认测试数据和测试文件已删除或标记为测试后，再把同一配置更新到正式站点。
5. 若接收端出现异常，立即将 `enabled` 改回 `false`；主页会恢复为不可提交状态。

## 责任边界

静态主页不直接访问 Drive 或 Sheets，也不保存 Google 凭据。参与表字段、文件格式、容量、数量、截止时间和审核流程必须在后续需求确认后，分别写入接收端说明和参与者页面。

## 官方参考

- [Apps Script Web Apps](https://developers.google.com/apps-script/guides/web)
- [HTML Service communication](https://developers.google.com/apps-script/guides/html/communication)
