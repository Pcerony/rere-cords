# RERE-CORDS 提交入口接入说明

## 当前状态

主页当前没有独立报名步骤，参与者完成作品提交即视为正式参加。参与路径分为实体成品、唱片参与的数字成果、纯数字作品三类。两类数字成果通过活动邮箱接收，按钮使用 `mailto:` 打开邮件客户端；实体成品则投入7号馆2层 MEDIA STUDIO 房间前的回收箱，其参与表与补充资料仍可通过邮箱提交。

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

静态主页不直接访问 Drive 或 Sheets，也不保存 Google 凭据。唱片参与的数字成果需额外提供唱片实际进入创作过程的记录；纯数字作品需说明与活动主题的关系，并提供现场展示、播放或运行条件。未来接入在线表单时，应把 `physical`、`record-digital`、`digital-native` 作为稳定的路径值，并在接收端分别校验文件格式、容量、数量和材料要求。

## 官方参考

- [Apps Script Web Apps](https://developers.google.com/apps-script/guides/web)
- [HTML Service communication](https://developers.google.com/apps-script/guides/html/communication)
