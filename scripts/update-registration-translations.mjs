import { readFile, writeFile } from 'node:fs/promises';

// Keep these operational instructions independent of the remote translation service.
const keys = ['pathway-physical-submit', 'req-sub-text', 'lead-submission', 'submission-physical-text', 'submission-physical-options', 'submission-status-label', 'submission-status', 'submission-cta', 'apply-period-text'];
const updates = {
    'zh-TW': [
        '將寫有作者名和電郵的紙條隨作品投入回收箱，再掃描QR碼完成線上報名。',
        '僅接受實體作品。附上作者名和電郵紙條，放入回收箱後填寫線上報名表。圖片及影片連結為選填。',
        '無須事前報名。將作品與作者名、電郵紙條投入回收箱，再以相同姓名及電郵完成線上報名。',
        '在回收箱旁準備好的紙條填寫作者名和電郵，隨作品投入7號館2樓 MEDIA STUDIO 房間前的回收箱，再掃描QR碼報名。',
        '<strong>線上必填：</strong>姓名、電郵、作品名、200字以內的簡介。<strong>選填：</strong>沙龍意向、圖片、影片連結、專業、學年、出身地及補充說明。影片不限平台，請確認可供主辦方查看。',
        '報名方式', '提交實體作品後填寫線上表格', '填寫作品報名表',
        '2026年10月1日至11月10日。請於期間內提交實體作品及作者資訊紙條，並完成線上報名。'
    ],
    ko: [
        '작가명과 이메일을 적은 쪽지를 작품에 첨부해 수거함에 넣고 QR 코드를 스캔해 온라인으로 등록하세요.',
        '실물 작품만 접수합니다. 이름과 이메일을 적은 쪽지를 첨부하고 수거함에 넣은 뒤 온라인으로 등록하세요. 사진과 동영상 링크는 선택 사항입니다.',
        '사전 신청은 필요하지 않습니다. 작품과 이름·이메일 쪽지를 제출한 뒤 동일한 정보로 온라인 등록을 완료하세요.',
        '수거함 옆의 준비된 용지에 작가명과 이메일을 적어 작품과 함께 7관 2층 MEDIA STUDIO실 앞 수거함에 넣으세요. 이후 QR 코드로 등록하세요.',
        '<strong>온라인 필수:</strong> 이름, 이메일, 작품명, 200자 이내 소개. <strong>선택:</strong> 살롱 참석, 사진, 동영상 링크, 전공, 학년, 출신지, 추가 설명. 동영상 서비스는 자유이며 주최자가 볼 수 있어야 합니다.',
        '참가 등록', '실물 작품 제출 후 온라인 양식 작성', '작품 등록하기',
        '2026년 10월 1일–11월 10일. 기간 내 실물 작품과 작가 정보 쪽지를 제출하고 온라인 등록을 완료하세요.'
    ],
    id: [
        'Sertakan catatan nama pembuat dan email pada karya, masukkan ke kotak, lalu pindai kode QR untuk mendaftar daring.',
        'Hanya karya fisik. Sertakan nama dan email, masukkan karya ke kotak, lalu isi formulir daring. Foto dan tautan video bersifat opsional.',
        'Tidak perlu mendaftar sebelumnya. Serahkan karya dengan catatan nama dan email, lalu daftar daring menggunakan data yang sama.',
        'Tulis nama pembuat dan email pada kertas yang tersedia. Masukkan bersama karya ke kotak di depan MEDIA STUDIO, Gedung 7 lantai 2, lalu daftar melalui kode QR.',
        '<strong>Wajib daring:</strong> nama, email, judul, deskripsi maksimal 200 karakter. <strong>Opsional:</strong> salon, foto, tautan video, jurusan, tahun studi, daerah asal, catatan. Layanan video bebas; pastikan panitia dapat mengaksesnya.',
        'Pendaftaran', 'Serahkan karya fisik, lalu isi formulir daring', 'Daftarkan karya',
        '1 Oktober–10 November 2026. Serahkan karya fisik beserta catatan identitas dan selesaikan pendaftaran daring selama periode ini.'
    ],
    vi: [
        'Đính kèm giấy ghi tên tác giả và email, đặt tác phẩm vào hộp thu nhận rồi quét mã QR để đăng ký trực tuyến.',
        'Chỉ nhận tác phẩm vật lý. Kèm giấy ghi tên và email, nộp vào hộp rồi đăng ký trực tuyến. Ảnh và liên kết video là tùy chọn.',
        'Không cần đăng ký trước. Nộp tác phẩm cùng giấy ghi tên và email, sau đó đăng ký trực tuyến bằng cùng thông tin.',
        'Ghi tên tác giả và email trên giấy có sẵn bên hộp. Đặt cùng tác phẩm vào hộp trước phòng MEDIA STUDIO, tầng 2 nhà 7, rồi đăng ký qua mã QR.',
        '<strong>Bắt buộc trực tuyến:</strong> tên, email, tên tác phẩm, mô tả tối đa 200 ký tự. <strong>Tùy chọn:</strong> salon, ảnh, liên kết video, chuyên ngành, năm học, quê quán, ghi chú. Có thể dùng mọi dịch vụ video; bảo đảm ban tổ chức xem được.',
        'Đăng ký', 'Nộp tác phẩm vật lý rồi điền biểu mẫu trực tuyến', 'Đăng ký tác phẩm',
        '1/10–10/11/2026. Nộp tác phẩm vật lý kèm giấy thông tin tác giả và hoàn tất đăng ký trực tuyến trong thời gian này.'
    ],
    th: [
        'แนบกระดาษระบุชื่อผู้สร้างและอีเมลกับผลงาน ใส่ในกล่องรับผลงาน แล้วสแกน QR เพื่อสมัครออนไลน์',
        'รับเฉพาะผลงานจริง แนบชื่อและอีเมล ใส่กล่องแล้วกรอกแบบฟอร์มออนไลน์ รูปภาพและลิงก์วิดีโอไม่บังคับ',
        'ไม่ต้องสมัครล่วงหน้า ส่งผลงานพร้อมกระดาษระบุชื่อและอีเมล แล้วสมัครออนไลน์ด้วยข้อมูลเดียวกัน',
        'เขียนชื่อผู้สร้างและอีเมลลงกระดาษที่เตรียมไว้ แนบกับผลงานและใส่กล่องหน้าห้อง MEDIA STUDIO ชั้น 2 อาคาร 7 แล้วสมัครผ่าน QR',
        '<strong>ข้อมูลบังคับออนไลน์:</strong> ชื่อ อีเมล ชื่อผลงาน และคำอธิบายไม่เกิน 200 ตัวอักษร <strong>ไม่บังคับ:</strong> ซาลอน รูป ลิงก์วิดีโอ สาขา ชั้นปี ภูมิลำเนา และหมายเหตุ ใช้บริการวิดีโอใดก็ได้ โปรดเปิดสิทธิ์ให้ผู้จัดดูได้',
        'การสมัคร', 'ส่งผลงานจริงแล้วกรอกแบบฟอร์มออนไลน์', 'ลงทะเบียนผลงาน',
        '1 ตุลาคม–10 พฤศจิกายน 2026 ส่งผลงานจริงพร้อมกระดาษข้อมูลผู้สร้างและสมัครออนไลน์ภายในช่วงนี้'
    ],
    bn: [
        'স্রষ্টার নাম ও ইমেইল লেখা কাগজ কাজের সঙ্গে সংগ্রহ বাক্সে রাখুন, তারপর QR কোড স্ক্যান করে অনলাইনে নিবন্ধন করুন।',
        'শুধু বাস্তব শিল্পকর্ম গ্রহণ করা হয়। নাম ও ইমেইলের কাগজসহ জমা দিয়ে অনলাইন ফর্ম পূরণ করুন। ছবি ও ভিডিও লিংক ঐচ্ছিক।',
        'আগাম নিবন্ধন দরকার নেই। নাম ও ইমেইলসহ কাজ জমা দিন, তারপর একই তথ্য দিয়ে অনলাইনে নিবন্ধন করুন।',
        'বাক্সের পাশে রাখা কাগজে স্রষ্টার নাম ও ইমেইল লিখুন। কাজসহ ভবন ৭-এর দ্বিতীয় তলায় MEDIA STUDIO-এর সামনের বাক্সে রাখুন এবং QR কোডে নিবন্ধন করুন।',
        '<strong>অনলাইনে আবশ্যক:</strong> নাম, ইমেইল, কাজের নাম, সর্বোচ্চ ২০০ অক্ষরের বিবরণ। <strong>ঐচ্ছিক:</strong> স্যালন, ছবি, ভিডিও লিংক, বিভাগ, শিক্ষাবর্ষ, জন্মস্থান ও মন্তব্য। যেকোনো ভিডিও সেবা ব্যবহার করা যায়; আয়োজকদের দেখার অনুমতি দিন।',
        'নিবন্ধন', 'বাস্তব কাজ জমা দিয়ে অনলাইন ফর্ম পূরণ করুন', 'কাজ নিবন্ধন করুন',
        '১ অক্টোবর–১০ নভেম্বর ২০২৬। এই সময়ের মধ্যে বাস্তব কাজ ও পরিচয়ের কাগজ জমা দিয়ে অনলাইন নিবন্ধন সম্পন্ন করুন।'
    ],
    ar: [
        'أرفق بالعمل ورقة تحمل اسم المؤلف وبريده الإلكتروني، وضعه في صندوق الاستلام ثم امسح رمز QR للتسجيل عبر الإنترنت.',
        'تُقبل الأعمال المادية فقط. أرفق ورقة بالاسم والبريد، ثم أودع العمل وأكمل النموذج الإلكتروني. الصور وروابط الفيديو اختيارية.',
        'لا يلزم تسجيل مسبق. سلّم العمل مع ورقة الاسم والبريد الإلكتروني، ثم سجّل عبر الإنترنت بالمعلومات نفسها.',
        'اكتب اسم المؤلف وبريده على الورقة المتاحة بجانب الصندوق، وضعها مع العمل أمام MEDIA STUDIO بالطابق الثاني من المبنى 7، ثم سجّل باستخدام رمز QR.',
        '<strong>المطلوب إلكترونياً:</strong> الاسم والبريد وعنوان العمل ووصف لا يتجاوز 200 حرف. <strong>اختياري:</strong> الصالون والصور ورابط الفيديو والتخصص والسنة والمنشأ والملاحظات. يمكن استخدام أي خدمة فيديو؛ تأكد من إتاحة المشاهدة للمنظمين.',
        'التسجيل', 'سلّم العمل المادي ثم أكمل النموذج الإلكتروني', 'تسجيل العمل',
        '1 أكتوبر–10 نوفمبر 2026. سلّم العمل المادي وورقة بيانات المؤلف وأكمل التسجيل الإلكتروني خلال هذه الفترة.'
    ],
    fr: [
        'Joignez une fiche avec votre nom d’auteur et votre e-mail, déposez l’œuvre dans la boîte, puis scannez le QR code pour vous inscrire en ligne.',
        'Œuvres physiques uniquement. Joignez votre nom et votre e-mail, déposez l’œuvre puis remplissez le formulaire en ligne. Photos et liens vidéo facultatifs.',
        'Aucune inscription préalable. Déposez votre œuvre avec une fiche portant votre nom et votre e-mail, puis inscrivez-vous en ligne avec les mêmes informations.',
        'Indiquez votre nom d’auteur et votre e-mail sur la fiche disponible. Déposez-la avec l’œuvre devant MEDIA STUDIO, au 2e étage du bâtiment 7, puis inscrivez-vous via le QR code.',
        '<strong>Obligatoire en ligne :</strong> nom, e-mail, titre, description de 200 caractères maximum. <strong>Facultatif :</strong> salon, photos, lien vidéo, spécialité, année, origine, notes. Tout service vidéo convient ; vérifiez les droits de consultation.',
        'Inscription', 'Déposez l’œuvre physique, puis remplissez le formulaire', 'Inscrire votre œuvre',
        'Du 1er octobre au 10 novembre 2026. Déposez votre œuvre et sa fiche d’identification et terminez l’inscription en ligne pendant cette période.'
    ],
    hi: [
        'कलाकार का नाम और ईमेल लिखी पर्ची कृति के साथ संग्रह बॉक्स में रखें, फिर QR कोड स्कैन करके ऑनलाइन पंजीकरण करें।',
        'केवल भौतिक कृतियाँ स्वीकार हैं। नाम और ईमेल की पर्ची लगाकर कृति जमा करें और ऑनलाइन फ़ॉर्म भरें। तस्वीरें और वीडियो लिंक वैकल्पिक हैं।',
        'पहले से पंजीकरण आवश्यक नहीं है। नाम और ईमेल की पर्ची के साथ कृति जमा करें, फिर उन्हीं विवरणों से ऑनलाइन पंजीकरण करें।',
        'बॉक्स के पास उपलब्ध पर्ची पर कलाकार का नाम और ईमेल लिखें। कृति के साथ भवन 7 की दूसरी मंज़िल पर MEDIA STUDIO के सामने बॉक्स में रखें, फिर QR कोड से पंजीकरण करें।',
        '<strong>ऑनलाइन अनिवार्य:</strong> नाम, ईमेल, कृति का नाम और अधिकतम 200 अक्षरों का विवरण। <strong>वैकल्पिक:</strong> सैलॉन, तस्वीरें, वीडियो लिंक, विषय, वर्ष, मूल स्थान और टिप्पणियाँ। कोई भी वीडियो सेवा स्वीकार्य है; आयोजकों की देखने की अनुमति जाँचें।',
        'पंजीकरण', 'भौतिक कृति जमा करें, फिर ऑनलाइन फ़ॉर्म भरें', 'कृति पंजीकृत करें',
        '1 अक्टूबर–10 नवंबर 2026। इस अवधि में भौतिक कृति और पहचान पर्ची जमा करके ऑनलाइन पंजीकरण पूरा करें।'
    ]
};
const path = new URL('../translations.js', import.meta.url);
const source = await readFile(path, 'utf8');
const match = source.match(/window\.RERE_CORDS_EXTRA_TRANSLATIONS = (\{[\s\S]*\});/);
if (!match) throw new Error('Translation dictionary not found');
const data = JSON.parse(match[1]);
for (const [language, values] of Object.entries(updates)) {
    if (values.length !== keys.length) throw new Error(`Missing copy: ${language}`);
    for (const [index, key] of keys.entries()) data[language][key] = values[index];
}
await writeFile(path, source.replace(match[1], JSON.stringify(data, null, 4)));
