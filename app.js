/* ==========================================================================
   RERE-CORDS JavaScript Logic
   Multilingual Translation & Interaction
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       1. Multilingual Translation System (13 languages)
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
            "zh": "面向九州大学大桥校区学生、校友及教职工征集创意。可使用活动提供的废旧唱片进行实体或过程创作，也可提交与唱片文化、材料循环及可持续设计直接相关的纯数字作品。",
            "ja": "九州大学大橋キャンパスの学生・教職員・卒業生を対象に作品を募集します。提供する廃棄レコードを使った実物・プロセス作品に加え、レコード文化、素材循環、サステナブルデザインに直接関係する純デジタル作品も応募できます。",
            "en": "We invite work from students, alumni, and staff at Kyushu University Ohashi Campus. You may use the supplied discarded records in a physical work or creative process, or submit a fully digital work directly related to record culture, material circulation, or sustainable design."
        },
        "title-concept": {
            "zh": "企划理念",
            "ja": "企画コンセプト",
            "en": "Project Concept"
        },
        "lead-concept": {
            "zh": "从实体材料、创作过程或数字想象出发，重新理解废旧唱片及其背后的资源循环问题。",
            "ja": "実物素材、制作プロセス、デジタルな想像力から、廃棄レコードとその背後にある資源循環を捉え直します。",
            "en": "Approach discarded records and the questions of material circulation behind them through physical material, creative process, or digital imagination."
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
            "zh": "黑胶唱片的主要成分为难降解的聚氯乙烯（PVC）。本项目既关注废弃材料的实体再利用，也接受通过过程记录或纯数字媒介重新讨论唱片文化、资源循环与负责任生产消费的作品。",
            "ja": "アナログレコードの主原料であるポリ塩化ビニル（PVC）は、自然分解が困難なプラスチックです。本プロジェクトは廃棄素材の実物としての再利用に加え、プロセス記録や純デジタルメディアを通じて、レコード文化、資源循環、責任ある生産と消費を捉え直す作品も受け入れます。",
            "en": "Vinyl records are primarily made from polyvinyl chloride (PVC), a material that does not readily biodegrade. Alongside physical reuse, this project accepts process-based and fully digital work that reconsiders record culture, material circulation, and responsible production and consumption."
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
            "zh": "参与作品展示",
            "ja": "提出作品の展示",
            "en": "Submitted Works Exhibition"
        },
        "stat-records-detail": {
            "zh": "这100枚废旧唱片从停止经营的老唱片店回收而来。本项目希望让它们不再被闲置或丢弃，而是作为创作材料重新进入循环。",
            "ja": "100枚の廃レコードは、閉店した老舗レコード店から回収したものです。使われないまま廃棄されるのではなく、創作素材として再び循環させることを目指します。",
            "en": "These 100 discarded records were recovered from a long-established record shop that closed. Rather than leaving them unused or discarded, the project returns them to circulation as creative material."
        },
        "stat-target-detail": {
            "zh": "SDG 12“负责任消费和生产”关注减少废弃物、高效使用资源与材料再利用。通过重新设计废旧唱片并思考它的生命周期，我们把这一目标转化为具体的设计实践。",
            "ja": "SDG 12「つくる責任 つかう責任」は、廃棄物の削減、資源の効率的な利用、素材の再利用を掲げています。廃レコードを再設計し、そのライフサイクルを考えることで、この目標を具体的なデザイン実践に変えます。",
            "en": "SDG 12, Responsible Consumption and Production, calls for reducing waste, using resources efficiently, and reusing materials. By redesigning discarded records and considering their life cycle, the project turns that goal into a practical design question."
        },
        "stat-exhibit-detail": {
            "zh": "本项目没有评审和筛选环节，凡完成提交的作品均安排展示。我们希望让不同回应在同一空间里相遇，使材料浪费与环境责任更容易被看见并引发交流。",
            "ja": "本プロジェクトに審査や選考の過程はなく、提出が完了したすべての作品を展示します。異なる応答を同じ空間で紹介することで、素材の廃棄と環境への責任を見えやすくし、対話につなげます。",
            "en": "There is no judging or selection stage: every submitted work will be included in the exhibition. By bringing different responses together, we hope to make material waste and environmental responsibility more visible and encourage conversation."
        },
        "pathway-kicker": {
            "zh": "开始之前",
            "ja": "制作を始める前に",
            "en": "Before You Begin"
        },
        "title-pathways": {
            "zh": "选择你的参与路径",
            "ja": "参加ルートを選ぶ",
            "en": "Choose Your Participation Path"
        },
        "lead-pathways": {
            "zh": "三种方式都属于正式参与，没有主次之分。这里的选择只用于显示对应说明，不会提交或登记任何信息，并且可以随时更改。",
            "ja": "3つの方法はいずれも正式な参加ルートで、優劣はありません。この選択は該当する案内を表示するためだけのもので、情報の送信や登録は行われず、いつでも変更できます。",
            "en": "All three routes are equally valid forms of participation. This choice only changes the guidance shown on this page; it sends or registers no information and can be changed at any time."
        },
        "pathway-physical-title": {
            "zh": "实体成品",
            "ja": "実物作品",
            "en": "Physical Work"
        },
        "pathway-physical-tab-note": {
            "zh": "领取唱片 · 提交实物",
            "ja": "レコードを入手・実物を提出",
            "en": "Obtain a record · Submit an object"
        },
        "pathway-record-digital-title": {
            "zh": "唱片参与的数字成果",
            "ja": "レコードを使ったデジタル成果",
            "en": "Record-Based Digital Outcome"
        },
        "pathway-record-digital-tab-note": {
            "zh": "领取唱片 · 提交过程记录",
            "ja": "レコードを入手・プロセスを提出",
            "en": "Obtain a record · Submit the process"
        },
        "pathway-digital-native-title": {
            "zh": "纯数字作品",
            "ja": "純デジタル作品",
            "en": "Fully Digital Work"
        },
        "pathway-digital-native-tab-note": {
            "zh": "无需唱片 · 线上提交",
            "ja": "レコード不要・オンライン提出",
            "en": "No record needed · Submit online"
        },
        "pathway-physical-summary": {
            "zh": "将废旧唱片转化为可在线下展出的实体作品。适合产品、装置、服饰、平面或材料实验等方向。",
            "ja": "廃棄レコードを会場で展示できる実物作品へ変換します。プロダクト、インスタレーション、服飾、グラフィック、素材実験などに適しています。",
            "en": "Transform discarded records into a physical work suitable for onsite display, such as a product, installation, garment, graphic piece, or material experiment."
        },
        "pathway-record-digital-summary": {
            "zh": "唱片实际参与实验、表演、服务或临时制作，但最终成果以影像、数据、声音或其他数字记录呈现。",
            "ja": "レコードを実験、パフォーマンス、サービス、一時的な制作に実際に用い、最終成果を映像、データ、音声などのデジタル記録として提示します。",
            "en": "Use a record in an experiment, performance, service, or temporary construction, then present the outcome as video, data, sound, or other digital documentation."
        },
        "pathway-digital-native-summary": {
            "zh": "无需领取或加工实体唱片。作品须明确回应废旧唱片、模拟媒介文化、材料循环或可持续设计，而不是与主题无关的一般数字创作。",
            "ja": "実物のレコードを入手・加工する必要はありません。一般的なデジタル作品ではなく、廃棄レコード、アナログメディア文化、素材循環、サステナブルデザインのいずれかに明確に応答する作品としてください。",
            "en": "No physical record pickup or processing is required. Rather than unrelated general digital art, the work must clearly respond to discarded records, analog-media culture, material circulation, or sustainable design."
        },
        "pathway-record-label": {
            "zh": "唱片",
            "ja": "レコード",
            "en": "Record"
        },
        "pathway-outcome-label": {
            "zh": "最终成果",
            "ja": "最終成果",
            "en": "Outcome"
        },
        "pathway-submit-label": {
            "zh": "提交",
            "ja": "提出",
            "en": "Submission"
        },
        "pathway-physical-record": {
            "zh": "需要领取活动唱片或自行准备废旧唱片，最多使用6张。",
            "ja": "配布レコードを受け取るか自分で廃棄レコードを用意し、最大6枚まで使用できます。",
            "en": "Collect a supplied record or source discarded records yourself; use no more than six."
        },
        "pathway-physical-outcome": {
            "zh": "一件安全、稳定并适合搬运与展示的实体作品。",
            "ja": "安全で安定し、運搬と展示に適した実物作品。",
            "en": "A safe, stable physical work suitable for transport and display."
        },
        "pathway-physical-submit": {
            "zh": "将实物投入校内回收箱；图像、视频等补充资料可选。",
            "ja": "実物を学内回収ボックスへ提出します。画像や動画などの補足資料は任意です。",
            "en": "Deliver the work to the campus collection box; images, video, and other supplements are optional."
        },
        "pathway-record-digital-record": {
            "zh": "需要领取活动唱片或自行准备废旧唱片，并记录它在过程中的实际作用。",
            "ja": "配布レコードを受け取るか自分で用意し、制作プロセスで実際にどのように使ったかを記録します。",
            "en": "Collect or source a discarded record and document its actual role in the process."
        },
        "pathway-record-digital-outcome": {
            "zh": "以图像、视频、声音、数据或交互文件呈现的过程与结果。",
            "ja": "画像、映像、音声、データ、インタラクティブファイルで示すプロセスと成果。",
            "en": "A process and outcome presented through images, video, sound, data, or interactive files."
        },
        "pathway-record-digital-submit": {
            "zh": "线上提交作品资料、过程证据、至少1张图像和1段简短说明视频。",
            "ja": "作品資料、プロセスの証拠、画像1点以上、短い説明動画1本をオンラインで提出します。",
            "en": "Submit the work, process evidence, at least one image, and one short explanatory video online."
        },
        "pathway-digital-native-record": {
            "zh": "无需实体唱片，可直接开始数字创作。",
            "ja": "実物レコードは不要で、そのままデジタル制作を始められます。",
            "en": "No physical record is needed; begin the digital work directly."
        },
        "pathway-digital-native-outcome": {
            "zh": "图像、影像、声音、数据、网页、交互作品或其他数字形式。",
            "ja": "画像、映像、音声、データ、ウェブ、インタラクティブ作品などのデジタル形式。",
            "en": "Images, moving image, sound, data, web, interactive work, or another digital form."
        },
        "pathway-digital-native-submit": {
            "zh": "线上提交完整作品、主题说明、代表图像、简短视频及展示、播放或运行要求。",
            "ja": "完成作品、テーマとの関係の説明、代表画像、短い動画、展示・再生・実行条件をオンラインで提出します。",
            "en": "Submit the complete work, theme statement, representative image, short video, and display, playback, or execution requirements online."
        },
        "pathway-record-required-note": {
            "zh": "你当前选择的路径需要实体唱片，请从下列方式中选择。",
            "ja": "現在選択中のルートでは実物レコードが必要です。以下から入手方法を選んでください。",
            "en": "Your selected path uses a physical record. Choose one of the following ways to obtain it."
        },
        "pathway-record-optional-note": {
            "zh": "你当前选择的是纯数字作品，无需领取唱片，可直接进入创作与线上提交。",
            "ja": "純デジタル作品ではレコードの入手は不要です。このセクションを飛ばして制作とオンライン提出へ進めます。",
            "en": "For your selected fully digital path, record pickup is optional: no record is required, so you may proceed directly to making and online submission."
        },
        "pathway-safety-required-note": {
            "zh": "你当前选择的路径会接触实体唱片，请完整阅读并遵守以下规定。",
            "ja": "現在選択中のルートでは実物レコードを扱います。以下の規定をすべて読み、遵守してください。",
            "en": "Your selected path handles physical records. Read and follow all of the rules below."
        },
        "pathway-safety-optional-note": {
            "zh": "纯数字路径如不接触实体唱片，下列PVC加工风险不适用；如制作展示装置或改用实体材料，仍须遵守相应场所与设备规范。",
            "ja": "純デジタル制作で実物レコードを扱わない場合、以下のPVC加工リスクは適用されません。展示装置や他の実物素材を扱う場合は、該当する施設・機器の規則に従ってください。",
            "en": "If a fully digital work does not handle a physical record, the PVC-processing risks below do not apply. Any display hardware or other physical material must still follow the relevant workspace and equipment rules."
        },
        "title-poster": {
            "zh": "需要实体唱片时，如何获得？",
            "ja": "実物レコードが必要な場合の入手方法",
            "en": "How to Obtain a Record When You Need One"
        },
        "lead-poster": {
            "zh": "实体成品与“唱片参与的数字成果”需要使用唱片，可从校园海报获取或自行购买；纯数字作品可跳过本节。",
            "ja": "実物作品とレコードを使ったデジタル成果ではレコードが必要です。学内ポスターから入手するか自費で購入してください。純デジタル作品はこのセクションを飛ばせます。",
            "en": "Physical works and record-based digital outcomes use a record, available from campus posters or through self-purchase. Fully digital work can skip this section."
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
        "method1-purpose-note": {
            "zh": "※ 实体唱片只可为与参与本项目直接相关的目的领取。严禁为个人使用而领取实体唱片。",
            "ja": "※ アナログレコードは、本プロジェクトへの参加に直接関係する目的に限り受け取ることができます。個人利用を目的とした受け取りは固く禁止します。",
            "en": "The analog records may only be collected for purposes directly related to participation in this project. Any collection for personal use of the analog records is strictly prohibited."
        },
        "method1-note1": {
            "zh": "* 若海报背面的唱片已被取走，请寻找其他位置的海报，或通过邮箱联系我们补充。",
            "ja": "※ ポスター裏面のレコードが不足している場合は、別の場所のポスターを探すか、事務局メールアドレスまでご連絡ください。",
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
            "zh": "设计类别不限。涉及实体唱片的路径须遵守材料与加工安全规则；纯数字作品须说明与活动主题的明确关系。",
            "ja": "デザイン分野は問いません。実物レコードを扱うルートでは素材と加工の安全規定を守り、純デジタル作品では企画テーマとの明確な関係を説明してください。",
            "en": "Design categories are open. Routes involving physical records must follow material and processing safety rules; fully digital work must explain its clear relationship to the project theme."
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
            "zh": "使用实体唱片的作品最多使用 <strong>6张</strong>。纯数字作品无需领取唱片；多余唱片无需归还。",
            "ja": "実物レコードを使う作品は最大 <strong>6枚</strong> までです。純デジタル作品はレコードの入手不要で、余ったレコードの返却も必要ありません。",
            "en": "Work using physical records may use up to <strong>6</strong>. Fully digital work requires no record pickup, and unused records do not need to be returned."
        },
        "req-proc-title": {
            "zh": "加工方法",
            "ja": "加工手法",
            "en": "Processing Techniques"
        },
        "req-proc-text": {
            "zh": "可采用裁切、弯曲、拼接或与其他材料组合等方法，但必须遵守下方安全规范。涉及加热、打磨或电动工具时，仅可在获准并具备相应安全条件的场所进行。",
            "ja": "切断、曲げ、接合、他素材との組み合わせなどが可能ですが、下記の安全規定を必ず守ってください。加熱、研磨、電動工具を伴う作業は、許可され必要な安全設備を備えた場所でのみ行えます。",
            "en": "You may cut, bend, join, or combine records with other materials, but the safety rules below are mandatory. Heating, sanding, or power-tool work is allowed only in an authorized space with suitable safety controls."
        },
        "req-sub-title": {
            "zh": "提交内容",
            "ja": "提出物",
            "en": "Submission Materials"
        },
        "req-sub-text": {
            "zh": "实体成品线下提交；两类数字成果线上提交。三条路径所需材料不同，请以“提交作品”中的当前路径说明为准。",
            "ja": "実物作品は対面で、2種類のデジタル成果はオンラインで提出します。必要資料はルートごとに異なるため、下記「作品提出」の選択中ルートを確認してください。",
            "en": "Submit physical works offline and both digital routes online. Required materials differ by pathway; follow the selected route in Submit Your Work below."
        },
        "req-notice-text": {
            "zh": "请妥善保管制作完成的实物作品，并在搬运前处理尖锐边缘和不稳定部件。请于11月10日前投入7号馆2层 MEDIA STUDIO 房间前的回收箱。",
            "ja": "完成した実物作品は大切に保管し、運搬前に鋭利な縁や不安定な部品を安全な状態にしてください。11月10日までに7号館2階MEDIA STUDIO部屋前の回収ボックスへ提出してください。",
            "en": "Store finished physical works safely and secure sharp edges or unstable parts before transport. Place them in the collection box in front of MEDIA STUDIO on 2F of Building 7 by November 10."
        },
        "safety-kicker": {
            "zh": "制作前请阅读",
            "ja": "制作前に必ずお読みください",
            "en": "Read Before Making"
        },
        "title-safety": {
            "zh": "加工安全说明",
            "ja": "加工時の安全について",
            "en": "Processing Safety"
        },
        "lead-safety": {
            "zh": "废旧唱片通常以PVC为主要材料。裁切、加热、打磨、钻孔与粘接均可能产生伤害或有害暴露，请先评估方法、材料与场所是否安全。",
            "ja": "廃棄レコードの主材料は一般にPVCです。切断、加熱、研磨、穴あけ、接着には、けがや有害物質へのばく露のおそれがあります。方法、材料、作業場所の安全性を事前に確認してください。",
            "en": "Discarded records are generally made primarily from PVC. Cutting, heating, sanding, drilling, and bonding can cause injury or harmful exposure, so assess the method, material, and workspace before starting."
        },
        "safety-cut-title": {
            "zh": "裁切与尖锐边缘",
            "ja": "切断と鋭利な縁",
            "en": "Cutting and Sharp Edges"
        },
        "safety-cut-text": {
            "zh": "唱片断面、刀具和飞散碎片可能造成割伤或眼部伤害。固定材料，使用适合PVC的工具，并佩戴护目镜；完成后打磨或包覆锐边。",
            "ja": "切断面、刃物、飛散する破片は、切り傷や目のけがの原因になります。材料を固定し、PVCに適した工具と保護メガネを使用し、完成後は鋭利な縁を研磨または被覆してください。",
            "en": "Cut edges, blades, and flying fragments can injure hands or eyes. Secure the material, use a PVC-appropriate tool and eye protection, then smooth or cover sharp edges."
        },
        "safety-heat-title": {
            "zh": "加热、烟气与烫伤",
            "ja": "加熱、ヒューム、やけど",
            "en": "Heat, Fumes, and Burns"
        },
        "safety-heat-text": {
            "zh": "PVC过热或分解时会产生刺激性烟气。不得使用明火或无控温设备，仅可在获准且具有效通风或局部排风的场所低温、短时加工，并防止接触高温表面。",
            "ja": "PVCは過熱・分解すると刺激性のヒュームを発生します。裸火や温度制御できない器具は使用せず、許可された有効な換気・局所排気設備のある場所で、低温かつ短時間のみ加工し、高温面への接触を避けてください。",
            "en": "Overheated or degrading PVC can release irritating fumes. Never use an open flame or uncontrolled heat; use only low, brief heat in an authorized workspace with effective ventilation or local exhaust, and avoid hot surfaces."
        },
        "safety-tool-title": {
            "zh": "工具、粉尘与用电",
            "ja": "工具、粉じん、電気",
            "en": "Tools, Dust, and Electricity"
        },
        "safety-tool-text": {
            "zh": "钻孔、锯切和打磨可能产生粉尘、缠卷、飞溅、噪声或触电风险。仅使用受过培训且获准操作的设备，并按工具和场所要求采取集尘、听力及呼吸防护。",
            "ja": "穴あけ、切断、研磨には、粉じん、巻き込まれ、飛散、騒音、感電の危険があります。訓練を受け、使用許可のある設備のみを使い、工具と施設の規則に従って集じん、聴覚、呼吸用保護具を使用してください。",
            "en": "Drilling, sawing, and sanding can create dust, entanglement, projectiles, noise, or electrical hazards. Use only equipment you are trained and authorized to operate, with dust extraction, hearing, and respiratory protection as required."
        },
        "safety-chemical-title": {
            "zh": "胶黏剂与混合材料",
            "ja": "接着剤と異素材",
            "en": "Adhesives and Mixed Materials"
        },
        "safety-chemical-text": {
            "zh": "胶黏剂、涂料和清洁剂可能易燃或具有刺激性。使用前阅读产品标签和安全数据，保持通风，远离热源，并确认其与PVC及其他材料相容。",
            "ja": "接着剤、塗料、洗浄剤には、引火性や刺激性がある場合があります。使用前に表示と安全データを読み、換気し、熱源から離し、PVCや他素材との適合性を確認してください。",
            "en": "Adhesives, coatings, and cleaners may be flammable or irritating. Read labels and safety data, provide ventilation, keep them away from heat, and confirm compatibility with PVC and other materials."
        },
        "safety-prohibited-title": {
            "zh": "禁止事项",
            "ja": "禁止事項",
            "en": "Prohibited"
        },
        "safety-prohibited-text": {
            "zh": "禁止燃烧唱片、明火加热、激光切割PVC，以及在密闭或通风不足的空间内加热。未经许可与培训，不得使用电动工具或校园工坊设备。",
            "ja": "レコードの燃焼、裸火による加熱、PVCのレーザー加工、密閉または換気不足の空間での加熱は禁止です。許可と訓練なしに電動工具や学内工房設備を使用しないでください。",
            "en": "Do not burn records, heat them with an open flame, laser-cut PVC, or heat it in an enclosed or poorly ventilated space. Do not use power tools or campus workshop equipment without authorization and training."
        },
        "safety-stop-title": {
            "zh": "异常时立即停止",
            "ja": "異常時は直ちに中止",
            "en": "Stop if Anything Is Wrong"
        },
        "safety-stop-text": {
            "zh": "如出现烟雾、强烈或刺激性气味、眼鼻喉刺激、头晕或设备异常，请立即停止操作、切断设备并离开现场，随后联系场所负责人；必要时寻求医疗帮助。",
            "ja": "煙、強い刺激臭、目・鼻・喉の刺激、めまい、機器の異常が生じた場合は、直ちに作業を中止し、機器を停止してその場を離れ、施設責任者に連絡してください。必要に応じて医療機関を受診してください。",
            "en": "If you notice smoke, a strong or irritating odor, eye, nose, or throat irritation, dizziness, or equipment trouble, stop immediately, shut down the equipment, leave the area, and contact the workspace supervisor. Seek medical help when needed."
        },
        "apply-period-title": {
            "zh": "参与与提交时间",
            "ja": "参加・作品提出期間",
            "en": "Participation & Submission Period"
        },
        "apply-period-text": {
            "zh": "<span class='apply-date-highlight'>2026年8月20日（星期四）至11月10日（星期二）</span>。期间可随时制作并提交作品；无需另行报名。",
            "ja": "<span class='apply-date-highlight'>2026年8月20日（木）〜2026年11月10日（火）</span>。期間中は随時制作・提出でき、事前の参加申込は不要です。",
            "en": "<span class='apply-date-highlight'>August 20 (Thu) - November 10 (Tue), 2026</span>. Make and submit your work at any time during this period; no separate application is needed."
        },
        "title-submission": {
            "zh": "提交作品",
            "ja": "作品提出",
            "en": "Submit Your Work"
        },
        "lead-submission": {
            "zh": "无需提前报名，完成作品提交即视为正式参加。下方会显示你当前所选路径的材料要求；返回上方切换路径即可同步更新。",
            "ja": "事前申込は不要で、作品の提出完了をもって正式参加となります。現在選択中のルートに必要な資料を下に表示します。上の選択へ戻るといつでも切り替えられます。",
            "en": "No advance registration is required; completed submission constitutes formal participation. The requirements for your selected path appear below and update whenever you change the choice above."
        },
        "submission-digital-title": {
            "zh": "唱片参与的数字成果",
            "ja": "レコードを使ったデジタル成果",
            "en": "Record-Based Digital Outcome"
        },
        "submission-digital-text": {
            "zh": "将作品信息和参与表整理为PDF，并与完整数字成果及唱片实际参与创作过程的证据一并发送至活动邮箱。",
            "ja": "作品情報と参加票をPDFにまとめ、完成したデジタル成果およびレコードが制作に実際に関わったことを示す記録とともにメールで提出してください。",
            "en": "Email the work information and participation form as a PDF together with the complete digital outcome and evidence that a record was actually used in the creative process."
        },
        "submission-digital-requirements": {
            "zh": "<strong>必须包含：</strong>至少1张作品图像、1段简短说明视频、过程记录，以及理解、播放或运行作品所需的补充资料。",
            "ja": "<strong>必須：</strong>作品画像1点以上、短い説明動画1本、プロセス記録、作品の理解・再生・実行に必要な補足資料。",
            "en": "<strong>Required:</strong> at least one work image, one short explanatory video, process documentation, and supporting files needed to understand, play, or run the work."
        },
        "submission-physical-title": {
            "zh": "实体成品",
            "ja": "実物作品",
            "en": "Physical Finished Work"
        },
        "submission-physical-text": {
            "zh": "请将实物作品投入7号馆2层 MEDIA STUDIO 房间前的回收箱。参与表可随实物纸质提交，也可单独以PDF发送至活动邮箱。",
            "ja": "実物作品は7号館2階MEDIA STUDIO部屋前の回収ボックスへ入れてください。参加票は紙で同封するか、PDFで事務局メールアドレスへ別途送信できます。",
            "en": "Place physical works in the collection box in front of the MEDIA STUDIO room on 2F of Building 7. Include a paper participation form or email it separately as a PDF."
        },
        "submission-physical-options": {
            "zh": "<strong>必需：</strong>实体作品与参与表。作品图像、视频及其他补充资料可选择提交。",
            "ja": "<strong>必須：</strong>実物作品と参加票。作品画像、動画、その他の補足資料は任意です。",
            "en": "<strong>Required:</strong> the physical work and participation form. Images, video, and other supporting material are optional."
        },
        "submission-digital-native-title": {
            "zh": "纯数字作品",
            "ja": "純デジタル作品",
            "en": "Fully Digital Work"
        },
        "submission-digital-native-text": {
            "zh": "线上提交完整作品与参与表，并说明作品与废旧唱片、模拟媒介文化、材料循环或可持续设计的关系。",
            "ja": "完成作品と参加票をオンラインで提出し、廃棄レコード、アナログメディア文化、素材循環、サステナブルデザインとの関係を説明してください。",
            "en": "Submit the complete work and participation form online, explaining its relationship to discarded records, analog-media culture, material circulation, or sustainable design."
        },
        "submission-digital-native-requirements": {
            "zh": "<strong>必须包含：</strong>至少1张代表图像、1段简短说明视频、完整作品文件或访问方式，以及现场展示、播放或运行要求。",
            "ja": "<strong>必須：</strong>代表画像1点以上、短い説明動画1本、完成作品ファイルまたはアクセス方法、会場での展示・再生・実行条件。",
            "en": "<strong>Required:</strong> at least one representative image, one short explanatory video, the complete work file or access method, and onsite display, playback, or execution requirements."
        },
        "submission-status-label": {
            "zh": "线上资料渠道",
            "ja": "オンライン資料提出",
            "en": "Online Materials"
        },
        "submission-status": {
            "zh": "通过活动邮箱接收参与表、PDF及相关资料",
            "ja": "事務局メールで参加票、PDF、関連資料を受け付けます",
            "en": "Participation forms, PDFs, and supporting files are accepted by email"
        },
        "submission-cta": {
            "zh": "通过邮件提交参与表或数字资料",
            "ja": "参加票・デジタル資料をメールで提出",
            "en": "Email Participation Form or Digital Files"
        },
        "submission-fallback": {
            "zh": "下载备用参与表",
            "ja": "予備の参加票をダウンロード",
            "en": "Download fallback form"
        },
        "title-timeline": {
            "zh": "日程进程",
            "ja": "プロジェクトスケジュール",
            "en": "Project Schedule"
        },
        "lead-timeline": {
            "zh": "所有路径都经过选择方式、制作与提交、线下成果展览。只有使用实体唱片的路径需要领取材料；11月中旬的交流沙龙可选参加。",
            "ja": "すべてのルートは、方法の選択、制作・提出、対面成果展示へ進みます。素材の入手が必要なのは実物レコードを使うルートだけで、11月中旬の交流サロンは自由参加です。",
            "en": "Every path moves through choosing a route, making and submitting, and the onsite exhibition. Only paths using physical records require material pickup; the mid-November exchange salon is optional."
        },
        "time-step1": {
            "zh": "2026年8月20日 - 11月10日",
            "ja": "2026年8月20日（木）〜11月10日（火）",
            "en": "August 20 - November 10, 2026"
        },
        "title-step1": {
            "zh": "选择路径、制作与随时提交",
            "ja": "ルート選択・制作・随時提出",
            "en": "Choose a Path, Make, and Submit"
        },
        "text-step1": {
            "zh": "先选择参与路径。实体成品和唱片参与的数字成果需要取得唱片；纯数字作品可直接开始制作。期间随时接受提交，最终截止为11月10日。",
            "ja": "まず参加ルートを選びます。実物作品とレコードを使ったデジタル成果はレコードを入手し、純デジタル作品はそのまま制作を始められます。期間中は随時提出でき、最終締切は11月10日です。",
            "en": "Choose a participation path first. Physical work and record-based digital outcomes require a record; fully digital work can begin directly. Submissions are accepted throughout the period until November 10."
        },
        "timeline-optional-badge": {
            "zh": "可选参加",
            "ja": "自由参加",
            "en": "Optional"
        },
        "time-salon": {
            "zh": "2026年11月15日前后",
            "ja": "2026年11月15日頃",
            "en": "Around November 15, 2026"
        },
        "title-salon": {
            "zh": "交流沙龙",
            "ja": "交流サロン",
            "en": "Exchange Salon"
        },
        "text-salon": {
            "zh": "面向参与者开展轻松的作品交流与经验分享。活动时间和形式另行通知，不参加也不影响作品提交与展览。",
            "ja": "参加者同士で作品や制作経験を気軽に共有します。日時と形式は別途案内し、不参加でも作品提出や展示には影響しません。",
            "en": "An informal session for participants to discuss their work and share experiences. Details will be announced separately; attendance does not affect submission or exhibition."
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
            "zh": "三条路径的提交作品均可进入线下成果展；数字作品将依据提交的展示、播放或运行要求协调呈现方式。",
            "ja": "3つのルートで提出された作品はいずれも対面成果展示の対象です。デジタル作品は、提出された展示・再生・実行条件に基づいて提示方法を調整します。",
            "en": "Submitted work from all three pathways is eligible for the onsite exhibition. Digital work will be presented according to the submitted display, playback, or execution requirements."
        },
        "title-advisors": {
            "zh": "指导教师",
            "ja": "指導教員",
            "en": "Faculty Advisors"
        },
        "lead-advisors": {
            "zh": "九州大学大学院艺术工学研究院战略设计部门",
            "ja": "九州大学大学院芸術工学研究院 ストラテジックデザイン部門",
            "en": "Department of Strategic Design, Faculty of Design, Kyushu University"
        },
        "advisor-zhang-name": {
            "zh": "張 彦芳",
            "ja": "張 彦芳",
            "en": "ZHANG Yanfang"
        },
        "advisor-zhang-role": {
            "zh": "准教授 · 通用设计、社会设计",
            "ja": "准教授 · ユニバーサルデザイン、ソーシャルデザイン",
            "en": "Associate Professor · Universal Design, Social Design"
        },
        "advisor-zhang-bio": {
            "zh": "以通用设计与社会设计为核心，围绕“不让任何人掉队”的理念开展研究与实践。长期通过 Design for SDGs 与 Global Goals Jam 等工作坊，连接政府、大学、企业、NPO 与社区，共同探索社会议题的设计解决方案。",
            "ja": "ユニバーサルデザインとソーシャルデザインを軸に、「誰一人取り残さない」という理念のもとで研究と実践に取り組んでいます。Design for SDGs や Global Goals Jam などのワークショップを通じ、行政、大学、企業、NPO、地域をつなぎ、社会課題に対するデザインの可能性を探究しています。",
            "en": "Her research and practice centre on universal and social design guided by the principle of leaving no one behind. Through initiatives including Design for SDGs and Global Goals Jam workshops, she connects government, universities, businesses, NPOs and communities to explore design responses to social challenges."
        },
        "advisor-sarantou-name": {
            "zh": "Melanie Sarantou",
            "ja": "SARANTOU Melanie",
            "en": "Melanie Sarantou"
        },
        "advisor-sarantou-role": {
            "zh": "教授 · 战略设计、社会设计",
            "ja": "教授 · ストラテジックデザイン、ソーシャルデザイン",
            "en": "Professor · Strategic Design, Social Design"
        },
        "advisor-sarantou-bio": {
            "zh": "专注社会设计、转型设计与艺术研究方法，特别关注边缘化社区与不同文化语境中的设计实践。她同时担任芬兰拉普兰大学兼职教授，并在纳米比亚、芬兰、澳大利亚和日本开展跨地域研究。",
            "ja": "ソーシャルデザイン、トランスフォーメーションデザイン、芸術に基づく研究手法を専門とし、周縁化されたコミュニティや異なる文化的文脈でのデザイン実践に取り組んでいます。フィンランドのラップランド大学客員教授も務め、ナミビア、フィンランド、オーストラリア、日本で研究を展開しています。",
            "en": "She specialises in social design, transformation design and arts-based research, with particular attention to marginalised communities and diverse cultural contexts. She is also an Adjunct Professor at the University of Lapland and has conducted research across Namibia, Finland, Australia and Japan."
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
            "zh": "成果展览信息",
            "ja": "成果展示会 開催情報",
            "en": "Exhibition Venue Info"
        },
        "lead-venue": {
            "zh": "展览将于2026年11月20日至25日在九州大学大桥校区多次元楼2层 Studio 201 举办，欢迎公众参观。",
            "ja": "成果展示会は2026年11月20日から25日まで、九州大学大橋キャンパス 多次元棟 2階 スタジオ201で開催予定です。一般の方もご来場いただけます。",
            "en": "The exhibition will be held from November 20 to 25, 2026, in Studio 201, 2F, Multidimensional Building, Kyushu University Ohashi Campus, and is open to the public."
        },
        "venue-address-label": {
            "zh": "地址",
            "ja": "会場住所",
            "en": "Address"
        },
        "venue-address": {
            "zh": "九州大学大桥校区 多次元楼 2层 Studio 201｜〒815-8540 福冈县福冈市南区盐原4丁目9-1",
            "ja": "九州大学大橋キャンパス 多次元棟 2階 スタジオ201｜〒815-8540 福岡県福岡市南区塩原4丁目9-1",
            "en": "Studio 201, 2F, Multidimensional Building, Kyushu University Ohashi Campus | 4-9-1 Shiobaru, Minami-ku, Fukuoka 815-8540"
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

    const fiTranslations = {
        "doc-title": "RERE-CORDS | Käytöstä poistettujen vinyylilevyjen kestävän muotoilun näyttely",
        "sdg-badge-text": "Vastuullista kuluttamista ja tuotantoa",
        "hero-subtitle": "Kestävän muotoilun näyttely kierrätetyistä vinyylilevyistä",
        "hero-description": "Kutsumme Kyushun yliopiston Ohashin kampuksen opiskelijat, alumnit ja henkilökunnan osallistumaan. Voit käyttää projektin tarjoamia poistolevyjä fyysisessä työssä tai prosessissa tai toimittaa täysin digitaalisen työn, joka liittyy suoraan levykulttuuriin, materiaalikiertoon tai kestävään muotoiluun.",
        "title-concept": "Projektin idea",
        "lead-concept": "Tarkastelemme poistolevyjä ja niiden taustalla olevaa materiaalikiertoa fyysisen materiaalin, luovan prosessin tai digitaalisen mielikuvituksen kautta.",
        "details-title": "Materiaalikierto ja kestävä muotoilu",
        "details-text": "Vinyylilevyt koostuvat pääasiassa polyvinyylikloridista eli PVC:stä, joka ei hajoa helposti luonnossa. Fyysisen uusiokäytön lisäksi projekti hyväksyy prosessipohjaisia ja täysin digitaalisia töitä, jotka tarkastelevat uudelleen levykulttuuria, materiaalikiertoa sekä vastuullista tuotantoa ja kulutusta.",
        "stat-records": "Jaettavien levyjen määrä",
        "stat-target": "Keskeinen kestävän kehityksen tavoite",
        "stat-exhibit": "Näyttelyyn toimitetut työt",
        "stat-records-detail": "Nämä 100 käytöstä poistettua levyä kerättiin toimintansa lopettaneesta pitkään toimineesta levykaupasta. Sen sijaan että levyt jäisivät käyttämättä tai päätyisivät jätteeksi, ne palautetaan kiertoon luovan työn materiaalina.",
        "stat-target-detail": "SDG 12, vastuullinen kulutus ja tuotanto, pyrkii vähentämään jätettä, tehostamaan resurssien käyttöä ja lisäämään materiaalien uudelleenkäyttöä. Suunnittelemalla poistolevyt uudelleen ja tarkastelemalla niiden elinkaarta hanke muuttaa tavoitteen konkreettiseksi muotoilukysymykseksi.",
        "stat-exhibit-detail": "Hankkeessa ei ole arviointi- tai valintavaihetta: jokainen toimitettu työ otetaan mukaan näyttelyyn. Tuomalla erilaiset vastaukset yhteen haluamme tehdä materiaalihukan ja ympäristövastuun näkyvämmiksi sekä herättää keskustelua.",
        "pathway-kicker": "Ennen aloittamista",
        "title-pathways": "Valitse osallistumisreittisi",
        "lead-pathways": "Kaikki kolme reittiä ovat samanarvoisia osallistumistapoja. Valinta muuttaa vain tällä sivulla näkyviä ohjeita, ei lähetä tai rekisteröi tietoja, ja sen voi vaihtaa milloin tahansa.",
        "pathway-physical-title": "Fyysinen työ",
        "pathway-physical-tab-note": "Hanki levy · Toimita esine",
        "pathway-record-digital-title": "Levyä hyödyntävä digitaalinen tulos",
        "pathway-record-digital-tab-note": "Hanki levy · Toimita prosessi",
        "pathway-digital-native-title": "Täysin digitaalinen työ",
        "pathway-digital-native-tab-note": "Ei levyä · Toimita verkossa",
        "pathway-physical-summary": "Muuta poistolevy paikan päällä esiteltäväksi fyysiseksi työksi, kuten tuotteeksi, installaatioksi, vaatteeksi, graafiseksi työksi tai materiaalikokeeksi.",
        "pathway-record-digital-summary": "Käytä levyä kokeessa, esityksessä, palvelussa tai väliaikaisessa rakenteessa ja esitä tulos videona, datana, äänenä tai muuna digitaalisena dokumentaationa.",
        "pathway-digital-native-summary": "Fyysistä levyä ei tarvitse noutaa tai työstää. Työn on liityttävä selvästi poistolevyihin, analogisen median kulttuuriin, materiaalikiertoon tai kestävään muotoiluun eikä oltava teemasta irrallinen digitaalinen työ.",
        "pathway-record-label": "Levy",
        "pathway-outcome-label": "Lopputulos",
        "pathway-submit-label": "Toimitus",
        "pathway-physical-record": "Nouda projektin levy tai hanki poistolevyt itse. Yhdessä työssä saa käyttää enintään kuutta levyä.",
        "pathway-physical-outcome": "Turvallinen ja vakaa fyysinen työ, joka sopii kuljetukseen ja näyttelyyn.",
        "pathway-physical-submit": "Jätä työ kampuksen keräyslaatikkoon. Kuvat, video ja muut lisäaineistot ovat vapaaehtoisia.",
        "pathway-record-digital-record": "Nouda tai hanki poistolevy ja dokumentoi sen todellinen rooli prosessissa.",
        "pathway-record-digital-outcome": "Kuvina, videona, äänenä, datana tai interaktiivisina tiedostoina esitetty prosessi ja tulos.",
        "pathway-record-digital-submit": "Toimita työ, prosessidokumentaatio, vähintään yksi kuva ja lyhyt selitysvideo verkossa.",
        "pathway-digital-native-record": "Fyysistä levyä ei tarvita; digitaalisen työn voi aloittaa suoraan.",
        "pathway-digital-native-outcome": "Kuva, liikkuva kuva, ääni, data, verkkotyö, interaktiivinen työ tai muu digitaalinen muoto.",
        "pathway-digital-native-submit": "Toimita valmis työ, teemaselostus, edustava kuva, lyhyt video sekä näyttö-, toisto- tai suoritusvaatimukset verkossa.",
        "pathway-record-required-note": "Valitsemasi reitti käyttää fyysistä levyä. Valitse alta tapa hankkia se.",
        "pathway-record-optional-note": "Täysin digitaalisessa työssä levyn nouto on vapaaehtoista: levyä ei tarvita, joten voit siirtyä suoraan tekemiseen ja verkkotoimitukseen.",
        "pathway-safety-required-note": "Valitsemasi reitti käsittelee fyysisiä levyjä. Lue kaikki alla olevat säännöt ja noudata niitä.",
        "pathway-safety-optional-note": "Jos täysin digitaalinen työ ei käsittele fyysistä levyä, alla olevat PVC-työstön riskit eivät koske sitä. Näyttölaitteiden ja muiden fyysisten materiaalien kanssa on silti noudatettava työtilan ja laitteiden sääntöjä.",
        "title-poster": "Miten saat levyn, kun tarvitset sellaisen?",
        "lead-poster": "Fyysinen työ ja levyä hyödyntävä digitaalinen tulos käyttävät levyä, jonka voi ottaa kampuksen julisteesta tai hankkia itse. Täysin digitaalinen työ voi ohittaa tämän osion.",
        "method1-title": "Ota levy kampuksen julisteesta",
        "method1-desc": "Etsi RERE-CORDS-juliste Kyushun yliopiston Ohashin kampukselta. Jokaisen julisteen taakse on kiinnitetty yksi käytöstä poistettu vinyylilevy, jonka voit ottaa ilman erillistä ilmoittautumista.",
        "method1-purpose-note": "※ Analogisia levyjä saa ottaa vain tähän projektiin osallistumiseen suoraan liittyvää tarkoitusta varten. Levyjen ottaminen henkilökohtaiseen käyttöön on ehdottomasti kielletty.",
        "method1-note1": "※ Jos levy on jo otettu, tarkista toinen juliste tai pyydä lisämateriaalia sähköpostitse.",
        "method1-note2": "※ Julisteiden sijainnit ja levyjen täydennysaikataulu julkaistaan, kun kampanjan julisteet on asetettu esille.",
        "method2-title": "Hanki levy itse",
        "method2-desc": "Voit myös ostaa käytöstä poistetun vinyylilevyn omalla kustannuksellasi käytetyn musiikin liikkeestä tai verkkopalvelusta.",
        "method2-note1": "※ Yhdessä työssä saa käyttää enintään kuutta levyä myös silloin, kun levyt on hankittu itse.",
        "method2-note2": "※ Julisteisiin kiinnitetyt levyt ovat EP-kokoisia. Itse hankittu levy voi olla myös LP-kokoinen.",
        "title-requirements": "Työn vaatimukset",
        "lead-requirements": "Muotoilun ala on vapaa. Fyysisiä levyjä käyttävien reittien on noudatettava materiaalien ja työstämisen turvallisuussääntöjä; täysin digitaalisen työn on selitettävä selkeä suhteensa projektin teemaan.",
        "req-cat-title": "Muotoilun ala",
        "req-cat-text": "Alarajoituksia ei ole. Mahdollisia aloja ovat graafinen, tuote-, palvelu- ja muotisuunnittelu sekä yhteiskunnallisiin kysymyksiin keskittyvä muotoilu.",
        "req-limit-title": "Levyjen enimmäismäärä",
        "req-limit-text": "Fyysisiä levyjä käyttävässä työssä saa käyttää enintään <strong>6</strong> levyä. Täysin digitaalinen työ ei vaadi levyn noutoa, eikä käyttämättömiä levyjä tarvitse palauttaa.",
        "req-proc-title": "Työstötavat",
        "req-proc-text": "Levyjä voi leikata, taivuttaa, liittää tai yhdistää muihin materiaaleihin, mutta alla olevia turvallisuusohjeita on noudatettava. Kuumentaminen, hiominen ja sähkötyökalut ovat sallittuja vain hyväksytyssä tilassa, jossa on asianmukaiset suojaukset.",
        "req-sub-title": "Toimitettava aineisto",
        "req-sub-text": "Toimita fyysinen työ paikan päällä ja molemmat digitaaliset reitit verkossa. Vaaditut aineistot vaihtelevat reitin mukaan; noudata alla olevan toimitusosion valittua reittiä.",
        "req-notice-text": "Säilytä valmis fyysinen työ turvallisesti ja suojaa terävät reunat sekä irtonaiset osat ennen kuljetusta. Jätä työ rakennuksen 7 toisessa kerroksessa sijaitsevan MEDIA STUDIO -huoneen edessä olevaan keräyslaatikkoon 10. marraskuuta mennessä.",
        "safety-kicker": "Lue ennen työskentelyä",
        "title-safety": "Työstämisen turvallisuus",
        "lead-safety": "Käytöstä poistettujen levyjen päämateriaali on yleensä PVC. Leikkaaminen, kuumentaminen, hiominen, poraaminen ja liimaaminen voivat aiheuttaa vammoja tai haitallista altistumista. Arvioi menetelmän, materiaalin ja työtilan turvallisuus ennen aloittamista.",
        "safety-cut-title": "Leikkaaminen ja terävät reunat",
        "safety-cut-text": "Leikkauspinnat, terät ja lentävät sirpaleet voivat vahingoittaa käsiä tai silmiä. Kiinnitä materiaali, käytä PVC:lle sopivaa työkalua ja silmiensuojaimia sekä hio tai peitä terävät reunat.",
        "safety-heat-title": "Kuumuus, höyryt ja palovammat",
        "safety-heat-text": "Ylikuumentunut tai hajoava PVC voi vapauttaa ärsyttäviä höyryjä. Älä käytä avotulta tai hallitsematonta lämpöä. Kuumenna vain matalalla lämpötilalla ja lyhyesti hyväksytyssä tilassa, jossa on tehokas ilmanvaihto tai kohdepoisto.",
        "safety-tool-title": "Työkalut, pöly ja sähkö",
        "safety-tool-text": "Poraaminen, sahaaminen ja hiominen voivat aiheuttaa pöly-, takertumis-, sinkoutumis-, melu- ja sähkövaaroja. Käytä vain laitteita, joiden käyttöön sinut on koulutettu ja valtuutettu, sekä tilan edellyttämää pölynpoistoa, kuulon- ja hengityksensuojausta.",
        "safety-chemical-title": "Liimat ja yhdistelmämateriaalit",
        "safety-chemical-text": "Liimat, pinnoitteet ja puhdistusaineet voivat olla syttyviä tai ärsyttäviä. Lue merkinnät ja käyttöturvallisuustiedot, huolehdi ilmanvaihdosta, pidä aineet poissa lämmöstä ja varmista yhteensopivuus PVC:n kanssa.",
        "safety-prohibited-title": "Kiellettyä",
        "safety-prohibited-text": "Älä polta levyjä, kuumenna niitä avotulella, laserleikkaa PVC:tä tai kuumenna sitä suljetussa tai huonosti tuuletetussa tilassa. Älä käytä sähkötyökaluja tai kampuksen työpajalaitteita ilman lupaa ja koulutusta.",
        "safety-stop-title": "Keskeytä poikkeustilanteessa",
        "safety-stop-text": "Jos havaitset savua, voimakkaan tai ärsyttävän hajun, silmien, nenän tai kurkun ärsytystä, huimausta tai laitevian, lopeta heti, sammuta laite, poistu tilasta ja ota yhteys tilan vastuuhenkilöön. Hakeudu tarvittaessa hoitoon.",
        "title-timeline": "Projektin aikataulu",
        "lead-timeline": "Jokainen reitti etenee reitin valinnasta tekemiseen ja toimittamiseen sekä paikan päällä järjestettävään näyttelyyn. Materiaalin nouto koskee vain fyysisiä levyjä käyttäviä reittejä; marraskuun keskustelutilaisuus on vapaaehtoinen.",
        "time-step1": "20.8.-10.11.2026",
        "title-step1": "Valitse reitti, tee ja toimita",
        "text-step1": "Valitse ensin osallistumisreitti. Fyysinen työ ja levyä hyödyntävä digitaalinen tulos tarvitsevat levyn; täysin digitaalisen työn voi aloittaa suoraan. Töitä vastaanotetaan koko jakson ajan 10. marraskuuta saakka.",
        "timeline-optional-badge": "Vapaaehtoinen",
        "time-salon": "Noin 15.11.2026",
        "title-salon": "Keskustelutilaisuus",
        "text-salon": "Rento tilaisuus, jossa osallistujat voivat keskustella töistään ja jakaa kokemuksiaan. Tarkemmat tiedot ilmoitetaan myöhemmin, eikä osallistuminen vaikuta työn toimittamiseen tai näyttelyyn.",
        "time-step3": "20.-25.11.2026",
        "title-step3": "Fyysinen tulosnäyttely",
        "text-step3": "Kaikkien kolmen reitin kautta toimitetut työt voivat osallistua paikan päällä järjestettävään näyttelyyn. Digitaaliset työt esitetään toimitettujen näyttö-, toisto- tai suoritusvaatimusten mukaisesti.",
        "title-advisors": "Ohjaavat opettajat",
        "lead-advisors": "Strategisen muotoilun osasto, Faculty of Design, Kyushun yliopisto",
        "advisor-zhang-name": "ZHANG Yanfang",
        "advisor-zhang-role": "Apulaisprofessori · universaali muotoilu, sosiaalinen muotoilu",
        "advisor-zhang-bio": "Hänen tutkimuksensa ja käytännön työnsä keskittyvät universaaliin ja sosiaaliseen muotoiluun ketään unohtamatta. Design for SDGs- ja Global Goals Jam -työpajojen kautta hän yhdistää hallintoa, yliopistoja, yrityksiä, järjestöjä ja yhteisöjä etsimään muotoiluratkaisuja yhteiskunnallisiin haasteisiin.",
        "advisor-sarantou-name": "Melanie Sarantou",
        "advisor-sarantou-role": "Professori · strateginen muotoilu, sosiaalinen muotoilu",
        "advisor-sarantou-bio": "Hän on erikoistunut sosiaaliseen muotoiluun, transformaatiomuotoiluun ja taidelähtöisiin tutkimusmenetelmiin sekä erityisesti marginalisoitujen yhteisöjen ja erilaisten kulttuuristen ympäristöjen muotoilukäytäntöihin. Hän toimii myös Lapin yliopiston dosenttina ja on tehnyt tutkimusta Namibiassa, Suomessa, Australiassa ja Japanissa.",
        "apply-period-title": "Osallistumis- ja toimitusaika",
        "apply-period-text": "<span class='apply-date-highlight'>20.8.-10.11.2026</span>. Voit valmistaa ja toimittaa työsi milloin tahansa tänä aikana; erillistä ennakkoilmoittautumista ei tarvita.",
        "title-submission": "Töiden toimittaminen",
        "lead-submission": "Ennakkoilmoittautumista ei tarvita; valmis toimitus merkitsee virallista osallistumista. Valitsemasi reitin vaatimukset näkyvät alla ja päivittyvät, kun vaihdat valintaa ylempänä.",
        "submission-digital-title": "Levyä hyödyntävä digitaalinen tulos",
        "submission-digital-text": "Lähetä työn tiedot ja osallistumislomake PDF-muodossa sekä valmis digitaalinen tulos ja näyttö siitä, että levyä käytettiin todella luovassa prosessissa.",
        "submission-digital-requirements": "<strong>Pakolliset:</strong> vähintään yksi kuva työstä, lyhyt selitysvideo, prosessidokumentaatio sekä työn ymmärtämiseen, toistamiseen tai suorittamiseen tarvittavat lisätiedostot.",
        "submission-physical-title": "Valmis fyysinen työ",
        "submission-physical-text": "Jätä fyysinen työ rakennuksen 7 toisessa kerroksessa sijaitsevan MEDIA STUDIO -huoneen edessä olevaan keräyslaatikkoon. Liitä mukaan paperinen osallistumislomake tai lähetä se erikseen PDF-tiedostona.",
        "submission-physical-options": "<strong>Pakolliset:</strong> fyysinen työ ja osallistumislomake. Kuvat, video ja muu lisäaineisto ovat vapaaehtoisia.",
        "submission-digital-native-title": "Täysin digitaalinen työ",
        "submission-digital-native-text": "Toimita valmis työ ja osallistumislomake verkossa ja selitä työn suhde poistolevyihin, analogisen median kulttuuriin, materiaalikiertoon tai kestävään muotoiluun.",
        "submission-digital-native-requirements": "<strong>Pakolliset:</strong> vähintään yksi edustava kuva, lyhyt selitysvideo, valmis työtiedosto tai pääsytapa sekä näyttelytilan näyttö-, toisto- tai suoritusvaatimukset.",
        "submission-status-label": "Verkkoaineistot",
        "submission-status": "Osallistumislomakkeet, PDF-tiedostot ja lisäaineistot vastaanotetaan sähköpostitse",
        "submission-cta": "Lähetä osallistumislomake tai digitaaliset tiedostot sähköpostilla",
        "submission-fallback": "Lataa varalomake",
        "title-venue": "Näyttelypaikan tiedot",
        "lead-venue": "Näyttely järjestetään 20.-25. marraskuuta 2026 Studio 201:ssä, Moniulotteisen rakennuksen 2. kerroksessa, Kyushun yliopiston Ohashin kampuksella. Näyttely on avoin yleisölle.",
        "venue-address-label": "Osoite",
        "venue-address": "Studio 201, Moniulotteisen rakennuksen 2. kerros, Kyushu University Ohashi Campus | 4-9-1 Shiobaru, Minami-ku, Fukuoka 815-8540, Japani",
        "venue-transit-label": "Julkinen liikenne",
        "transit-badge-nishitetsu": "Nishitetsu",
        "transit-nishitetsu-title": "Nishitetsu Omuta -linja",
        "transit-nishitetsu-text": "Noin 5 minuutin kävely Ohashin asemalta",
        "transit-jr-title": "JR Kagoshima -päälinja",
        "transit-jr-text": "Noin 10 minuutin kävely Takeshitan asemalta",
        "transit-badge-bus": "Bussi",
        "transit-bus-title": "Nishitetsu-bussi",
        "transit-bus-text": "Jää pois pysäkillä Ohashi-ekimae; noin 3 minuutin kävely",
        "transit-badge-note": "Huom.",
        "transit-note-title": "Pysäköinti",
        "transit-note-text": "Kampuksella ei ole vieraspysäköintiä. Saavu julkisilla liikennevälineillä.",
        "footer-desc": "Käytöstä poistettuja vinyylilevyjä hyödyntävä kestävän muotoilun haku- ja näyttelyprojekti",
        "footer-contact-label": "RERE-CORDS-järjestäjät · Kysyttävää? Ota meihin yhteyttä"
    };

    Object.entries(fiTranslations).forEach(([key, value]) => {
        if (i18nDict[key]) i18nDict[key].fi = value;
    });

    const extraTranslations = window.RERE_CORDS_EXTRA_TRANSLATIONS || {};
    Object.entries(extraTranslations).forEach(([language, translations]) => {
        Object.entries(translations).forEach(([key, value]) => {
            if (i18nDict[key]) i18nDict[key][language] = value;
        });
    });

    const LANGUAGE_CODES = {
        en: 'en',
        ja: 'ja',
        zh: 'zh-CN',
        'zh-TW': 'zh-TW',
        ko: 'ko',
        id: 'id',
        vi: 'vi',
        th: 'th',
        bn: 'bn',
        ar: 'ar',
        fr: 'fr',
        hi: 'hi',
        fi: 'fi'
    };
    const SUPPORTED_LANGUAGES = Object.keys(LANGUAGE_CODES);

    function normalizeLanguage(language) {
        return SUPPORTED_LANGUAGES.includes(language) ? language : 'en';
    }

    let currentLang = normalizeLanguage(localStorage.getItem('rere_cords_lang'));

    function updateLanguage(language) {
        currentLang = normalizeLanguage(language);
        localStorage.setItem('rere_cords_lang', currentLang);
        document.documentElement.setAttribute('lang', LANGUAGE_CODES[currentLang]);
        document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');

        // Translate general text nodes
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (i18nDict[key] && i18nDict[key][currentLang]) {
                if (el.tagName === 'TITLE') {
                    document.title = i18nDict[key][currentLang];
                } else {
                    el.innerHTML = i18nDict[key][currentLang];
                }
            }
        });

        // Translate placeholders
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (i18nDict[key] && i18nDict[key][currentLang]) {
                el.setAttribute('placeholder', i18nDict[key][currentLang]);
            }
        });

        const languageSelect = document.getElementById('language-select');
        if (languageSelect) languageSelect.value = currentLang;

        const languageOptions = document.querySelectorAll('[data-language-option]');
        languageOptions.forEach((option) => {
            option.setAttribute('aria-selected', String(option.dataset.languageOption === currentLang));
        });

        const activeOption = document.querySelector(`[data-language-option="${currentLang}"]`);
        const currentFlag = document.getElementById('language-current-flag');
        const currentName = document.getElementById('language-current-name');
        if (activeOption && currentFlag && currentName) {
            currentFlag.textContent = activeOption.querySelector('.language-option-flag')?.textContent || '';
            currentName.textContent = activeOption.querySelector('span:last-child')?.textContent || currentLang;
        }
    }

    function initLanguageMenu() {
        const menu = document.getElementById('language-menu');
        const trigger = document.getElementById('language-menu-trigger');
        const popover = document.getElementById('language-menu-popover');
        const options = [...document.querySelectorAll('[data-language-option]')];
        if (!menu || !trigger || !popover || options.length === 0) return;

        const selectedIndex = () => Math.max(0, options.findIndex((option) => option.dataset.languageOption === currentLang));

        function setOpen(open, focusIndex = null) {
            menu.classList.toggle('is-open', open);
            trigger.setAttribute('aria-expanded', String(open));
            popover.hidden = !open;
            if (open && focusIndex !== null) options[focusIndex]?.focus();
        }

        function moveFocus(currentOption, offset) {
            const currentIndex = options.indexOf(currentOption);
            const nextIndex = (currentIndex + offset + options.length) % options.length;
            options[nextIndex].focus();
        }

        trigger.addEventListener('click', () => {
            setOpen(popover.hidden, selectedIndex());
        });

        trigger.addEventListener('keydown', (event) => {
            if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
            event.preventDefault();
            const offset = event.key === 'ArrowDown' ? 0 : -1;
            setOpen(true, (selectedIndex() + offset + options.length) % options.length);
        });

        options.forEach((option) => {
            option.addEventListener('click', () => {
                updateLanguage(option.dataset.languageOption);
                setOpen(false);
                trigger.focus();
            });

            option.addEventListener('keydown', (event) => {
                switch (event.key) {
                    case 'ArrowDown':
                        event.preventDefault();
                        moveFocus(option, 1);
                        break;
                    case 'ArrowUp':
                        event.preventDefault();
                        moveFocus(option, -1);
                        break;
                    case 'Home':
                        event.preventDefault();
                        options[0].focus();
                        break;
                    case 'End':
                        event.preventDefault();
                        options.at(-1).focus();
                        break;
                    case 'Escape':
                        event.preventDefault();
                        setOpen(false);
                        trigger.focus();
                        break;
                }
            });
        });

        document.addEventListener('click', (event) => {
            if (!menu.contains(event.target)) setOpen(false);
        });
    }

    function isValidExternalUrl(value) {
        if (typeof value !== 'string' || value.trim() === '') return false;

        try {
            const url = new URL(value.trim());
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch {
            return false;
        }
    }

    function isValidSubmissionUrl(value) {
        if (typeof value !== 'string' || value.trim() === '') return false;

        try {
            const url = new URL(value.trim());
            return url.protocol === 'http:' || url.protocol === 'https:' || url.protocol === 'mailto:';
        } catch {
            return false;
        }
    }

    function initParticipantPathways() {
        const pathways = ['physical', 'record-digital', 'digital-native'];
        const tabs = [...document.querySelectorAll('[data-pathway-tab]')];
        const panels = [...document.querySelectorAll('[data-pathway-panel]')];
        const submissions = [...document.querySelectorAll('[data-pathway-submission]')];
        const recordRequiredNotes = [...document.querySelectorAll('[data-pathway-context="record-required"]')];
        const recordOptionalNotes = [...document.querySelectorAll('[data-pathway-context="record-optional"]')];
        if (tabs.length !== pathways.length || panels.length !== pathways.length) return;

        const storedPathway = localStorage.getItem('rere_cords_pathway');
        let currentPathway = pathways.includes(storedPathway) ? storedPathway : 'physical';

        function selectPathway(pathway, moveFocus = false) {
            currentPathway = pathways.includes(pathway) ? pathway : 'physical';
            const usesPhysicalRecord = currentPathway !== 'digital-native';

            tabs.forEach((tab) => {
                const selected = tab.dataset.pathwayTab === currentPathway;
                tab.setAttribute('aria-selected', String(selected));
                tab.tabIndex = selected ? 0 : -1;
                if (selected && moveFocus) tab.focus();
            });
            panels.forEach((panel) => {
                panel.hidden = panel.dataset.pathwayPanel !== currentPathway;
            });
            submissions.forEach((submission) => {
                submission.hidden = submission.dataset.pathwaySubmission !== currentPathway;
            });
            recordRequiredNotes.forEach((note) => {
                note.hidden = !usesPhysicalRecord;
            });
            recordOptionalNotes.forEach((note) => {
                note.hidden = usesPhysicalRecord;
            });

            document.documentElement.dataset.participationPathway = currentPathway;
            localStorage.setItem('rere_cords_pathway', currentPathway);
        }

        tabs.forEach((tab) => {
            tab.addEventListener('click', () => selectPathway(tab.dataset.pathwayTab));
            tab.addEventListener('keydown', (event) => {
                const currentIndex = pathways.indexOf(currentPathway);
                let nextIndex = currentIndex;

                switch (event.key) {
                    case 'ArrowRight':
                    case 'ArrowDown':
                        nextIndex = (currentIndex + 1) % pathways.length;
                        break;
                    case 'ArrowLeft':
                    case 'ArrowUp':
                        nextIndex = (currentIndex - 1 + pathways.length) % pathways.length;
                        break;
                    case 'Home':
                        nextIndex = 0;
                        break;
                    case 'End':
                        nextIndex = pathways.length - 1;
                        break;
                    default:
                        return;
                }

                event.preventDefault();
                selectPathway(pathways[nextIndex], true);
            });
        });

        selectPathway(currentPathway);
    }

    function initSubmissionEntry() {
        const cta = document.getElementById('submission-cta');
        const fallback = document.getElementById('submission-fallback');
        if (!cta) return;

        const config = window.RERE_CORDS_SUBMISSION_CONFIG || {};
        const formUrl = isValidSubmissionUrl(config.formUrl) ? config.formUrl.trim() : '';
        const fallbackUrl = isValidExternalUrl(config.fallbackDocumentUrl)
            ? config.fallbackDocumentUrl.trim()
            : '';
        const enabled = config.enabled === true && formUrl !== '';

        cta.classList.toggle('is-disabled', !enabled);
        cta.setAttribute('aria-disabled', String(!enabled));

        if (enabled) {
            cta.href = formUrl;
            if (formUrl.startsWith('mailto:')) {
                cta.removeAttribute('target');
                cta.removeAttribute('rel');
            } else {
                cta.target = '_blank';
                cta.rel = 'noopener';
            }
            cta.removeAttribute('tabindex');
        } else {
            cta.removeAttribute('href');
            cta.removeAttribute('target');
            cta.removeAttribute('rel');
            cta.setAttribute('tabindex', '-1');
        }

        if (fallback) {
            fallback.hidden = fallbackUrl === '';
            if (fallbackUrl !== '') {
                fallback.href = fallbackUrl;
                fallback.target = '_blank';
                fallback.rel = 'noopener';
            } else {
                fallback.removeAttribute('href');
                fallback.removeAttribute('target');
                fallback.removeAttribute('rel');
            }
        }

        cta.addEventListener('click', (event) => {
            if (cta.getAttribute('aria-disabled') === 'true') event.preventDefault();
        });
    }

    const languageSelect = document.getElementById('language-select');
    languageSelect?.addEventListener('change', (event) => updateLanguage(event.target.value));
    initLanguageMenu();



    function createFrameScheduler(callback) {
        let framePending = false;

        return () => {
            if (framePending) return;
            framePending = true;
            window.requestAnimationFrame(() => {
                framePending = false;
                callback();
            });
        };
    }

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    /* --------------------------------------------------------------------------
       3. Scroll Reveal Animations (Timeline & Cards)
       -------------------------------------------------------------------------- */
    const revealItems = document.querySelectorAll('.reveal-on-scroll, .timeline-item');

    if (revealItems.length > 0) {
        if (reducedMotionQuery.matches || !('IntersectionObserver' in window)) {
            revealItems.forEach(item => item.classList.add('visible'));
        } else {
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
    }

    // Set default language on load
    updateLanguage(currentLang);
    initParticipantPathways();
    initSubmissionEntry();

    /* --------------------------------------------------------------------------
       4. Persistent Header Visual State
       -------------------------------------------------------------------------- */
    const mainHeader = document.getElementById('main-header');
    const heroSection = document.getElementById('hero');

    if (mainHeader && heroSection) {
        const updateHeader = () => {
            const headerHeight = mainHeader.offsetHeight;
            const overHero = window.scrollY < heroSection.offsetHeight - headerHeight;
            mainHeader.classList.toggle('is-over-hero', overHero);
        };
        const scheduleHeaderUpdate = createFrameScheduler(updateHeader);

        updateHeader();
        window.addEventListener('scroll', scheduleHeaderUpdate, { passive: true });
        window.addEventListener('resize', scheduleHeaderUpdate, { passive: true });
    }

    /* --------------------------------------------------------------------------
       5. Scroll-Driven Pinning Poster Vinyl Reveal Animation (For Mobile & Desktop)
       -------------------------------------------------------------------------- */
    function initPosterScrollAnimation() {
        const stickyTrack = document.querySelector('.poster-sticky-track');
        const posterFrame = document.querySelector('.poster-frame');
        const posterVinyl = document.querySelector('.poster-vinyl');
        if (!stickyTrack || !posterFrame || !posterVinyl) return;
        if (reducedMotionQuery.matches) return;

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

        const schedulePosterUpdate = createFrameScheduler(updatePosterAnimation);
        window.addEventListener('scroll', schedulePosterUpdate, { passive: true });
        window.addEventListener('resize', schedulePosterUpdate, { passive: true });
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
        if (lightboxImg) lightboxImg.addEventListener('click', closeLightbox);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    initPosterLightbox();
});
