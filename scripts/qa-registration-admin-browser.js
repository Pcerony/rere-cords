async (page) => {
    await page.unrouteAll();
    await page.route('**/safety-tool-reservation-config.js*', (route) => route.fulfill({ contentType: 'application/javascript', body: 'window.RERE_CORDS_RESERVATION_CONFIG={supabaseUrl:"https://example.supabase.co",publishableKey:"browser-test-only"};' }));
    await page.route('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@*/**', (route) => route.fulfill({ contentType: 'application/javascript', body: `
        const record = {id:'be614a6a-d967-4f2e-b63c-d9e18c9f0e46',registration_code:'RRC-W-TEST',work_title:'Record Study',participant_name:'Example Artist',email:'artist@example.org',description:'<script>window.untrustedExecuted=true</script>',salon:'yes',created_at:'2026-10-31T00:00:00Z',physical_received:false,event_registration_files:[{object_path:'test/image.png'}],video_url:'https://example.org/video'};
        let onAuth;
        window.supabase={createClient:()=>({
            auth:{getSession:async()=>({data:{session:{user:{id:'example'}}}}),onAuthStateChange:(callback)=>{onAuth=callback;},signOut:async()=>{onAuth('SIGNED_OUT');return {}; }},
            rpc:async(name,args)=>{if(name==='is_event_registration_admin')return {data:true};record.physical_received=args.p_received;return {};},
            from:()=>{const query={select:()=>query,order:()=>query,eq:()=>query,range:async()=>({data:[record],count:1})};return query;},
            storage:{from:()=>({createSignedUrl:async()=>({data:{signedUrl:'https://example.org/private-test.png'}})})}
        })};
    ` }));
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('http://127.0.0.1:4173/event-registration-admin.html');
    await page.getByRole('heading', { name: 'Record Study' }).waitFor();
    if (await page.evaluate(() => window.untrustedExecuted === true)) throw Error('Untrusted work text executed');
    await page.getByRole('button', { name: '查看图片 1', exact: true }).click();
    await page.getByRole('link', { name: '打开图片 1（5分钟内有效）' }).waitFor();
    page.once('dialog', (dialog) => dialog.accept());
    await page.getByRole('button', { name: '确认已核对实体作品', exact: true }).click();
    await page.getByText('已核对实体作品', { exact: true }).waitFor();
    await page.screenshot({ path: 'output/playwright/registration-admin-desktop.png', fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    const fits = await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
    if (!fits) throw Error('Admin page overflows mobile viewport');
    await page.screenshot({ path: 'output/playwright/registration-admin-mobile.png', fullPage: true });
    await page.getByRole('button', { name: '退出登录', exact: true }).click();
    if (await page.locator('#registration-records').textContent() !== '') throw Error('Sign-out retained participant details');
    console.log('PASS: admin reads, safe text, signed photo action, physical match, mobile width and sign-out cleanup. Auth/database were intercepted test substitutes.');
}
