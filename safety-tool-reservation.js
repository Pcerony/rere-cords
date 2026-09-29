export const EQUIPMENT = Object.freeze([
    { id: 'cutter', stock: 2 },
    { id: 'goggles', stock: 2 },
    { id: 'mask', stock: 2 },
    { id: 'gloves', stock: 2 }
]);

export const MAX_BOOKING_DAYS = 365;
export const MAX_LOAN_DAYS = 14;
const EQUIPMENT_IDS = new Set(EQUIPMENT.map(({ id }) => id));
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const COPY_KEYS = [
    'title', 'intro', 'closed', 'name', 'course', 'email', 'equipment', 'item_cutter', 'item_goggles',
    'item_mask', 'item_gloves', 'quantity', 'pickup', 'return', 'minimum', 'pending', 'location',
    'return_note', 'submit', 'submitting', 'loading', 'available', 'earliest', 'unavailable', 'success',
    'config_missing', 'error', 'back', 'quantity_one', 'quantity_two', 'no_stock'
];

const COPY_VALUES = {
    zh: ['安全道具预约', '请至少提前三天申请。提交后需等待管理员确认并放置道具；收到邮件后再领取。', '预约服务尚未开放。请稍后再试。', '姓名', '所属课程／专业', '邮箱', '选择道具', '小刀', '护目镜', '防尘口罩', '安全手套', '数量', '领取日期', '归还日期', '最早领取日期：{date}', '申请已提交，等待管理员确认。管理员放置道具后会发送邮件，请收到邮件后再领取。', '领取地点', '请务必在所选日期前归还。领取日和归还日均计入借用时间。', '提交预约申请', '正在提交…', '正在查询库存…', '可借 {available} 套（共 {total} 套）', '所选数量最早可预约日期：{date}', '所选日期库存不足。请调整日期或数量。', '申请已提交：{code}', '预约功能尚未连接 Supabase。', '暂时无法提交，请稍后重试。', '返回网站', '1 套', '2 套', '暂无库存'],
    'zh-TW': ['安全道具預約', '請至少提前三天申請。提交後需等待管理員確認並放置道具；收到電子郵件後再領取。', '預約服務尚未開放，請稍後再試。', '姓名', '所屬課程／專業', '電子郵件', '選擇道具', '美工刀', '護目鏡', '防塵口罩', '安全手套', '數量', '領取日期', '歸還日期', '最早領取日期：{date}', '申請已提交，等待管理員確認。管理員放置道具後會寄送電子郵件，收到通知後再領取。', '領取地點', '請務必在所選日期前歸還。領取日和歸還日均計入借用時間。', '提交預約申請', '正在提交…', '正在查詢庫存…', '可借 {available} 套（共 {total} 套）', '所選數量最早可預約日期：{date}', '所選日期庫存不足，請調整日期或數量。', '申請已提交：{code}', '預約功能尚未連接 Supabase。', '暫時無法提交，請稍後再試。', '返回網站', '1 套', '2 套', '目前無庫存'],
    ja: ['安全用具の予約', '3日以上前にお申し込みください。送信後、管理者が確認して用具を設置します。メール通知を受け取ってからお受け取りください。', '予約受付はまだ開始していません。後ほどお試しください。', '氏名', '所属コース・専攻', 'メールアドレス', '用具を選択', 'カッター', '保護メガネ', '防じんマスク', '安全手袋', '数量', '受取日', '返却日', '最短受取日：{date}', '申請を受け付けました。管理者の確認待ちです。用具の設置後にメールでお知らせします。メール受信後にお受け取りください。', '受取場所', '選択した返却日までに必ず返却してください。受取日と返却日の両方を貸出期間に含みます。', '予約を申請', '送信中…', '在庫を確認中…', '貸出可能：{available}セット（全{total}セット）', '選択数を借りられる最短日：{date}', '選択した期間の在庫が不足しています。日付または数量を変更してください。', '申請を受け付けました：{code}', 'Supabaseに接続されていないため、予約を受け付けていません。', '送信できませんでした。時間をおいて再度お試しください。', 'サイトに戻る', '1セット', '2セット', '在庫なし'],
    en: ['Safety tool reservation', 'Submit your request at least three days in advance. The organizer will confirm and place the tools; collect them only after the email notice.', 'Reservations are not open yet. Please try again later.', 'Name', 'Course / program', 'Email', 'Select equipment', 'Cutter', 'Safety goggles', 'Dust mask', 'Safety gloves', 'Quantity', 'Pickup date', 'Return date', 'Earliest pickup date: {date}', 'Request received and awaiting organizer confirmation. We will email you after the tools are placed. Please wait for that email before pickup.', 'Pickup location', 'Return the items by the selected date. Both pickup and return dates count as loan days.', 'Submit request', 'Submitting…', 'Checking availability…', '{available} available (of {total})', 'Earliest date for this quantity: {date}', 'Not enough stock for these dates. Change the dates or quantity.', 'Request received: {code}', 'Reservations are not connected to Supabase yet.', 'Could not submit. Please try again later.', 'Back to website', '1 set', '2 sets', 'Out of stock'],
    ko: ['안전 도구 예약', '최소 3일 전에 신청해 주세요. 운영자가 신청을 확인하고 도구를 비치합니다. 이메일 안내를 받은 후에 수령해 주세요.', '예약 접수가 아직 시작되지 않았습니다. 나중에 다시 시도해 주세요.', '이름', '소속 과정 / 전공', '이메일', '도구 선택', '커터칼', '보안경', '방진 마스크', '안전 장갑', '수량', '수령일', '반납일', '가장 빠른 수령일: {date}', '신청이 접수되어 운영자 확인을 기다리고 있습니다. 도구를 비치하면 이메일로 안내합니다. 이메일을 받은 뒤 수령해 주세요.', '수령 장소', '선택한 날짜까지 반드시 반납해 주세요. 수령일과 반납일 모두 대여 기간에 포함됩니다.', '예약 신청', '전송 중…', '재고 확인 중…', '{total}개 중 {available}개 대여 가능', '선택한 수량의 가장 빠른 예약일: {date}', '선택한 기간에 재고가 부족합니다. 날짜나 수량을 변경해 주세요.', '신청 접수 완료: {code}', 'Supabase에 연결되지 않아 예약을 받을 수 없습니다.', '신청을 전송하지 못했습니다. 다시 시도해 주세요.', '웹사이트로 돌아가기', '1세트', '2세트', '재고 없음'],
    id: ['Peminjaman alat keselamatan', 'Ajukan setidaknya tiga hari sebelumnya. Pengelola akan mengonfirmasi dan meletakkan alat; ambil setelah menerima email pemberitahuan.', 'Peminjaman belum dibuka. Silakan coba lagi nanti.', 'Nama', 'Program / jurusan', 'Email', 'Pilih alat', 'Pisau cutter', 'Kacamata pelindung', 'Masker debu', 'Sarung tangan keselamatan', 'Jumlah', 'Tanggal pengambilan', 'Tanggal pengembalian', 'Tanggal pengambilan paling awal: {date}', 'Permintaan diterima dan menunggu konfirmasi pengelola. Kami akan mengirim email setelah alat diletakkan. Ambil setelah menerima email tersebut.', 'Lokasi pengambilan', 'Kembalikan alat paling lambat pada tanggal yang dipilih. Tanggal pengambilan dan pengembalian dihitung sebagai masa pinjam.', 'Ajukan peminjaman', 'Mengirim…', 'Memeriksa ketersediaan…', '{available} tersedia dari {total}', 'Tanggal paling awal untuk jumlah ini: {date}', 'Stok tidak cukup pada tanggal tersebut. Ubah tanggal atau jumlah.', 'Permintaan diterima: {code}', 'Peminjaman belum terhubung ke Supabase.', 'Permintaan gagal dikirim. Coba lagi nanti.', 'Kembali ke situs', '1 set', '2 set', 'Stok habis'],
    vi: ['Đặt mượn dụng cụ an toàn', 'Vui lòng gửi yêu cầu trước ít nhất ba ngày. Ban tổ chức sẽ xác nhận và đặt dụng cụ; chỉ đến nhận sau khi nhận được email thông báo.', 'Chưa mở đăng ký mượn. Vui lòng thử lại sau.', 'Họ tên', 'Khóa học / chuyên ngành', 'Email', 'Chọn dụng cụ', 'Dao rọc giấy', 'Kính bảo hộ', 'Khẩu trang chống bụi', 'Găng tay an toàn', 'Số lượng', 'Ngày nhận', 'Ngày trả', 'Ngày nhận sớm nhất: {date}', 'Đã nhận yêu cầu và đang chờ ban tổ chức xác nhận. Chúng tôi sẽ gửi email sau khi đặt dụng cụ. Vui lòng chờ email rồi mới đến nhận.', 'Địa điểm nhận', 'Vui lòng trả dụng cụ trước ngày đã chọn. Ngày nhận và ngày trả đều được tính trong thời gian mượn.', 'Gửi yêu cầu mượn', 'Đang gửi…', 'Đang kiểm tra tình trạng…', 'Còn {available}/{total} bộ', 'Ngày sớm nhất có thể mượn số lượng này: {date}', 'Không đủ dụng cụ trong khoảng ngày đã chọn. Hãy đổi ngày hoặc số lượng.', 'Đã nhận yêu cầu: {code}', 'Chức năng mượn chưa kết nối với Supabase.', 'Không thể gửi yêu cầu. Vui lòng thử lại sau.', 'Quay lại trang web', '1 bộ', '2 bộ', 'Đã hết'],
    th: ['จองอุปกรณ์ความปลอดภัย', 'ส่งคำขอล่วงหน้าอย่างน้อย 3 วัน ผู้ดูแลจะตรวจสอบและนำอุปกรณ์ไปวาง โปรดไปรับหลังได้รับอีเมลแจ้งเตือนเท่านั้น', 'ยังไม่เปิดรับการจอง โปรดลองอีกครั้งภายหลัง', 'ชื่อ', 'หลักสูตร / สาขาวิชา', 'อีเมล', 'เลือกอุปกรณ์', 'คัตเตอร์', 'แว่นตานิรภัย', 'หน้ากากกันฝุ่น', 'ถุงมือนิรภัย', 'จำนวน', 'วันที่รับ', 'วันที่คืน', 'วันที่รับได้เร็วที่สุด: {date}', 'ได้รับคำขอแล้วและกำลังรอผู้ดูแลยืนยัน เราจะส่งอีเมลหลังวางอุปกรณ์แล้ว โปรดรออีเมลก่อนมารับ', 'สถานที่รับ', 'กรุณาคืนอุปกรณ์ภายในวันที่เลือก วันรับและวันคืนรวมอยู่ในช่วงการยืม', 'ส่งคำขอจอง', 'กำลังส่ง…', 'กำลังตรวจสอบอุปกรณ์…', 'ยืมได้ {available} จาก {total} ชุด', 'วันที่เร็วที่สุดสำหรับจำนวนนี้: {date}', 'อุปกรณ์ไม่เพียงพอในช่วงวันที่เลือก โปรดเปลี่ยนวันหรือจำนวน', 'รับคำขอแล้ว: {code}', 'ยังไม่ได้เชื่อมต่อระบบจองกับ Supabase', 'ส่งคำขอไม่สำเร็จ โปรดลองอีกครั้งภายหลัง', 'กลับไปยังเว็บไซต์', '1 ชุด', '2 ชุด', 'ไม่มีอุปกรณ์'],
    bn: ['নিরাপত্তা সরঞ্জাম সংরক্ষণ', 'কমপক্ষে তিন দিন আগে আবেদন করুন। আয়োজক নিশ্চিত করে সরঞ্জাম রেখে দেবেন; ইমেল পাওয়ার পরেই সংগ্রহ করুন।', 'সংরক্ষণ এখনো চালু হয়নি। পরে আবার চেষ্টা করুন।', 'নাম', 'কোর্স / বিভাগ', 'ইমেল', 'সরঞ্জাম বেছে নিন', 'কাটার', 'নিরাপত্তা চশমা', 'ধুলোর মাস্ক', 'নিরাপত্তা দস্তানা', 'পরিমাণ', 'সংগ্রহের তারিখ', 'ফেরতের তারিখ', 'সবচেয়ে আগের সংগ্রহের তারিখ: {date}', 'আবেদন গৃহীত হয়েছে এবং আয়োজকের নিশ্চয়তার অপেক্ষায় আছে। সরঞ্জাম রাখার পর ইমেল পাঠানো হবে। ইমেল পাওয়ার আগে সংগ্রহ করতে যাবেন না।', 'সংগ্রহের স্থান', 'নির্বাচিত তারিখের মধ্যে সরঞ্জাম ফেরত দিন। সংগ্রহ ও ফেরতের দিন দুটিই ধারকাল হিসেবে গণ্য হবে।', 'আবেদন জমা দিন', 'পাঠানো হচ্ছে…', 'মজুত যাচাই হচ্ছে…', 'মোট {total}টির মধ্যে {available}টি পাওয়া যাবে', 'এই পরিমাণের জন্য সবচেয়ে আগের তারিখ: {date}', 'নির্বাচিত সময়ে পর্যাপ্ত মজুত নেই। তারিখ বা পরিমাণ বদলান।', 'আবেদন গৃহীত: {code}', 'Supabase সংযোগ না থাকায় আবেদন নেওয়া যাচ্ছে না।', 'পাঠানো যায়নি। পরে আবার চেষ্টা করুন।', 'ওয়েবসাইটে ফিরুন', '১ সেট', '২ সেট', 'মজুত নেই'],
    ar: ['حجز أدوات السلامة', 'قدّم الطلب قبل ثلاثة أيام على الأقل. سيؤكد المنظم الطلب ويضع الأدوات؛ لا تستلمها إلا بعد وصول رسالة البريد الإلكتروني.', 'الحجوزات غير متاحة بعد. يرجى المحاولة لاحقًا.', 'الاسم', 'المقرر / التخصص', 'البريد الإلكتروني', 'اختر الأدوات', 'مشرط', 'نظارات واقية', 'قناع غبار', 'قفازات سلامة', 'الكمية', 'تاريخ الاستلام', 'تاريخ الإرجاع', 'أقرب تاريخ للاستلام: {date}', 'تم استلام الطلب وهو بانتظار تأكيد المنظم. سنرسل بريدًا إلكترونيًا بعد وضع الأدوات. يرجى انتظار الرسالة قبل الاستلام.', 'مكان الاستلام', 'يرجى إعادة الأدوات بحلول التاريخ المحدد. يُحتسب يوما الاستلام والإرجاع ضمن مدة الإعارة.', 'إرسال طلب الحجز', 'جارٍ الإرسال…', 'جارٍ التحقق من التوفر…', 'المتاح {available} من أصل {total}', 'أقرب تاريخ لهذه الكمية: {date}', 'المخزون غير كافٍ في هذه الفترة. غيّر التواريخ أو الكمية.', 'تم استلام الطلب: {code}', 'الحجوزات غير متصلة بـ Supabase بعد.', 'تعذر إرسال الطلب. يرجى المحاولة لاحقًا.', 'العودة إلى الموقع', 'مجموعة واحدة', 'مجموعتان', 'غير متوفر'],
    fr: ['Réservation de matériel de sécurité', 'Envoyez votre demande au moins trois jours à l’avance. L’équipe confirmera et déposera le matériel ; venez le récupérer après réception de l’e-mail.', 'Les réservations ne sont pas encore ouvertes. Réessayez plus tard.', 'Nom', 'Formation / spécialité', 'E-mail', 'Choisir le matériel', 'Cutter', 'Lunettes de protection', 'Masque anti-poussière', 'Gants de sécurité', 'Quantité', 'Date de retrait', 'Date de retour', 'Date de retrait la plus proche : {date}', 'Demande reçue, en attente de confirmation. Un e-mail sera envoyé après le dépôt du matériel. Attendez cet e-mail avant de venir.', 'Lieu de retrait', 'Veuillez rendre le matériel au plus tard à la date choisie. Les jours de retrait et de retour sont inclus dans la durée du prêt.', 'Envoyer la demande', 'Envoi…', 'Vérification des disponibilités…', '{available} disponible(s) sur {total}', 'Première date possible pour cette quantité : {date}', 'Stock insuffisant pour ces dates. Modifiez les dates ou la quantité.', 'Demande reçue : {code}', 'Les réservations ne sont pas encore reliées à Supabase.', 'Envoi impossible. Veuillez réessayer plus tard.', 'Retour au site', '1 lot', '2 lots', 'Indisponible'],
    hi: ['सुरक्षा उपकरण आरक्षण', 'कृपया कम से कम तीन दिन पहले अनुरोध भेजें। आयोजक पुष्टि करके उपकरण रखेंगे; ईमेल मिलने के बाद ही लेने आएँ।', 'आरक्षण अभी शुरू नहीं हुआ है। कृपया बाद में प्रयास करें।', 'नाम', 'कोर्स / विषय', 'ईमेल', 'उपकरण चुनें', 'कटर', 'सुरक्षा चश्मा', 'धूल मास्क', 'सुरक्षा दस्ताने', 'मात्रा', 'लेने की तारीख', 'लौटाने की तारीख', 'सबसे पहली उपलब्ध तारीख: {date}', 'अनुरोध मिल गया है और आयोजक की पुष्टि की प्रतीक्षा में है। उपकरण रखने के बाद ईमेल भेजा जाएगा। ईमेल मिलने से पहले लेने न आएँ।', 'लेने का स्थान', 'चुनी गई तारीख तक उपकरण लौटाएँ। लेने और लौटाने के दोनों दिन उधार अवधि में शामिल हैं।', 'अनुरोध भेजें', 'भेजा जा रहा है…', 'उपलब्धता जाँची जा रही है…', 'कुल {total} में से {available} उपलब्ध', 'इस मात्रा की सबसे पहली तारीख: {date}', 'चुनी अवधि में पर्याप्त उपकरण नहीं हैं। तारीख या मात्रा बदलें।', 'अनुरोध प्राप्त: {code}', 'आरक्षण अभी Supabase से जुड़ा नहीं है।', 'अनुरोध नहीं भेजा जा सका। बाद में फिर प्रयास करें।', 'वेबसाइट पर लौटें', '1 सेट', '2 सेट', 'उपलब्ध नहीं'],
    fi: ['Turvavälineiden varaus', 'Lähetä pyyntö vähintään kolme päivää etukäteen. Järjestäjä vahvistaa pyynnön ja asettaa välineet paikalleen; nouda ne vasta sähköposti-ilmoituksen jälkeen.', 'Varaus ei ole vielä avoinna. Yritä myöhemmin uudelleen.', 'Nimi', 'Kurssi / opintosuunta', 'Sähköposti', 'Valitse välineet', 'Askarteluveitsi', 'Suojalasit', 'Pölymaski', 'Suojakäsineet', 'Määrä', 'Noutopäivä', 'Palautuspäivä', 'Aikaisin noutopäivä: {date}', 'Pyyntö vastaanotettu ja odottaa järjestäjän vahvistusta. Lähetämme sähköpostin, kun välineet on asetettu paikalleen. Odota viestiä ennen noutoa.', 'Noutopaikka', 'Palauta välineet valittuun päivään mennessä. Nouto- ja palautuspäivä sisältyvät laina-aikaan.', 'Lähetä varauspyyntö', 'Lähetetään…', 'Tarkistetaan saatavuutta…', 'Saatavilla {available}/{total}', 'Aikaisin päivä tälle määrälle: {date}', 'Välineitä ei ole riittävästi valittuina päivinä. Muuta päivämääriä tai määrää.', 'Pyyntö vastaanotettu: {code}', 'Varausta ei ole vielä yhdistetty Supabaseen.', 'Pyyntöä ei voitu lähettää. Yritä myöhemmin uudelleen.', 'Takaisin sivustolle', '1 sarja', '2 sarjaa', 'Ei saatavilla']
};

const COPY_EXTRAS = {
    zh: { address: '7号馆二楼，MEDIA STUDIO 房间前的小盒子', invalid: '请检查姓名、课程、邮箱、日期和道具选择。', reservation_code: '申请编号', config_missing: '预约功能尚未连接到 Supabase。', pickup_too_far: '领取日期不能超过未来一年。', loan_too_long: '每次最多可借用14天。' },
    'zh-TW': { address: '7號館二樓，MEDIA STUDIO 房間前的小盒子', invalid: '請檢查姓名、課程、電子郵件、日期及道具選擇。', reservation_code: '申請編號', config_missing: '預約功能尚未連接到 Supabase。', pickup_too_far: '領取日期不得超過未來一年。', loan_too_long: '每次最多可借用14天。' },
    ja: { address: '7号館2階、MEDIA STUDIO前のボックス', invalid: '氏名、所属、メールアドレス、日付、用具の選択をご確認ください。', reservation_code: '受付番号', config_missing: 'Supabaseに接続されていないため、予約を受け付けていません。', pickup_too_far: '受取日は1年先まで選択できます。', loan_too_long: '貸出期間は最長14日です。' },
    en: { address: 'Small box in front of MEDIA STUDIO, Building 7, 2F', invalid: 'Check your name, course, email, dates, and equipment selection.', reservation_code: 'Request number', config_missing: 'Reservations are not connected to Supabase yet.', pickup_too_far: 'Pickup dates can be booked up to one year ahead.', loan_too_long: 'Each loan can last up to 14 days.' },
    ko: { address: '7호관 2층 MEDIA STUDIO 앞 상자', invalid: '이름, 과정, 이메일, 날짜 및 도구 선택을 확인해 주세요.', reservation_code: '접수 번호', config_missing: 'Supabase에 연결되지 않아 예약을 받을 수 없습니다.', pickup_too_far: '수령일은 1년 이내로 선택해 주세요.', loan_too_long: '대여 기간은 최대 14일입니다.' },
    id: { address: 'Kotak kecil di depan MEDIA STUDIO, Gedung 7 lantai 2', invalid: 'Periksa nama, program, email, tanggal, dan pilihan alat.', reservation_code: 'Nomor permintaan', config_missing: 'Peminjaman belum terhubung ke Supabase.', pickup_too_far: 'Tanggal pengambilan hanya dapat dipesan hingga satu tahun ke depan.', loan_too_long: 'Masa pinjam maksimal 14 hari.' },
    vi: { address: 'Hộp nhỏ trước MEDIA STUDIO, Tòa nhà 7, tầng 2', invalid: 'Vui lòng kiểm tra họ tên, chuyên ngành, email, ngày và dụng cụ đã chọn.', reservation_code: 'Mã yêu cầu', config_missing: 'Chức năng mượn chưa kết nối với Supabase.', pickup_too_far: 'Chỉ có thể đặt ngày nhận trong vòng một năm tới.', loan_too_long: 'Thời gian mượn tối đa là 14 ngày.' },
    th: { address: 'กล่องเล็กหน้า MEDIA STUDIO อาคาร 7 ชั้น 2', invalid: 'โปรดตรวจสอบชื่อ หลักสูตร อีเมล วันที่ และอุปกรณ์ที่เลือก', reservation_code: 'หมายเลขคำขอ', config_missing: 'ยังไม่ได้เชื่อมต่อระบบจองกับ Supabase', pickup_too_far: 'จองวันรับได้ล่วงหน้าไม่เกินหนึ่งปี', loan_too_long: 'ยืมได้ครั้งละไม่เกิน 14 วัน' },
    bn: { address: 'ভবন ৭, ২য় তলায় MEDIA STUDIO-এর সামনের ছোট বাক্স', invalid: 'নাম, কোর্স, ইমেল, তারিখ এবং সরঞ্জাম নির্বাচন পরীক্ষা করুন।', reservation_code: 'আবেদন নম্বর', config_missing: 'Supabase সংযোগ না থাকায় আবেদন নেওয়া যাচ্ছে না।', pickup_too_far: 'এক বছর পর্যন্ত আগের তারিখ বুক করা যাবে।', loan_too_long: 'সর্বোচ্চ ১৪ দিনের জন্য ধার নেওয়া যাবে।' },
    ar: { address: 'الصندوق الصغير أمام MEDIA STUDIO، المبنى 7، الطابق الثاني', invalid: 'تحقق من الاسم والمقرر والبريد الإلكتروني والتواريخ والأدوات المختارة.', reservation_code: 'رقم الطلب', config_missing: 'الحجوزات غير متصلة بـ Supabase بعد.', pickup_too_far: 'يمكن حجز تاريخ استلام خلال سنة واحدة فقط.', loan_too_long: 'مدة الإعارة القصوى 14 يومًا.' },
    fr: { address: 'Petite boîte devant MEDIA STUDIO, bâtiment 7, 2e étage', invalid: 'Vérifiez le nom, la formation, l’e-mail, les dates et le matériel choisi.', reservation_code: 'Numéro de demande', config_missing: 'Les réservations ne sont pas encore reliées à Supabase.', pickup_too_far: 'La réservation est possible jusqu’à un an à l’avance.', loan_too_long: 'La durée du prêt est limitée à 14 jours.' },
    hi: { address: 'भवन 7, दूसरी मंज़िल पर MEDIA STUDIO के सामने छोटा बॉक्स', invalid: 'नाम, कोर्स, ईमेल, तारीख़ और चुने गए उपकरण जाँचें।', reservation_code: 'अनुरोध संख्या', config_missing: 'आरक्षण अभी Supabase से जुड़ा नहीं है।', pickup_too_far: 'लेने की तारीख़ अधिकतम एक साल आगे तक चुनें।', loan_too_long: 'उधार की अवधि अधिकतम 14 दिन है।' },
    fi: { address: 'Pieni laatikko MEDIA STUDIOn edessä, rakennus 7, 2. kerros', invalid: 'Tarkista nimi, opintosuunta, sähköposti, päivämäärät ja valitut välineet.', reservation_code: 'Pyyntötunnus', config_missing: 'Varausta ei ole vielä yhdistetty Supabaseen.', pickup_too_far: 'Varaus voidaan tehdä enintään vuodeksi eteenpäin.', loan_too_long: 'Laina-aika on enintään 14 päivää.' }
};

export const RESERVATION_COPY = Object.freeze(Object.fromEntries(
    Object.entries(COPY_VALUES).map(([locale, values]) => [
        locale,
        Object.freeze({
            ...Object.fromEntries(COPY_KEYS.map((key, index) => [key, values[index]])),
            ...COPY_EXTRAS[locale]
        })
    ])
));

function addCalendarDays(date, days) {
    const [year, month, day] = date.split('-').map(Number);
    const result = new Date(Date.UTC(year, month - 1, day + days));
    return result.toISOString().slice(0, 10);
}

export function getMinimumPickupDate(today) {
    return addCalendarDays(today, 3);
}

export function isPublicSupabaseKey(key) {
    if (typeof key !== 'string' || key.length > 2048 || key === '') return false;
    if (key.startsWith('sb_publishable_')) return true;
    if (key.startsWith('sb_secret_')) return false;

    const parts = key.split('.');
    if (parts.length !== 3) return false;
    try {
        const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
        return payload.role === 'anon';
    } catch {
        return false;
    }
}

export function validateReservation(form, today) {
    const errors = [];
    const minimumPickupDate = getMinimumPickupDate(today);

    if (!String(form.name || '').trim()) errors.push('name_required');
    if (!String(form.course || '').trim()) errors.push('course_required');
    if (!EMAIL_PATTERN.test(String(form.email || '').trim())) errors.push('email_invalid');
    if (!form.pickupDate || form.pickupDate < minimumPickupDate) errors.push('pickup_too_soon');
    if (form.pickupDate > addCalendarDays(today, MAX_BOOKING_DAYS)) errors.push('pickup_too_far');
    if (!form.returnDate || form.returnDate < form.pickupDate) errors.push('return_before_pickup');
    if (form.pickupDate && form.returnDate && form.returnDate >= form.pickupDate
        && form.returnDate > addCalendarDays(form.pickupDate, MAX_LOAN_DAYS - 1)) errors.push('loan_too_long');

    const items = form.items && typeof form.items === 'object' ? Object.entries(form.items) : [];
    if (items.length === 0) errors.push('items_required');
    for (const [id, quantity] of items) {
        if (!EQUIPMENT_IDS.has(id)) errors.push('invalid_item');
        if (!Number.isInteger(quantity) || quantity < 1 || quantity > 2) errors.push('invalid_quantity');
    }

    return [...new Set(errors)];
}

export function buildAvailabilityRequest(form) {
    return {
        p_pickup_date: form.pickupDate,
        p_return_date: form.returnDate,
        p_items: form.items
    };
}

export function buildReservationRequest(form) {
    return {
        p_name: String(form.name || '').trim(),
        p_course: String(form.course || '').trim(),
        p_email: String(form.email || '').trim(),
        p_pickup_date: form.pickupDate,
        p_return_date: form.returnDate,
        p_items: form.items
    };
}

export async function submitReservation(client, form, today) {
    const errors = validateReservation(form, today);
    if (errors.length) return { ok: false, code: 'INVALID', errors };

    try {
        const { data, error } = await client.rpc('create_equipment_reservation', buildReservationRequest(form));
        if (error) return { ok: false, code: 'NETWORK', error };
        return data?.ok === true || data?.code === 'UNAVAILABLE'
            ? data
            : { ok: false, code: 'ERROR' };
    } catch (error) {
        return { ok: false, code: 'NETWORK', error };
    }
}

function getTodayInJapan() {
    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit'
    }).formatToParts(new Date());
    const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
    return `${values.year}-${values.month}-${values.day}`;
}

function getLocale() {
    const saved = localStorage.getItem('rere_cords_lang');
    return Object.hasOwn(RESERVATION_COPY, saved) ? saved : 'zh';
}

function replaceTokens(template, values = {}) {
    return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ''));
}

function initReservationPage() {
    const formElement = document.getElementById('reservation-form');
    if (!formElement) return;

    const config = window.RERE_CORDS_RESERVATION_CONFIG || {};
    const hasConfig = typeof config.supabaseUrl === 'string'
        && /^https:\/\/[\w.-]+$/.test(config.supabaseUrl)
        && isPublicSupabaseKey(config.publishableKey);
    const supabaseLibrary = window.supabase;
    const client = hasConfig && supabaseLibrary?.createClient
        ? supabaseLibrary.createClient(config.supabaseUrl, config.publishableKey)
        : null;
    const languageSelect = document.getElementById('reservation-language');
    const pickupInput = document.getElementById('pickup-date');
    const returnInput = document.getElementById('return-date');
    const submitButton = document.getElementById('reservation-submit');
    const statusElement = document.getElementById('reservation-status');
    const configNotice = document.getElementById('reservation-config-notice');
    const today = getTodayInJapan();
    const minimumDate = getMinimumPickupDate(today);
    let locale = getLocale();
    let requestNumber = 0;
    let pollTimer;
    let sent = false;
    let attemptedSubmit = false;

    function copy() {
        return RESERVATION_COPY[locale] || RESERVATION_COPY.en;
    }

    function applyCopy() {
        const strings = copy();
        document.querySelectorAll('[data-copy]').forEach((element) => {
            const value = strings[element.dataset.copy];
            if (value) element.textContent = value;
        });
        document.documentElement.lang = locale === 'zh' ? 'zh-CN' : locale;
        document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
        document.title = `${strings.title} | RERE-CORDS`;
        pickupInput.setAttribute('aria-label', strings.pickup);
        returnInput.setAttribute('aria-label', strings.return);
        document.getElementById('minimum-date-hint').textContent = replaceTokens(strings.minimum, { date: minimumDate });
        pickupInput.max = addCalendarDays(today, MAX_BOOKING_DAYS);
        if (!client) configNotice.textContent = strings.config_missing;
    }

    function showStatus(message, state = '') {
        statusElement.textContent = message;
        if (state) statusElement.dataset.state = state;
        else delete statusElement.dataset.state;
    }

    function getFormData() {
        const items = {};
        for (const { id } of EQUIPMENT) {
            const checkbox = document.getElementById(`select-${id}`);
            if (checkbox.checked) items[id] = Number(document.getElementById(`quantity-${id}`).value);
        }
        return {
            name: document.getElementById('name').value,
            course: document.getElementById('course').value,
            email: document.getElementById('email').value,
            pickupDate: pickupInput.value,
            returnDate: returnInput.value,
            items
        };
    }

    function updateDates() {
        returnInput.min = pickupInput.value || minimumDate;
        if (returnInput.value && returnInput.value < returnInput.min) returnInput.value = returnInput.min;
    }

    async function refreshAvailability() {
        if (!client || !pickupInput.value || !returnInput.value || returnInput.value < pickupInput.value
            || pickupInput.value > addCalendarDays(today, MAX_BOOKING_DAYS)
            || returnInput.value > addCalendarDays(pickupInput.value, MAX_LOAN_DAYS - 1)) return;
        const currentRequest = ++requestNumber;
        const form = getFormData();
        const { data, error } = await client.rpc('get_equipment_availability', buildAvailabilityRequest(form));
        if (currentRequest !== requestNumber) return;
        if (error || !Array.isArray(data)) {
            for (const { id } of EQUIPMENT) document.getElementById(`stock-${id}`).textContent = copy().error;
            return;
        }

        for (const row of data) {
            const selectedQuantity = form.items[row.equipment_id] || 1;
            const stockElement = document.getElementById(`stock-${row.equipment_id}`);
            stockElement.textContent = row.available_units < selectedQuantity
                ? row.earliest_available_date
                    ? replaceTokens(copy().earliest, { date: row.earliest_available_date })
                    : copy().no_stock
                : replaceTokens(copy().available, { available: row.available_units, total: row.total_units });
        }
    }

    function validateAndDisplay(showError = false) {
        const errors = validateReservation(getFormData(), today);
        if (errors.length) {
            if (showError) {
                const dateError = errors.find((error) => error === 'pickup_too_far' || error === 'loan_too_long');
                showStatus(dateError ? copy()[dateError] : copy().invalid, 'error');
            }
            return false;
        }
        showStatus('');
        return true;
    }

    function validateAfterFirstAttempt() {
        if (attemptedSubmit) validateAndDisplay(true);
    }

    function setLanguage(nextLocale) {
        locale = Object.hasOwn(RESERVATION_COPY, nextLocale) ? nextLocale : 'zh';
        localStorage.setItem('rere_cords_lang', locale);
        languageSelect.value = locale;
        applyCopy();
        refreshAvailability();
    }

    languageSelect.value = locale;
    languageSelect.addEventListener('change', (event) => setLanguage(event.target.value));
    applyCopy();

    pickupInput.min = minimumDate;
    pickupInput.max = addCalendarDays(today, MAX_BOOKING_DAYS);
    pickupInput.value = minimumDate;
    returnInput.min = minimumDate;
    returnInput.max = addCalendarDays(minimumDate, MAX_LOAN_DAYS - 1);
    returnInput.value = minimumDate;
    configNotice.hidden = Boolean(client);
    if (!client) configNotice.textContent = copy().config_missing;
    submitButton.disabled = !client;
    if (!client) {
        formElement.querySelectorAll('input, select, button').forEach((control) => { control.disabled = true; });
        languageSelect.disabled = false;
    }

    for (const { id } of EQUIPMENT) {
        document.getElementById(`select-${id}`).addEventListener('change', (event) => {
            document.getElementById(`quantity-${id}`).disabled = !event.target.checked;
            refreshAvailability();
            validateAfterFirstAttempt();
        });
        document.getElementById(`quantity-${id}`).addEventListener('change', () => {
            refreshAvailability();
            validateAfterFirstAttempt();
        });
    }

    for (const input of [pickupInput, returnInput]) {
        input.addEventListener('change', () => {
            updateDates();
            returnInput.max = addCalendarDays(pickupInput.value || minimumDate, MAX_LOAN_DAYS - 1);
            refreshAvailability();
            validateAfterFirstAttempt();
        });
    }
    formElement.querySelectorAll('input:not([type="checkbox"])').forEach((input) => {
        input.addEventListener('input', validateAfterFirstAttempt);
    });

    formElement.addEventListener('submit', async (event) => {
        event.preventDefault();
        attemptedSubmit = true;
        if (sent || !client || !validateAndDisplay(true)) return;
        const controls = [...formElement.querySelectorAll('input, select, button')];
        const previousDisabled = controls.map((control) => control.disabled);
        controls.forEach((control) => { control.disabled = true; });
        submitButton.disabled = true;
        showStatus(copy().submitting);
        const result = await submitReservation(client, getFormData(), today);
        if (result.ok) {
            sent = true;
            submitButton.disabled = true;
            showStatus(`${copy().reservation_code}: ${result.reservation_code}. ${copy().pending}`, 'success');
            return;
        }
        controls.forEach((control, index) => { control.disabled = previousDisabled[index]; });
        if (result.code === 'UNAVAILABLE') {
            const suggested = (result.conflicts || [])
                .map((item) => `${copy()[`item_${item.equipment_id}`] || item.equipment_id}: ${item.earliest_available_date || copy().no_stock}`)
                .join(' · ');
            showStatus(`${copy().unavailable}${suggested ? ` ${suggested}` : ''}`, 'error');
        } else {
            showStatus(result.code === 'INVALID' ? copy().invalid : copy().error, 'error');
        }
    });

    if (client) {
        refreshAvailability();
        const channel = client.channel('rerecords-equipment-inventory')
            .on('broadcast', { event: 'inventory_changed' }, refreshAvailability)
            .subscribe((state) => {
                if (state !== 'SUBSCRIBED' && !pollTimer) pollTimer = window.setInterval(refreshAvailability, 30000);
                if (state === 'SUBSCRIBED' && pollTimer) {
                    window.clearInterval(pollTimer);
                    pollTimer = undefined;
                }
            });
        window.addEventListener('focus', refreshAvailability);
        window.addEventListener('beforeunload', () => {
            if (pollTimer) window.clearInterval(pollTimer);
            client.removeChannel(channel);
        }, { once: true });
    }
}

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initReservationPage, { once: true });
}
