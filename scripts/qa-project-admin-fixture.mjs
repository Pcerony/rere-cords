import { readFile, writeFile, mkdir } from 'node:fs/promises';

// Local synthetic data only. The deployment workflow excludes output/ and scripts/.
const target = new URL('../output/admin-fixture.html', import.meta.url);
let html = await readFile(new URL('../safety-tool-admin.html', import.meta.url), 'utf8');
html = html.replace('<head>', '<head><base href="/">')
    .replace(/<script src="https:\/\/cdn\.jsdelivr[^>]+><\/script>/, '<script src="output/admin-fixture-data.js"></script>')
    .replace(/<script src="safety-tool-reservation-config[^>]+><\/script>/, '');
await mkdir(new URL('../output/', import.meta.url), { recursive: true });
await writeFile(target, html);
await writeFile(new URL('../output/admin-fixture-data.js', import.meta.url), `
window.RERE_CORDS_RESERVATION_CONFIG={supabaseUrl:'https://example.invalid',publishableKey:'synthetic-only'};
const params=new URLSearchParams(location.search);
let session=params.has('loggedout')?null:{user:{id:'test-admin'}};
let authChanged=()=>{};
const registration={id:'test-registration',registration_code:'RRC-W-TEST',work_title:'[测试] Record Study',participant_name:'Synthetic Artist',email:'artist@example.org',description:'<script>untrusted text</script>',physical_received:false,created_at:'2026-10-31T00:00:00Z',event_registration_files:[{object_path:'test/image.png'}],video_url:'https://example.org/video'};
const reservation={id:'test-reservation',reservation_code:'RRC-TEST',participant_name:'Synthetic Borrower',email:'borrower@example.org',student_number:'TEST-001',course:'Design',pickup_date:'2026-11-01',return_date:'2026-11-03',status:'pending',reservation_items:[{equipment_id:'gloves',quantity:1}]};
window.supabase={createClient:()=>({
 auth:{getSession:async()=>({data:{session}}),onAuthStateChange:callback=>{authChanged=callback;},signInWithPassword:async()=>{session={user:{id:'test-admin'}};return {data:{session}};},signOut:async()=>{if(params.has('signoutfail'))return {error:Error('test failure')};session=null;authChanged('SIGNED_OUT',null);return {}; }},
 rpc:async(name,args)=>{if(name==='is_reservation_admin')return {data:params.get('role')!=='registrations'};if(name==='is_event_registration_admin')return {data:params.get('role')!=='equipment'};if(name==='admin_set_event_physical_received'){registration.physical_received=args.p_received;return {};}reservation.status=args.p_status;return {data:{ok:true,status:args.p_status}};},
 from:table=>{const query={select:()=>query,order:()=>query,eq:()=>query,range:async()=>{if(params.has('slow'))await new Promise(r=>setTimeout(r,3000));return {data:[registration],count:1};},then:(resolve,reject)=>Promise.resolve({data:[reservation]}).then(resolve,reject)};return query;},
 storage:{from:()=>({createSignedUrl:async()=>({data:{signedUrl:'https://example.org/test-image.png'}})})}
})};
`);
console.log('Synthetic admin fixture: http://127.0.0.1:4173/output/admin-fixture.html');
