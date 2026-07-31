(() => {
    'use strict';

    const listElement = document.getElementById('submission-list');
    const emptyElement = document.getElementById('submission-empty');
    const countElement = document.getElementById('submission-count');
    const statusElement = document.getElementById('admin-status');
    const refreshButton = document.getElementById('refresh-submissions');
    const requestedReceipt = new URLSearchParams(location.search).get('receipt');

    function formatBytes(bytes) {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KiB`;
        return `${(bytes / 1024 / 1024).toFixed(1)} MiB`;
    }

    function element(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    }

    function detailRow(label, value) {
        const row = element('div', 'admin-detail');
        row.append(element('span', '', label), element('strong', '', value || '—'));
        return row;
    }

    function renderFile(receipt, file) {
        const item = element('article', 'admin-file');
        if (file.mimeType.startsWith('image/')) {
            const preview = document.createElement('img');
            preview.src = file.downloadUrl;
            preview.alt = `Preview of ${file.originalName}`;
            preview.loading = 'lazy';
            item.append(preview);
        }
        const body = element('div', 'admin-file-body');
        body.append(element('strong', '', file.originalName));
        body.append(element('span', '', `${file.mimeType} / ${formatBytes(file.size)}`));
        const digest = element('code', '', `SHA-256 ${file.sha256}`);
        body.append(digest);
        const download = element('a', 'text-action', '下载附件');
        download.href = file.downloadUrl;
        download.download = file.originalName;
        body.append(download);
        item.append(body);
        return item;
    }

    function renderReceipt(receipt) {
        const card = element('article', 'receipt-card admin-receipt');
        card.id = `receipt-${receipt.id}`;
        if (receipt.id === requestedReceipt) card.classList.add('is-requested');

        const header = element('header', 'admin-receipt-header');
        const titleGroup = element('div');
        titleGroup.append(element('p', 'receipt-id', receipt.id));
        titleGroup.append(element('h3', '', receipt.fields.workTitle));
        header.append(titleGroup, element('time', '', new Date(receipt.receivedAt).toLocaleString()));

        const details = element('div', 'admin-details');
        details.append(
            detailRow('创作者', receipt.fields.creatorName),
            detailRow('邮箱', receipt.fields.email),
            detailRow('所属', receipt.fields.affiliation),
            detailRow('类型', receipt.fields.workType)
        );

        const description = element('div', 'admin-description');
        description.append(element('span', '', '作品说明'), element('p', '', receipt.fields.description));

        const filesHeading = element('div', 'admin-files-heading');
        filesHeading.append(element('h4', '', `服务器文件 (${receipt.files.length})`), element('span', '', 'Hash verified at receipt'));
        const files = element('div', 'admin-files');
        receipt.files.forEach((file) => files.append(renderFile(receipt, file)));
        card.append(header, details, description, filesHeading, files);
        return card;
    }

    async function loadSubmissions() {
        refreshButton.disabled = true;
        statusElement.textContent = '正在重新读取本地存储...';
        try {
            const response = await fetch('/api/submissions');
            const payload = await response.json();
            if (!response.ok) throw new Error(payload.message || '无法读取记录。');

            listElement.replaceChildren();
            payload.submissions.forEach((receipt) => listElement.append(renderReceipt(receipt)));
            countElement.textContent = String(payload.count);
            emptyElement.hidden = payload.count !== 0;
            statusElement.textContent = `最后刷新 ${new Date().toLocaleTimeString()}`;

            if (requestedReceipt) {
                const target = document.getElementById(`receipt-${requestedReceipt}`);
                if (target) target.scrollIntoView({ block: 'center' });
                else statusElement.textContent = `没有找到提交编号 ${requestedReceipt}`;
            }
        } catch (error) {
            statusElement.textContent = error.message;
            statusElement.dataset.tone = 'error';
        } finally {
            refreshButton.disabled = false;
        }
    }

    refreshButton.addEventListener('click', loadSubmissions);
    loadSubmissions();
})();
