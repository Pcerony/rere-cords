export const MAX_FILES = 8;
export const MAX_FILE_SIZE = 25 * 1024 * 1024;
export const MAX_TOTAL_SIZE = 100 * 1024 * 1024;

export const WORK_TYPES = new Set([
    'image',
    'data',
    'interactive',
    'video',
    'mixed',
    'other'
]);

export const ACCEPTED_MEDIA_TYPES = new Set([
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'application/pdf',
    'video/mp4',
    'video/webm',
    'text/plain',
    'text/csv',
    'application/json',
    'application/zip',
    'application/x-zip-compressed'
]);

export const FIELD_RULES = {
    creatorName: { label: 'Creator name', required: true, maxLength: 120 },
    email: { label: 'Email', required: true, maxLength: 254 },
    affiliation: { label: 'Affiliation', required: false, maxLength: 160 },
    workTitle: { label: 'Work title', required: true, maxLength: 160 },
    workType: { label: 'Work type', required: true, maxLength: 32 },
    description: { label: 'Description', required: true, maxLength: 3000 }
};

export const PUBLIC_FILES = new Map([
    ['/submission-prototype.html', { file: 'submission-prototype.html', type: 'text/html; charset=utf-8' }],
    ['/submission-admin.html', { file: 'submission-admin.html', type: 'text/html; charset=utf-8' }],
    ['/submission-prototype.css', { file: 'submission-prototype.css', type: 'text/css; charset=utf-8' }],
    ['/submission-prototype.js', { file: 'submission-prototype.js', type: 'text/javascript; charset=utf-8' }],
    ['/submission-admin.js', { file: 'submission-admin.js', type: 'text/javascript; charset=utf-8' }],
    ['/favicon.svg', { file: 'favicon.svg', type: 'image/svg+xml' }],
    ['/favicon.png', { file: 'favicon.png', type: 'image/png' }]
]);
