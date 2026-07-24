/* ==========================================================================
   RERE-CORDS Javascript Logic
   Bilingual Translation & Navigation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       1. Bilingual Translation System (ZH / JA)
       -------------------------------------------------------------------------- */
        const i18nDict = {
        "doc-title": {
            "zh": "RERE-CORDS | 废旧黑胶唱片可持续设计展",
            "ja": "RERE-CORDS | 廃棄アナログレコードのサステナブルデザイン展",
            "en": "RERE-CORDS | Sustainable Design Exhibition with Recycled Vinyl Records"
        },
        "nav-concept": {
            "zh": "企划理念",
            "ja": "企画コンセプト",
            "en": "Concept"
        },
        "nav-poster": {
            "zh": "宣传海报",
            "ja": "公式ポスター",
            "en": "Poster"
        },
        "nav-timeline": {
            "zh": "日程进程",
            "ja": "スケジュール",
            "en": "Timeline"
        },
        "sdg-badge-text": {
            "zh": "负责任消费和生产",
            "ja": "つくる責任 つかう責任",
            "en": "Responsible Consumption and Production"
        },
        "hero-subtitle": {
            "zh": "废旧黑胶唱片再利用与可持续设计展",
            "ja": "廃棄アナログレコードの再利用によるサステナブルデザイン展",
            "en": "Sustainable Design Exhibition with Recycled Vinyl Records"
        },
        "hero-description": {
            "zh": "面向九州大学大桥校区学生、校友及教职工征集创意。活动发放100张废旧唱片作为设计原料，通过裁切与热塑重构，探讨废弃塑料的可持续循环与设计实践方式。",
            "ja": "九州大学大橋キャンパスの学生・教職員・卒業生を対象とした、廃棄レコードの再利用デザイン企画。100枚の廃棄レコードを素材として無償提供し、カットや熱成形などの加工を通じて、プラスチックの持続可能な循環とデザインの実践を探求します。",
            "en": "We invite creative proposals from students, alumni, and staff at Kyushu University Ohashi Campus. Providing 100 discarded vinyl records as design materials, this project explores sustainable cycling and design practices for waste plastics through cutting and thermoforming."
        },
        "title-concept": {
            "zh": "企划理念",
            "ja": "企画コンセプト",
            "en": "Project Concept"
        },
        "lead-concept": {
            "zh": "将废旧黑胶唱片作为材料进行再利用与创作，探讨资源循环与环境友好设计的实践可能。",
            "ja": "廃棄予定となったアナログレコードをデザイン素材として再利用・制作し、資源循環と環境配慮デザインの新たな可能性を探求します。",
            "en": "By reusing and creating with discarded vinyl records as design materials, we explore practical possibilities for resource cycling and eco-friendly design."
        },
        "card1-title": {
            "zh": "材料重构",
            "ja": "素材の再構築",
            "en": "Material Restructuring"
        },
        "card1-text": {
            "zh": "分发100张废旧唱片，通过切割、热塑、重构等方式，设计制作为生活器具、饰品或艺术装置。",
            "ja": "廃棄レコード100枚を無償配布し、裁断、熱成形、再構築などの手法を用いて、日常生活用品、アクセサリー、あるいはアートインスタレーションへと再設計します。",
            "en": "Distributing 100 discarded records to be redesigned and processed into daily utensils, accessories, or art installations through cutting, thermoforming, and restructuring."
        },
        "details-title": {
            "zh": "材料循环与可持续设计",
            "ja": "素材循環とサステナブルデザイン",
            "en": "Material Cycling & Sustainable Design"
        },
        "details-text": {
            "zh": "黑胶唱片的主要成分为聚氯乙烯（PVC），属于难降解塑料。本项目通过设计介入，将100张废置唱片切割、热塑并重构为生活器具、饰品或艺术装置，以此探讨并实践联合国可持续发展目标（负责任的消费和生产）。",
            "ja": "アナログレコードの主原料であるポリ塩化ビニル（PVC）は、自然分解が困難なプラスチックです。本プロジェクトではデザインの介入により、100枚の廃棄レコードを裁断・熱成形し、生活道具やアクセサリー、アート作品へ再構築することで、国連の持続可能な開発目標（SDGs 目標12「つくる責任 つかう責任」）を実践的に探求します。",
            "en": "The primary material of vinyl records is polyvinyl chloride (PVC), a non-biodegradable plastic. Through design intervention, this project cuts, thermoforms, and reconstructs 100 discarded records into functional objects, accessories, and art pieces to put UN SDG 12 (Responsible Consumption and Production) into practice."
        },
        "stat-records": {
            "zh": "提供唱片数量",
            "ja": "配布枚数",
            "en": "Records Provided"
        },
        "stat-target": {
            "zh": "核心实践目标",
            "ja": "対象目標",
            "en": "Core SDG Target"
        },
        "stat-exhibit": {
            "zh": "入选作品展示",
            "ja": "選抜展示",
            "en": "Selected Works Exhibition"
        },
        "title-poster": {
            "zh": "如何获得唱片？",
            "ja": "レコードの入手方法",
            "en": "How to Obtain Records"
        },
        "lead-poster": {
            "zh": "共有两种途径可以获取本次活动所需的废旧黑胶唱片，请选择适合您的方式。",
            "ja": "廃棄レコードを入手する方法は2通りあります。ご都合に合わせた方法をお選びください。",
            "en": "There are two ways to obtain discarded vinyl records for this project. Please choose the method that works best for you."
        },
        "method1-title": {
            "zh": "从校园海报背面取下",
            "ja": "キャンパス内ポスター裏面からの取得",
            "en": "Take from Campus Posters"
        },
        "method1-desc": {
            "zh": "在九州大学大桥校区内寻找张贴的 RERE-CORDS 活动海报，每张海报背面均附有一张废旧黑胶唱片，可直接取下带走，无需任何手续。",
            "ja": "九州大学大橋キャンパス内に掲示されている RERE-CORDS のポスターをお探しください。各ポスターの裏面に廃棄レコードが1枚添付されており、手続き不要でそのままお持ち帰りいただけます。",
            "en": "Look for RERE-CORDS posters displayed across Kyushu University Ohashi Campus. Each poster has a discarded vinyl record attached to its back — simply take it with no paperwork required."
        },
        "method1-note1": {
            "zh": "* 若海报背面的唱片已被取走，请寻找其他位置的海报，或通过邮箱联系我们补充。",
            "ja": "※ ポスター裏面のレコードがすでに取り外されている場合は、別の場所のポスターを探すか、事務局メールアドレスまでご連絡ください。",
            "en": "※ If the record on a poster has already been taken, please check posters at other locations or contact the secretariat via email."
        },
        "method1-note2": {
            "zh": "* 我们会在正式张贴后公布所有海报位置，并且公布详细的补充唱片周期时间。",
            "ja": "※ 正式な掲示開始後、すべてのポスター設置場所およびレコードの補充スケジュールを公開いたします。",
            "en": "※ All poster locations and the record replenishment schedule will be published once official posting begins."
        },
        "method2-title": {
            "zh": "自费购买",
            "ja": "自費での購入",
            "en": "Self-Purchase"
        },
        "method2-desc": {
            "zh": "您也可以自行前往二手唱片店或网络平台自费购买废旧黑胶唱片作为创作材料，费用由参与者自行承担。",
            "ja": "中古レコード店やオンラインショップ等で、自費にて廃棄レコードを購入して制作に使用することも可能です。購入費用は参加者ご自身の負担となります。",
            "en": "You may also purchase discarded vinyl records at your own expense from second-hand record shops or online platforms. Costs are the participant's responsibility."
        },
        "method2-note1": {
            "zh": "* 请注意每件作品的用料上限仍为 6 张。",
            "ja": "※ 1作品あたりの使用枚数上限（最大6枚）は自費購入の場合も適用されます。",
            "en": "※ The limit of up to 6 records per entry also applies to self-purchased records."
        },
        "method2-note2": {
            "zh": "* 我们在海报后放置的都是 EP 尺寸的唱片，如果您选择自费购买，可以选择 LP 尺寸。",
            "ja": "※ ポスター裏面に添付されているレコードはすべてEPサイズです。自費で購入される場合は、LPサイズのご使用も可能です。",
            "en": "※ Records attached to the posters are all EP size. If you purchase your own, LP size records are also acceptable."
        },
        "poster-card-title": {
            "zh": "实体海报与材料补充说明",
            "ja": "実物ポスターと素材配布について",
            "en": "Physical Posters & Material Supply"
        },
        "poster-card-text": {
            "zh": "* 注：通常在校园内张贴的实体海报背面均附有一张废旧黑胶唱片。如果海报背面的唱片已被取完，请寻找校园内的其他海报，或直接通过电子邮件联系我们申请补充材料。",
            "ja": "※ 学内に掲示されているポスター裏面には、制作素材のアナログレコードが添付されています。レコードがすでに取り外されている場合は、学内他所のポスターを探すか、事務局メールアドレスまで直接ご連絡の上、追加配布をご申請ください。",
            "en": "※ Physical posters on campus have a vinyl record attached to the back. If a record has already been removed, please check other poster locations or contact the secretariat by email to request additional materials."
        },
        "title-requirements": {
            "zh": "作品要求",
            "ja": "作品応募規定",
            "en": "Submission Requirements"
        },
        "lead-requirements": {
            "zh": "加工方法自由，设计类别不限。以下为本次征集的基本规则与建议。",
            "ja": "加工手法やデザインの分野は自由です。以下に本公募の基本ルールと推奨事項をご案内します。",
            "en": "Processing techniques and design categories are completely open. Below are the basic rules and guidelines for this open call."
        },
        "req-cat-title": {
            "zh": "设计类别",
            "ja": "デザイン分野",
            "en": "Design Category"
        },
        "req-cat-text": {
            "zh": "类别不限。推荐方向：平面设计、产品设计、服务设计、时装，以及聚焦社会议题的设计实践。",
            "ja": "ジャンル・分野は問いません。推奨分野：グラフィックデザイン、プロダクトデザイン、サービスデザイン、ファッション、社会課題解決に関するデザインなど。",
            "en": "No category restrictions. Recommended areas: graphic design, product design, service design, fashion, and social issue design."
        },
        "req-limit-title": {
            "zh": "用料上限",
            "ja": "使用枚数上限",
            "en": "Record Usage Limit"
        },
        "req-limit-text": {
            "zh": "每件作品最多使用 <strong>6张</strong> 废旧唱片。多余的唱片无需归还，可自由保留或另行利用。",
            "ja": "1作品につき使用できる廃棄レコードは最大 <strong>6枚</strong> です。余ったレコードの返却は不要で、自由にご活用いただけます。",
            "en": "Each entry may use up to <strong>6</strong> discarded records. Unused records do not need to be returned and may be kept freely."
        },
        "req-proc-title": {
            "zh": "加工方法",
            "ja": "加工手法",
            "en": "Processing Techniques"
        },
        "req-proc-text": {
            "zh": "加工方式完全自由：可裁断、加热软化、弯曲重塑、拼接组合，或与其他材料结合创作。",
            "ja": "加工手法は一切問いません。切断、加熱成形、曲げ加工、接合、他素材との組み合わせなど、自由に制作してください。",
            "en": "Processing methods are completely open: cutting, heat-forming, bending, joining, or combining with other materials."
        },
        "req-sub-title": {
            "zh": "提交内容",
            "ja": "提出物",
            "en": "Submission Materials"
        },
        "req-sub-text": {
            "zh": "请发送作品的 <strong>设计图像或照片</strong>，并附上一段不超过 <strong>30秒</strong> 的制作过程视频，发送至活动邮箱。",
            "ja": "作品の <strong>デザイン画像または写真</strong> と、<strong>30秒以内</strong> の制作プロセス動画を事務局メールアドレスへご送付ください。",
            "en": "Please send <strong>design images or photos</strong> of your work, along with a production process video of up to <strong>30 seconds</strong>, to the project email."
        },
        "req-notice-text": {
            "zh": "请妥善保管制作完成的作品实物。入选展览的参与者将被要求提供作品的实体展品（平面设计等非实物作品除外）。",
            "ja": "完成した作品の実物は大切に保管してください。展示会への入選者には、展示用現物のご提供をお願いする場合があります（グラフィックデザイン等の非実体作品を除く）。",
            "en": "Please retain your physical work safely. Selected entrants will be asked to provide physical items for the exhibition (except for non-physical works such as digital graphics)."
        },
        "title-apply": {
            "zh": "报名方法",
            "ja": "応募方法",
            "en": "How to Apply"
        },
        "lead-apply": {
            "zh": "请通过电子邮件提交您的设计意向及作品申请，具体要求与时间如下：",
            "ja": "メールにてエントリーおよび作品データの提出を受け付けています。応募要項および受付期間は以下の通りです。",
            "en": "Project applications and artwork submissions are accepted via email. Key details and dates are as follows:"
        },
        "apply-method-title": {
            "zh": "递交方式",
            "ja": "提出方法・宛先",
            "en": "Submission Method & Destination"
        },
        "apply-method-text": {
            "zh": "将您的设计方案、作品图像/照片以及一段30秒的制作过程视频发送至电子邮箱：<a href='mailto:rerecords2026@gmail.com' class='apply-email'>rerecords2026@gmail.com</a>",
            "ja": "デザインコンセプト、作品写真、および30秒の制作プロセス動画を、事務局メールアドレス（<a href='mailto:rerecords2026@gmail.com' class='apply-email'>rerecords2026@gmail.com</a>）宛てにお送りください。",
            "en": "Send your design concept, artwork photos, and a 30-second production video to the secretariat email (<a href='mailto:rerecords2026@gmail.com' class='apply-email'>rerecords2026@gmail.com</a>)."
        },
        "apply-period-title": {
            "zh": "征集时间",
            "ja": "応募・素材受取期間",
            "en": "Application & Material Period"
        },
        "apply-period-text": {
            "zh": "<span class='apply-date-highlight'>2026年5月1日 — 7月30日</span>（在此期间进行参与申请及废旧唱片原材料的分发领取）",
            "ja": "<span class='apply-date-highlight'>2026年5月1日 — 7月30日</span>（本期間中に応募エントリーを行い、制作素材のアナログレコードを受け取ることができます）",
            "en": "<span class='apply-date-highlight'>May 1 — July 30, 2026</span> (Submit your application and collect vinyl records during this window)"
        },
        "title-timeline": {
            "zh": "日程进程",
            "ja": "プロジェクトスケジュール",
            "en": "Project Schedule"
        },
        "lead-timeline": {
            "zh": "自2026年8月启动材料分发与自主制作，经作品评审后，于11月下旬在九州大学大桥校区举办成果展与沙龙。",
            "ja": "2026年8月より素材配布と制作を開始し、審査を経て11月下旬に九州大学大橋キャンパスにて成果展示会および交流サロンを開催します。",
            "en": "Beginning with material distribution and fabrication in August 2026, followed by jury evaluation, the final exhibition and exchange salon will be held at Kyushu University Ohashi Campus in late November."
        },
        "time-step1": {
            "zh": "2026年8月1日 - 10月31日",
            "ja": "8月1日 - 10月31日",
            "en": "August 1 - October 31, 2026"
        },
        "title-step1": {
            "zh": "分发与制作",
            "ja": "素材配布・制作",
            "en": "Distribution & Fabrication"
        },
        "text-step1": {
            "zh": "无偿领取废旧唱片，于制作周期内完成作品的设计与加工。",
            "ja": "廃棄レコードを無償で受け取り、制作期間内に作品の設計および加工を行います。",
            "en": "Receive vinyl records free of charge and complete the design and fabrication within the creation period."
        },
        "transit-jr-title": {
            "zh": "JR鹿儿岛本线",
            "ja": "JR鹿児島本線",
            "en": "JR Kagoshima Main Line"
        },
        "transit-jr-text": {
            "zh": "「竹下」站步行约10分钟",
            "ja": "「竹下」駅より徒歩約10分",
            "en": "10 min walk from \"Takeshita\" Station"
        },
        "transit-bus-title": {
            "zh": "西铁公交",
            "ja": "西鉄バス",
            "en": "Nishitetsu Bus"
        },
        "transit-bus-text": {
            "zh": "「大桥站前」公交站下车，步行约3分钟（西铁大牟田线 大桥站）",
            "ja": "「大橋駅前」バス停下車 徒歩約3分（西鉄天神大牟田線 大橋駅）",
            "en": "Get off at \"Ohashi-ekimae\" bus stop, 3 min walk (Nishitetsu Tenjin-Omuta Line, Ohashi Station)"
        },
        "transit-note-title": {
            "zh": "停车说明",
            "ja": "駐車場について",
            "en": "Parking Notice"
        },
        "transit-note-text": {
            "zh": "校园内无访客停车位，请尽量乘坐公共交通前往。",
            "ja": "キャンパス内に来訪者用駐車場はございません。公共交通機関のご利用をお願いいたします。",
            "en": "No visitor parking is available on campus. Please use public transportation."
        },
        "transit-badge-nishitetsu": {
            "zh": "西铁",
            "ja": "西鉄",
            "en": "Nishitetsu"
        },
        "transit-badge-bus": {
            "zh": "公交",
            "ja": "バス",
            "en": "Bus"
        },
        "transit-badge-note": {
            "zh": "注",
            "ja": "注",
            "en": "Note"
        },
        "title-step2": {
            "zh": "线上作品评审",
            "ja": "オンライン審査",
            "en": "Online Evaluation"
        },
        "text-step2": {
            "zh": "特邀设计师担任评审，围绕设计方案、创意与资源循环理念进行线上评审。",
            "ja": "デザイナーなどの専門審査員を招き、作品設計と循環理念に基づきオンライン審査を行います。",
            "en": "Guest designers serve as evaluators to review works online based on design proposals, creativity, and resource cycling principles."
        },
        "time-step3": {
            "zh": "2026年11月20日 - 11月25日",
            "ja": "2026.11.20 - 11.25",
            "en": "November 20 - November 25, 2026"
        },
        "title-step3": {
            "zh": "线下成果展览",
            "ja": "成果展示会",
            "en": "Exhibition"
        },
        "text-step3": {
            "zh": "于大桥校区展出入选作品。展览道具均采用可循环的瓦楞纸板搭建。",
            "ja": "九州大学大橋キャンパスにて入選作品を展示。展示什器には再生可能な段ボールを使用します。",
            "en": "Exhibit selected works at the Ohashi Campus. Exhibition displays are built entirely from recyclable corrugated cardboard."
        },
        "time-step4": {
            "zh": "2026年11月25日 15:00-17:00",
            "ja": "11月25日 15:00-17:00",
            "en": "November 25, 2026, 15:00-17:00"
        },
        "title-step4": {
            "zh": "交流沙龙与颁奖",
            "ja": "サロンおよび表彰",
            "en": "Exchange Salon & Awards"
        },
        "text-step4": {
            "zh": "举办设计交流沙龙，公布获奖名单并进行表彰，促进设计师与校友、师生间的对话。",
            "ja": "学内外の関係者による対話会を行い、受賞者の表彰およびデザインに関する意見交換を実施します。",
            "en": "Hold a design exchange salon, announce and honor winners, and facilitate dialogue among guest designers, alumni, and campus community."
        },
        "time-step5": {
            "zh": "2027年—",
            "ja": "2027年—",
            "en": "2027 —"
        },
        "title-step5": {
            "zh": "地区合作与价值延伸",
            "ja": "地域連携と価値の拡張",
            "en": "Community Collaboration & Value Extension"
        },
        "text-step5": {
            "zh": "以本次活动的记录资料和当地唱片店进行交流，商议进一步发挥本次活动中作品价值的可能性，并谋求进一步合作，以提升地区活跃度。",
            "ja": "本企画のドキュメント資料をもとに地元のレコード店と対話し、作品価値のさらなる活用可能性を模索するとともに、地域の活性化に向けた連携を図ります。",
            "en": "Engage with local record stores using the event materials, exploring possibilities to leverage the artwork value and seeking future cooperation to boost regional community vitality."
        },
        "footer-desc": {
            "zh": "废旧黑胶唱片再利用的可持续设计征集与成果展项目",
            "ja": "廃棄アナログレコードの再利用によるサステナブルデザイン公募・展示プロジェクト",
            "en": "A project for sustainable design application and exhibition using discarded vinyl records."
        },
        "footer-contact-label": {
            "zh": "RERE-CORDS 活动运营方 · 如有任何疑问，欢迎随时联络我们",
            "ja": "RERE-CORDS 運営事務局 · ご不明な点がございましたら、いつでもお気軽にご連絡ください",
            "en": "RERE-CORDS Organizers · Have a question? Feel free to reach us anytime"
        },
        "title-venue": {
            "zh": "成果展览展信息",
            "ja": "成果展示会 開催情報",
            "en": "Exhibition Venue Info"
        },
        "lead-venue": {
            "zh": "展览将于2026年11月下旬在九州大学大桥校区举办，欢迎公众参观。",
            "ja": "成果展示会は2026年11月下旬に九州大学大橋キャンパスで開催予定です。ぜひお気軽にご来場ください。",
            "en": "The exhibition will be held in late November 2026 at Kyushu University Ohashi Campus. The public is warmly welcome."
        },
        "venue-address-label": {
            "zh": "地址",
            "ja": "会場住所",
            "en": "Address"
        },
        "venue-address": {
            "zh": "〒815-8540 福岡県福岡市南区塩原4丁目9-1 九州大学 大橋キャンパス",
            "ja": "〒815-8540 福岡県福岡市南区塩原4丁目9-1 九州大学 大橋キャンパス",
            "en": "4-9-1 Shiobaru, Minami-ku, Fukuoka 815-8540 — Kyushu University Ohashi Campus"
        },
        "venue-transit-label": {
            "zh": "公共交通",
            "ja": "公共交通機関",
            "en": "Public Transit"
        },
        "transit-nishitetsu-title": {
            "zh": "西铁大牟田线",
            "ja": "西鉄大牟田線",
            "en": "Nishitetsu Omuta Line"
        },
        "transit-nishitetsu-text": {
            "zh": "「大桥」站步行约5分钟",
            "ja": "「大橋」駅より徒歩約5分",
            "en": "5 min walk from \"Ohashi\" Station"
        },
        "transit-jr-title": {
            "zh": "JR鹿儿岛本线",
            "ja": "JR鹿児島本線",
            "en": "JR Kagoshima Main Line"
        },
        "transit-jr-text": {
            "zh": "「竹下」站步行约10分钟",
            "ja": "「竹下」駅より徒歩約10分",
            "en": "10 min walk from \"Takeshita\" Station"
        },
        "transit-bus-title": {
            "zh": "西铁公交",
            "ja": "西鉄バス",
            "en": "Nishitetsu Bus"
        },
        "transit-bus-text": {
            "zh": "「大橋站前」公交站下车，步行约3分钟（西铁大牟田线 大橋站）",
            "ja": "「大橋駅前」バス停下車 徒歩約3分（西鉄大牟田線 大橋駅）",
            "en": "Alight at \"Ohashi-ekimae\" bus stop, 3 min walk (Nishitetsu Omuta Line, Ohashi Station)"
        },
        "transit-note-title": {
            "zh": "停车说明",
            "ja": "駐車場について",
            "en": "Parking Notice"
        },
        "transit-note-text": {
            "zh": "校园内无访客停车位，请尽量乘坐公共交通前往。",
            "ja": "キャンパス内に来訪者用駐車場はございません。公共交通機関のご利用をお願いします。",
            "en": "No visitor parking available on campus. Please use public transportation."
        },
        "transit-badge-nishitetsu": {
            "zh": "西铁",
            "ja": "西鉄",
            "en": "NT"
        },
        "transit-badge-bus": {
            "zh": "公交",
            "ja": "バス",
            "en": "Bus"
        },
        "transit-badge-note": {
            "zh": "注",
            "ja": "注",
            "en": "Note"
        }
    };

    let currentLang = localStorage.getItem('rere_cords_lang') || 'ja';

    function updateLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('rere_cords_lang', lang);
        document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'ja');

        // Translate general text nodes
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (i18nDict[key] && i18nDict[key][lang]) {
                if (el.tagName === 'TITLE') {
                    document.title = i18nDict[key][lang];
                } else {
                    el.innerHTML = i18nDict[key][lang];
                }
            }
        });

        // Translate placeholders
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (i18nDict[key] && i18nDict[key][lang]) {
                el.setAttribute('placeholder', i18nDict[key][lang]);
            }
        });

        // Update active class on header buttons
        document.querySelectorAll('[data-lang-btn]').forEach(btn => {
            if (btn.getAttribute('data-lang-btn') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Bind language switcher buttons
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetLang = btn.getAttribute('data-lang-btn');
            updateLanguage(targetLang);
        });
    });



    /* --------------------------------------------------------------------------
       3. Scroll Reveal Animations (Timeline & Cards)
       -------------------------------------------------------------------------- */
    const revealItems = document.querySelectorAll('.reveal-on-scroll, .timeline-item');
    
    if (revealItems.length > 0) {
        const observerOptions = {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealItems.forEach(item => {
            revealObserver.observe(item);
        });
    }

    // Set default language on load
    updateLanguage(currentLang);

    /* --------------------------------------------------------------------------
       4. Header Scroll Behavior (Hide on Scroll Down, Show on Scroll Up)
       -------------------------------------------------------------------------- */
    let lastScrollY = window.scrollY;
    const mainHeader = document.getElementById('main-header');
    
    if (mainHeader) {
        const heroSection = document.getElementById('hero');
        const getHeroHeight = () => heroSection ? heroSection.offsetHeight : window.innerHeight;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const heroHeight = getHeroHeight();
            
            if (currentScrollY < 80) {
                // At the very top - hide header to keep hero screen clean
                mainHeader.classList.add('header-hidden');
            } else if (currentScrollY > lastScrollY && currentScrollY > heroHeight - 100) {
                // Scrolling down in content - hide header to maximize reading space
                mainHeader.classList.add('header-hidden');
            } else {
                // Scrolling up in content, or inside hero but not at top - show header
                mainHeader.classList.remove('header-hidden');
            }
            lastScrollY = currentScrollY;
        };

        // Run on load to set initial state
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    /* --------------------------------------------------------------------------
       5. Scroll-Driven Pinning Poster Vinyl Reveal Animation (For Mobile & Desktop)
       -------------------------------------------------------------------------- */
    function initPosterScrollAnimation() {
        const stickyTrack = document.querySelector('.poster-sticky-track');
        const posterFrame = document.querySelector('.poster-frame');
        const posterVinyl = document.querySelector('.poster-vinyl');
        if (!stickyTrack || !posterFrame || !posterVinyl) return;

        function updatePosterAnimation() {
            const rect = stickyTrack.getBoundingClientRect();
            const trackHeight = stickyTrack.offsetHeight;
            const windowHeight = window.innerHeight;

            const scrollableDistance = trackHeight - windowHeight;
            if (scrollableDistance <= 0) return;

            // Compute progress inside the pinned sticky track (0 to 1)
            const currentScroll = -rect.top;
            let progress = currentScroll / scrollableDistance;
            progress = Math.max(0, Math.min(1, progress));

            // Map progress: 
            // 0 - 0.05: Holds in place at center
            // 0.05 - 0.95: Smoothly slides open & rotates vinyl
            // 0.95 - 1.0: Stays fully open as track unpins
            let animProgress = 0;
            if (progress > 0.05 && progress < 0.95) {
                animProgress = (progress - 0.05) / 0.9;
            } else if (progress >= 0.95) {
                animProgress = 1;
            }

            // Smooth cubic easing for high-end feel
            const easeProgress = animProgress < 0.5
                ? 2 * animProgress * animProgress
                : 1 - Math.pow(-2 * animProgress + 2, 2) / 2;

            const isMobile = window.innerWidth <= 768;
            const maxFrameShift = isMobile ? -18 : -22;
            const maxVinylShift = isMobile ? 38 : 48;
            const maxRotation = 180;

            const frameX = easeProgress * maxFrameShift;
            const vinylX = easeProgress * maxVinylShift;
            const rotation = easeProgress * maxRotation;
            const opacity = Math.min(1, easeProgress * 2);

            posterFrame.style.transform = `translateX(${frameX}%)`;
            posterVinyl.style.transform = `translateX(${vinylX}%) rotate(${rotation}deg)`;
            posterVinyl.style.opacity = opacity;
        }

        window.addEventListener('scroll', updatePosterAnimation, { passive: true });
        window.addEventListener('resize', updatePosterAnimation, { passive: true });
        updatePosterAnimation();
    }

    initPosterScrollAnimation();

    /* --------------------------------------------------------------------------
       6. Poster Fullscreen Lightbox Modal Functionality
       -------------------------------------------------------------------------- */
    function initPosterLightbox() {
        const posterFrame = document.querySelector('.poster-frame');
        const lightbox = document.getElementById('poster-lightbox');
        if (!posterFrame || !lightbox) return;

        const backdrop = lightbox.querySelector('.lightbox-backdrop');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const lightboxImg = lightbox.querySelector('.lightbox-img');

        function openLightbox(e) {
            e.stopPropagation();
            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        posterFrame.addEventListener('click', openLightbox);
        if (backdrop) backdrop.addEventListener('click', closeLightbox);
        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        if (lightboxImg) lightboxImg.addEventListener('click', closeLightbox);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    initPosterLightbox();
});
