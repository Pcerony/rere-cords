import { readFile, writeFile } from 'node:fs/promises';

const appSource = await readFile(new URL('../app.js', import.meta.url), 'utf8');
const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const dictionaryMatch = appSource.match(/const i18nDict = (\{[\s\S]*?\n    \});/);

if (!dictionaryMatch) throw new Error('Unable to parse i18nDict from app.js');

const dictionary = JSON.parse(dictionaryMatch[1]);
const activeKeys = [...new Set([...html.matchAll(/data-i18n="([^"]+)"/g)].map((match) => match[1]))];
let existingTranslations = {};

try {
    const existingSource = await readFile(new URL('../translations.js', import.meta.url), 'utf8');
    const existingMatch = existingSource.match(/window\.RERE_CORDS_EXTRA_TRANSLATIONS = (\{[\s\S]*\});/);
    if (existingMatch) existingTranslations = JSON.parse(existingMatch[1]);
} catch (error) {
    if (error.code !== 'ENOENT') throw error;
}

const targets = {
    'zh-TW': { source: 'zh-CN', valueKey: 'zh' },
    ko: { source: 'en', valueKey: 'en' },
    id: { source: 'en', valueKey: 'en' },
    vi: { source: 'en', valueKey: 'en' },
    th: { source: 'en', valueKey: 'en' },
    bn: { source: 'en', valueKey: 'en' },
    ar: { source: 'en', valueKey: 'en' },
    fr: { source: 'en', valueKey: 'en' },
    hi: { source: 'en', valueKey: 'en' }
};

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function translate(text, source, target, attempt = 1) {
    const url = new URL('https://translate.googleapis.com/translate_a/single');
    url.search = new URLSearchParams({ client: 'gtx', sl: source, tl: target, dt: 't', q: text });

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const payload = await response.json();
        return payload[0].map((segment) => segment[0]).join('');
    } catch (error) {
        if (attempt >= 4) throw error;
        await sleep(400 * attempt);
        return translate(text, source, target, attempt + 1);
    }
}

async function mapWithConcurrency(items, limit, mapper) {
    const result = new Array(items.length);
    let cursor = 0;

    async function worker() {
        while (cursor < items.length) {
            const index = cursor++;
            result[index] = await mapper(items[index], index);
        }
    }

    await Promise.all(Array.from({ length: limit }, worker));
    return result;
}

const translations = {};
const terminologyReplacements = {
    ko: [[/기록/g, '레코드']],
    id: [[/catatan/gi, 'piringan hitam']],
    vi: [[/hồ sơ/gi, 'đĩa than'], [/bản ghi/gi, 'đĩa than']],
    th: [[/บันทึก/g, 'แผ่นเสียง']],
    ar: [[/السجلات/g, 'أسطوانات الفينيل']]
};

const manualOverrides = {
    ko: {
        'safety-prohibited-text': '레코드를 태우거나 화염으로 가열하거나 PVC를 레이저 절단하지 마십시오. 밀폐되거나 환기가 부족한 공간에서는 가열하지 마십시오. 허가와 교육 없이 전동 공구나 교내 공방 장비를 사용하지 마십시오.',
        'title-step1': '재료 배포, 제작 및 수시 제출',
        'text-step1': '폐레코드를 받은 뒤 바로 제작을 시작할 수 있으며, 기간 중 언제든 완성된 작품을 제출할 수 있습니다. 최종 마감일은 11월 10일입니다.'
    },
    id: {
        'title-step1': 'Distribusi, Pembuatan, dan Pengumpulan Fleksibel',
        'text-step1': 'Mulailah berkarya setelah menerima piringan hitam dan kirimkan karya yang telah selesai kapan saja selama periode ini. Batas akhir pengumpulan adalah 10 November.'
    },
    vi: {
        'safety-prohibited-text': 'Không đốt đĩa, gia nhiệt bằng ngọn lửa trần, cắt PVC bằng laser hoặc gia nhiệt trong không gian kín hay thiếu thông gió. Không sử dụng dụng cụ điện hoặc thiết bị xưởng trong trường khi chưa được cho phép và đào tạo.',
        'title-step1': 'Phân phối vật liệu, chế tác và nộp bài linh hoạt',
        'text-step1': 'Bạn có thể bắt đầu chế tác ngay sau khi nhận đĩa và nộp tác phẩm hoàn chỉnh vào bất kỳ thời điểm nào trong giai đoạn này. Hạn cuối là ngày 10 tháng 11.',
        'advisor-profile-link': 'Hồ sơ tại Đại học Kyushu'
    },
    th: {
        'safety-prohibited-text': 'ห้ามเผาแผ่นเสียง ห้ามให้ความร้อนด้วยเปลวไฟ ห้ามตัด PVC ด้วยเลเซอร์ และห้ามให้ความร้อนในพื้นที่ปิดหรือระบายอากาศไม่เพียงพอ ห้ามใช้เครื่องมือไฟฟ้าหรืออุปกรณ์ในเวิร์กช็อปของมหาวิทยาลัยโดยไม่ได้รับอนุญาตและการฝึกอบรม',
        'title-step1': 'การแจกวัสดุ การสร้างผลงาน และการส่งผลงานได้ตลอดช่วงเวลา',
        'text-step1': 'เริ่มสร้างผลงานได้ทันทีหลังจากรับแผ่นเสียง และส่งผลงานที่เสร็จแล้วได้ทุกเมื่อภายในช่วงเวลานี้ กำหนดส่งสุดท้ายคือวันที่ 10 พฤศจิกายน 2026',
        'lead-venue': 'นิทรรศการจัดขึ้นระหว่างวันที่ 20-25 พฤศจิกายน 2026 ณ วิทยาเขตโอฮาชิ มหาวิทยาลัยคิวชู และเปิดให้บุคคลทั่วไปเข้าชม'
    },
    bn: {
        'safety-prohibited-text': 'রেকর্ড পোড়াবেন না, খোলা আগুনে গরম করবেন না, PVC লেজার দিয়ে কাটবেন না এবং বদ্ধ বা অপর্যাপ্ত বায়ু চলাচলের স্থানে গরম করবেন না। অনুমতি ও প্রশিক্ষণ ছাড়া বৈদ্যুতিক সরঞ্জাম বা ক্যাম্পাস ওয়ার্কশপের যন্ত্র ব্যবহার করবেন না।',
        'title-step1': 'উপকরণ বিতরণ, নির্মাণ ও চলমান জমা',
        'text-step1': 'রেকর্ড পাওয়ার পরই কাজ শুরু করুন এবং এই সময়ের মধ্যে যেকোনো সময় সম্পূর্ণ কাজ জমা দিন। চূড়ান্ত সময়সীমা ১০ নভেম্বর।'
    },
    ar: {
        'safety-prohibited-text': 'يُحظر حرق أسطوانات الفينيل أو تسخينها بلهب مكشوف أو قطع PVC بالليزر أو تسخينه في مكان مغلق أو سيئ التهوية. لا تستخدم الأدوات الكهربائية أو معدات ورش الحرم الجامعي من دون تصريح وتدريب.',
        'title-step1': 'توزيع المواد والتنفيذ والتقديم المرن',
        'text-step1': 'يمكنك بدء العمل فور استلام أسطوانات الفينيل وتقديم العمل المكتمل في أي وقت خلال هذه الفترة. الموعد النهائي هو 10 نوفمبر.'
    },
    fr: {
        'safety-prohibited-text': 'Ne brûlez pas les disques, ne les chauffez pas à la flamme nue, ne découpez pas le PVC au laser et ne le chauffez pas dans un espace clos ou mal ventilé. N’utilisez aucun outil électrique ni équipement d’atelier du campus sans autorisation et formation.'
    },
    hi: {
        'safety-prohibited-text': 'रिकॉर्ड न जलाएँ, खुली लौ से गर्म न करें, PVC को लेज़र से न काटें और बंद या कम हवादार जगह में गर्म न करें। अनुमति और प्रशिक्षण के बिना बिजली के औज़ार या कैंपस कार्यशाला के उपकरण इस्तेमाल न करें।',
        'title-step1': 'सामग्री वितरण, निर्माण और अवधि के दौरान जमा करना',
        'text-step1': 'रिकॉर्ड मिलने के बाद काम शुरू करें और इस अवधि में तैयार कार्य कभी भी जमा करें। अंतिम समय सीमा 10 नवंबर है।'
    }
};

for (const [language, config] of Object.entries(targets)) {
    const values = await mapWithConcurrency(activeKeys, 5, async (key) => {
        const existingValue = existingTranslations[language]?.[key];
        if (typeof existingValue === 'string' && existingValue.trim() !== '') return existingValue;

        const sourceText = dictionary[key]?.[config.valueKey];
        if (!sourceText) throw new Error(`Missing ${config.valueKey} source for ${key}`);
        return translate(sourceText, config.source, language);
    });

    translations[language] = Object.fromEntries(activeKeys.map((key, index) => {
        const replacements = terminologyReplacements[language] || [];
        const translated = replacements.reduce(
            (value, [pattern, replacement]) => value.replace(pattern, replacement),
            values[index]
        );
        return [key, translated];
    }));

    Object.assign(translations[language], manualOverrides[language]);
    translations[language]['advisor-zhang-name'] = 'ZHANG Yanfang';
    translations[language]['advisor-sarantou-name'] = 'Melanie Sarantou';
}

const output = `/* Generated from active homepage copy by scripts/generate-translations.mjs. */\n` +
    `window.RERE_CORDS_EXTRA_TRANSLATIONS = ${JSON.stringify(translations, null, 4)};\n`;

await writeFile(new URL('../translations.js', import.meta.url), output);
