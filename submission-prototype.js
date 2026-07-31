(() => {
    'use strict';

    const MAX_FILES = 8;
    const MAX_FILE_SIZE = 25 * 1024 * 1024;
    const MAX_TOTAL_SIZE = 100 * 1024 * 1024;
    const ACCEPTED_TYPES = new Set([
        'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf',
        'video/mp4', 'video/webm', 'text/plain', 'text/csv', 'application/json',
        'application/zip', 'application/x-zip-compressed'
    ]);

    const form = document.getElementById('submission-form');
    const fileInput = document.getElementById('files');
    const dropzone = document.getElementById('file-dropzone');
    const selectedFilesElement = document.getElementById('selected-files');
    const statusElement = document.getElementById('submission-status');
    const submitButton = document.getElementById('submit-work');
    const progress = document.getElementById('upload-progress');
    const receiptElement = document.getElementById('submission-receipt');
    const receiptSummary = document.getElementById('receipt-summary');
    const receiptFiles = document.getElementById('receipt-files');
    const copyReceiptButton = document.getElementById('copy-receipt');
    const adminReceiptLink = document.getElementById('open-admin-receipt');
    const description = document.getElementById('description');
    const descriptionCount = document.getElementById('description-count');
    let selectedFiles = [];
    let lastReceipt = null;

    function formatBytes(bytes) {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KiB`;
        return `${(bytes / 1024 / 1024).toFixed(1)} MiB`;
    }

    function fileKey(file) {
        return `${file.name}:${file.size}:${file.lastModified}`;
    }

    function validationMessage(files) {
        if (files.length === 0) return '请至少添加一个作品文件。';
        if (files.length > MAX_FILES) return `最多只能添加 ${MAX_FILES} 个文件。`;
        const unsupported = files.find((file) => !ACCEPTED_TYPES.has(file.type));
        if (unsupported) return `${unsupported.name} 的文件类型暂不支持。`;
        const oversized = files.find((file) => file.size > MAX_FILE_SIZE);
        if (oversized) return `${oversized.name} 超过 25 MiB。`;
        const total = files.reduce((sum, file) => sum + file.size, 0);
        if (total > MAX_TOTAL_SIZE) return '全部文件总计超过 100 MiB。';
        return '';
    }

    function setStatus(message, tone = '') {
        statusElement.textContent = message;
        statusElement.dataset.tone = tone;
    }

    function renderSelectedFiles() {
        selectedFilesElement.replaceChildren();
        if (selectedFiles.length === 0) {
            const empty = document.createElement('p');
            empty.className = 'file-empty';
            empty.textContent = '尚未选择文件';
            selectedFilesElement.append(empty);
            return;
        }

        const list = document.createElement('ul');
        list.className = 'file-list';
        selectedFiles.forEach((file, index) => {
            const row = document.createElement('li');
            row.className = 'file-row';

            const info = document.createElement('div');
            const name = document.createElement('strong');
            name.textContent = file.name;
            const meta = document.createElement('span');
            meta.textContent = `${file.type || 'Unknown type'} / ${formatBytes(file.size)}`;
            info.append(name, meta);

            const remove = document.createElement('button');
            remove.type = 'button';
            remove.className = 'file-remove';
            remove.setAttribute('aria-label', `移除 ${file.name}`);
            remove.textContent = '×';
            remove.addEventListener('click', () => {
                selectedFiles.splice(index, 1);
                renderSelectedFiles();
            });
            row.append(info, remove);
            list.append(row);
        });
        selectedFilesElement.append(list);
    }

    function addFiles(fileList) {
        const known = new Set(selectedFiles.map(fileKey));
        for (const file of fileList) {
            if (!known.has(fileKey(file))) {
                selectedFiles.push(file);
                known.add(fileKey(file));
            }
        }
        const error = validationMessage(selectedFiles);
        if (error) setStatus(error, 'error');
        else setStatus(`${selectedFiles.length} 个文件已准备`, 'ready');
        renderSelectedFiles();
    }

    function appendDefinition(list, term, detail) {
        const dt = document.createElement('dt');
        dt.textContent = term;
        const dd = document.createElement('dd');
        dd.textContent = detail;
        list.append(dt, dd);
    }

    function renderReceipt(receipt) {
        lastReceipt = receipt;
        receiptSummary.replaceChildren();
        receiptFiles.replaceChildren();
        appendDefinition(receiptSummary, '提交编号', receipt.id);
        appendDefinition(receiptSummary, '服务器时间', new Date(receipt.receivedAt).toLocaleString());
        appendDefinition(receiptSummary, '作品', receipt.fields.workTitle);
        appendDefinition(receiptSummary, '创作者', receipt.fields.creatorName);

        const heading = document.createElement('h3');
        heading.textContent = `已保存文件 (${receipt.files.length})`;
        receiptFiles.append(heading);
        receipt.files.forEach((file) => {
            const item = document.createElement('div');
            item.className = 'receipt-file';
            const name = document.createElement('strong');
            name.textContent = file.originalName;
            const details = document.createElement('span');
            details.textContent = `${formatBytes(file.size)} / SHA-256 ${file.sha256.slice(0, 12)}...`;
            item.append(name, details);
            receiptFiles.append(item);
        });

        adminReceiptLink.href = `submission-admin.html?receipt=${encodeURIComponent(receipt.id)}`;
        receiptElement.hidden = false;
        receiptElement.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    }

    function receiptText(receipt) {
        const files = receipt.files.map((file) => `- ${file.originalName} (${formatBytes(file.size)}) SHA-256 ${file.sha256}`).join('\n');
        return [
            'RERE-CORDS submission receipt',
            `Receipt: ${receipt.id}`,
            `Received: ${receipt.receivedAt}`,
            `Creator: ${receipt.fields.creatorName}`,
            `Work: ${receipt.fields.workTitle}`,
            'Files:',
            files
        ].join('\n');
    }

    function sendSubmission(body) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/api/submissions');
            xhr.responseType = 'json';
            xhr.upload.addEventListener('progress', (event) => {
                if (!event.lengthComputable) return;
                progress.value = Math.round((event.loaded / event.total) * 100);
                progress.textContent = `${progress.value}%`;
            });
            xhr.addEventListener('load', () => {
                const payload = xhr.response || {};
                if (xhr.status === 201) resolve(payload);
                else reject(new Error(payload.message || '服务器拒绝了这次提交。'));
            });
            xhr.addEventListener('error', () => reject(new Error('无法连接本地上传服务。请确认原型服务器仍在运行。')));
            xhr.addEventListener('abort', () => reject(new Error('上传已取消。')));
            xhr.send(body);
        });
    }

    fileInput.addEventListener('change', () => {
        addFiles(fileInput.files);
        fileInput.value = '';
    });
    dropzone.addEventListener('click', (event) => {
        if (event.target !== fileInput) fileInput.click();
    });
    dropzone.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            fileInput.click();
        }
    });
    for (const eventName of ['dragenter', 'dragover']) {
        dropzone.addEventListener(eventName, (event) => {
            event.preventDefault();
            dropzone.classList.add('is-dragging');
        });
    }
    for (const eventName of ['dragleave', 'drop']) {
        dropzone.addEventListener(eventName, (event) => {
            event.preventDefault();
            dropzone.classList.remove('is-dragging');
        });
    }
    dropzone.addEventListener('drop', (event) => addFiles(event.dataTransfer.files));

    description.addEventListener('input', () => {
        descriptionCount.textContent = `${description.value.length} / 3000`;
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!form.reportValidity()) {
            setStatus('请先完成必填信息。', 'error');
            return;
        }
        const fileError = validationMessage(selectedFiles);
        if (fileError) {
            setStatus(fileError, 'error');
            dropzone.focus();
            return;
        }

        const body = new FormData(form);
        body.delete('files');
        selectedFiles.forEach((file) => body.append('files', file, file.name));
        submitButton.disabled = true;
        progress.hidden = false;
        progress.value = 0;
        setStatus('正在上传并等待服务器确认...', 'sending');

        try {
            const receipt = await sendSubmission(body);
            progress.value = 100;
            setStatus(`已接收 / ${receipt.id}`, 'success');
            renderReceipt(receipt);
        } catch (error) {
            progress.hidden = true;
            setStatus(error.message, 'error');
        } finally {
            submitButton.disabled = false;
        }
    });

    copyReceiptButton.addEventListener('click', async () => {
        if (!lastReceipt) return;
        try {
            await navigator.clipboard.writeText(receiptText(lastReceipt));
            copyReceiptButton.textContent = '已复制';
            setTimeout(() => { copyReceiptButton.textContent = '复制凭证'; }, 1600);
        } catch {
            setStatus('浏览器未允许复制，请直接记录提交编号。', 'error');
        }
    });

    renderSelectedFiles();
})();
