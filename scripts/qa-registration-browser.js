async (page) => {
    const ids = [];
    await page.route('**/event-registration-config.js*', (route) => route.fulfill({ contentType: 'application/javascript', body: 'window.RERE_CORDS_REGISTRATION_CONFIG={enabled:true,turnstileSiteKey:"browser-test-only"};' }));
    await page.route('**/safety-tool-reservation-config.js*', (route) => route.fulfill({ contentType: 'application/javascript', body: 'window.RERE_CORDS_RESERVATION_CONFIG={supabaseUrl:"http://127.0.0.1:4173",publishableKey:"browser-test-only"};' }));
    await page.route('https://challenges.cloudflare.com/**', (route) => route.fulfill({ contentType: 'application/javascript', body: 'window.turnstile={render:(target,options)=>{window.testCaptcha=options.callback;queueMicrotask(()=>options.callback("test-token"));return "test";},reset:()=>queueMicrotask(()=>window.testCaptcha("new-test-token"))};' }));
    await page.route('**/functions/v1/event-registration', async (route) => {
        const body = route.request().postData();
        ids.push(JSON.parse(body.match(/\{"submissionId"[^\r\n]+/)[0]).submissionId);
        await route.fulfill({ status: ids.length === 1 ? 503 : ids.length === 2 ? 403 : 201, contentType: 'application/json', body: JSON.stringify(ids.length === 1 ? { code: 'SUBMISSION_FAILED' } : ids.length === 2 ? { code: 'CAPTCHA_FAILED' } : { ok: true, code: 'RRC-W-BROWSER-TEST' }) });
    });
    await page.goto('http://127.0.0.1:4173/event-registration.html');
    await page.locator('#registration-language').selectOption('en');
    await page.locator('#registration-name').fill('Example Artist');
    await page.locator('#registration-email').fill('artist@example.org');
    await page.locator('#registration-title').fill('Record Study');
    await page.locator('#registration-description').fill('A record transformed into a small sculpture.');
    await page.locator('#registration-video').fill('https://example.org/shared-video');
    await page.locator('[name="privacyAccepted"]').check();
    await page.locator('#registration-submit').click();
    await page.locator('#registration-message').filter({ hasText: 'could not confirm' }).waitFor();
    if (!await page.locator('#registration-description').isDisabled()) throw Error('Ambiguous retry must retain immutable snapshot');
    const captchaResponse = page.waitForResponse((response) => response.url().endsWith('/functions/v1/event-registration'));
    await page.locator('#registration-submit').click();
    await captchaResponse;
    await page.waitForFunction(() => !document.getElementById('registration-submit').disabled);
    if (!await page.locator('#registration-description').isDisabled()) throw Error('Captcha failure after uncertain commit lost retry identity');
    await page.locator('#registration-submit').click();
    await page.locator('#registration-receipt').waitFor({ state: 'visible' });
    if (ids.length !== 3 || ids.some((id) => id !== ids[0])) throw Error('Retry used a different submission identity');
    if (await page.locator('#receipt-code').textContent() !== 'RRC-W-BROWSER-TEST') throw Error('Receipt missing');
    await page.screenshot({ path: 'output/playwright/registration-receipt.png', fullPage: true });
    console.log('PASS: browser submit -> uncertain response -> immutable retry with same UUID -> receipt. API and captcha were intercepted test substitutes.');
}
