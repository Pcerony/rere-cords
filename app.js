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
            "zh": "面向九州大学艺术工学部与艺术工学府学生征集作品。欢迎使用活动提供的废旧唱片作为素材进行创作。",
            "ja": "九州大学芸術工学部・芸術工学府の学生を対象に作品を募集します。提供する廃棄レコードを素材として使った作品を募集します。",
            "en": "We invite work from students of the School of Design and Graduate School of Design at Kyushu University. We welcome your creativity to upcycle discarded records."
        },
        "title-concept": {
            "zh": "企划理念",
            "ja": "企画コンセプト",
            "en": "Project Concept"
        },
        "lead-concept": {
            "zh": "通过废旧黑胶唱片的实体再利用与设计重构，重新探讨资源循环与可持续设计。",
            "ja": "廃棄レコードの素材再利用とデザイン再構築を通じて、資源循環とサステナブルデザインを考えます。",
            "en": "Rethinking resource circulation and sustainable design through physical reuse and reconstruction of discarded vinyl records."
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
            "zh": "参与与制作流程",
            "ja": "参加・制作プロセス",
            "en": "Participation & Process"
        },
        "lead-pathways": {
            "zh": "从领取废旧唱片到制作实体作品，提交后即可参加成果展示会。",
            "ja": "廃棄レコードの入手から実物作品の制作・提出まで。提出完了後、成果展示会へ参加できます。",
            "en": "From obtaining discarded records to crafting a physical work and submitting it for the onsite exhibition."
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
            "zh": "请在加工前完整阅读并遵守以下安全规定。",
            "ja": "加工・制作を行う前に、以下の規定をすべて読み遵守してください。",
            "en": "Read and follow all of the processing safety rules below."
        },
        "title-poster": {
            "zh": "如何获得实体唱片？",
            "ja": "レコードの入手方法",
            "en": "How to Obtain a Record"
        },
        "lead-poster": {
            "zh": "制作实体作品所需唱片，可从校园海报、集中领取盒获取或自行购买。",
            "ja": "実物作品の制作に必要なレコードは、学内ポスター、集中配布ボックスから入手するか自費で購入できます。",
            "en": "Records needed for physical works are available from campus posters, the central pickup box, or through self-purchase."
        },
        "method1-title": {
            "zh": "从校园海报背面取下",
            "ja": "キャンパス内ポスター裏面からの取得",
            "en": "Take from Campus Posters"
        },
        "method1-desc": {
            "zh": "在九州大学大桥校区内寻找张贴的 RERE-CORDS 活动海报，每张海报背面均附有一张废旧黑胶唱片，可直接取下带走。",
            "ja": "九州大学大橋キャンパス内に掲示されている RERE-CORDS のポスターをお探しください。各ポスターの裏面に廃棄レコードが1枚添付されており、そのままお持ち帰りいただけます。",
            "en": "Look for RERE-CORDS posters displayed across Kyushu University Ohashi Campus. Each poster has a discarded vinyl record attached to its back."
        },
        "method1-purpose-note": {
            "zh": "※ 实体唱片只可为与参与本项目直接相关的目的领取。严禁为个人使用而领取实体唱片。",
            "ja": "※ アナログレコードは、本プロジェクトへの参加に直接関係する目的に限り受け取ることができます。個人利用を目的とした受け取りは固く禁止します。",
            "en": "The analog records may only be collected for purposes directly related to participation in this project. Any collection for personal use of the analog records is strictly prohibited."
        },
        "method1-note1": {
            "zh": "* 若海报背面的唱片不足，请寻找其他位置的海报，或前往集中领取盒。",
            "ja": "※ ポスター裏面のレコードが不足している場合は、別の場所のポスターを探すか、集中配布ボックスをご利用ください。",
            "en": "※ If records are in short supply behind a poster, please check posters at other locations or use the central pickup box."
        },
        "method1-note2": {
            "zh": "* 我们会在正式张贴后公布所有海报位置，并且公布详细的补充唱片周期时间。",
            "ja": "※ 正式な掲示開始後、すべてのポスター設置場所およびレコードの補充スケジュールを公開いたします。",
            "en": "※ All poster locations and the record replenishment schedule will be published once official posting begins."
        },
        "method-pickup-title": {
            "zh": "到集中领取盒领取",
            "ja": "集中配布ボックスからの受け取り",
            "en": "Use the Central Pickup Box"
        },
        "method-pickup-desc": {
            "zh": "若海报背面的唱片不足，可前往九州大学大桥校区7号馆2楼 MEDIA STUDIO 房间前的集中领取盒。",
            "ja": "ポスター裏面のレコードが不足している場合は、九州大学大橋キャンパス7号館2階 MEDIA STUDIO 部屋前の集中配布ボックスをご利用ください。",
            "en": "If records are in short supply behind the posters, visit the central pickup box in front of the MEDIA STUDIO room on 2F of Building 7 at Kyushu University Ohashi Campus."
        },
        "method-pickup-note": {
            "zh": "* 请按实际创作需要领取，每件作品使用的唱片总数仍不得超过6张。",
            "ja": "※ 制作に必要な枚数のみ受け取り、1作品あたりの使用枚数は合計6枚までとしてください。",
            "en": "※ Take only what your work requires; the total limit remains six records per entry."
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
            "zh": "设计类别不限。制作实体作品须遵守材料与加工安全规则。",
            "ja": "デザイン分野は問いません。実物作品の制作では素材と加工の安全規定を守ってください。",
            "en": "Design categories are open. Creating physical works must follow material and processing safety rules."
        },
        "req-cat-title": {
            "zh": "设计类别",
            "ja": "デザイン分野",
            "en": "Design Category"
        },
        "req-cat-text": {
            "zh": "类别不限。推荐方向：平面设计、产品设计、服务设计、时装。",
            "ja": "ジャンル・分野は問いません。推奨分野：グラフィックデザイン、プロダクトデザイン、サービスデザイン、ファッションなど。",
            "en": "No category restrictions. Recommended areas: graphic design, product design, service design, and fashion."
        },
        "req-limit-title": {
            "zh": "用料上限",
            "ja": "使用枚数上限",
            "en": "Record Usage Limit"
        },
        "req-limit-text": {
            "zh": "使用实体唱片的作品最多使用 <strong>6张</strong>。多余唱片无需归还。",
            "ja": "実物レコードを使う作品は最大 <strong>6枚</strong> までです。余ったレコードの返却は不要です。",
            "en": "Work using physical records may use up to <strong>6</strong>. Unused records do not need to be returned."
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
            "zh": "实体作品请线下投入回收箱；图像、视频等补充资料及参与表可线上或纸质提交。",
            "ja": "実物作品は学内回収ボックスへ提出してください。画像や動画などの補足資料および参加フォームはオンラインまたは紙で提出できます。",
            "en": "Submit physical works offline to the collection box; optional supplements and participation forms can be submitted online or in print."
        },
        "req-notice-text": {
            "zh": "请妥善保管制作完成的实物作品，并在搬运前处理尖锐边缘和不稳定部件。产生的废料请按照地方自治体规定的处理方式妥善废弃。请于11月10日前投入7号馆2层 MEDIA STUDIO 房间前的回收箱。",
            "ja": "完成した実物作品は大切に保管し、運搬前に鋭利な縁や不安定な部品を安全な状態にしてください。発生した端材やごみは自治体の定めた処分方法にて適切に廃棄してください。11月10日までに7号館2階MEDIA STUDIO部屋前の回収ボックスへ提出してください。",
            "en": "Store finished physical works safely and secure sharp edges or unstable parts before transport. Please dispose of waste materials properly in accordance with the disposal regulations specified by the local municipality. Place them in the collection box in front of MEDIA STUDIO on 2F of Building 7 by November 10."
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
            "zh": "PVC过热或燃烧会热分解产生氯化氢等有毒气体。严禁明火炙烤或高温干烧；唱片热弯曲仅许采用60°C~80°C温水低温软化法，需保持良好换气通风并佩戴防热手套防烫伤。",
            "ja": "PVCの過熱・燃焼は塩化水素等の有毒ガスを発生させます。直火や高温熱風による炙りは絶対禁止です。曲げ加工には換気の良い場所で『60°C〜80°Cの温水軟化法』のみ許容し、火傷に注意してください。",
            "en": "Overheating or burning PVC releases toxic hydrogen chloride gas. Never use open flames or dry heat; for bending, use only low-temp warm water softening (60°C–80°C) in well-ventilated areas and guard against burns."
        },
        "safety-tool-title": {
            "zh": "工具、粉尘与用电",
            "ja": "工具、粉じん、電気",
            "en": "Tools, Dust, and Electricity"
        },
        "safety-tool-text": {
            "zh": "钻孔、锯切和打磨可能产生粉尘、缠卷、飞溅、噪声或触电风险。打磨钻孔时务必佩戴防尘口罩与护目镜，粉尘不得随意吹散，需及时清理工作现场以防粉尘扩散吸入。",
            "ja": "穴あけ、切断、研磨には粉じん、巻き込まれ、飛散、騒音等の危険があります。作業時は必ず防塵マスク・保護ゴーグルを着用し、粉じんを飛散させず速やかに清掃を行ってください。",
            "en": "Drilling, sawing, and sanding create dust, entanglement, projectiles, noise, or electrical hazards. Wear dust masks and goggles when sanding/drilling, and clean up dust promptly without dispersing it."
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
            "zh": "严禁燃烧唱片、明火炙烤、激光切割PVC（释放有毒氯气）及密闭空间加热。未受相应安全培训禁止使用电动工具；如参加者决定使用校内工坊，须自行办理预约并遵守设施规约，责任自负。",
            "ja": "レコードの燃焼、直火加熱、PVCのレーザー加工（有毒塩素ガス発生）、密閉空間での加熱を固く禁じます。未訓練での電動工具使用は禁止です。学内工房を使用する場合は参加者個人が予約を行い規約を遵守してください。",
            "en": "Do not burn records, heat them with open flames, laser-cut PVC (releases toxic chlorine gas), or heat in enclosed spaces. Do not use power tools without training. If choosing to use campus workshops, reserve independently and obey facility rules."
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
            "zh": "无需提前报名，完成作品提交即视为正式参加。请将实体作品投入回收箱并提交参与表。",
            "ja": "事前申込は不要で、作品の提出完了をもって正式参加となります。実物作品を回収ボックスへ入れ、参加票を提出してください。",
            "en": "No advance registration is required; completed submission constitutes formal participation. Deliver physical works to the collection box and submit the participation form."
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
            "zh": "从领取材料、制作与提交到线下成果展览。11月中旬的交流沙龙可选参加。",
            "ja": "素材の入手、制作・提出から対面成果展示まで。11月中旬の交流サロンは自由参加です。",
            "en": "From material pickup, making, and submission to the onsite exhibition. The mid-November exchange salon is optional."
        },
        "time-step1": {
            "zh": "2026年8月20日 - 11月10日",
            "ja": "2026年8月20日（木）〜11月10日（火）",
            "en": "August 20 - November 10, 2026"
        },
        "title-step1": {
            "zh": "领取材料、制作与随时提交",
            "ja": "素材入手・制作・随時提出",
            "en": "Obtain Materials, Make, and Submit"
        },
        "text-step1": {
            "zh": "领取活动唱片或自行准备废旧唱片并开展制作。期间随时接受提交，最终截止时间为11月10日。",
            "ja": "配布レコードを受け取るか自分で用意し、制作を行います。期間中は随時提出でき、最終締切は11月10日です。",
            "en": "Obtain supplied records or source discarded records yourself to begin making. Submissions are accepted throughout the period until November 10."
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
            "zh": "提交的实体作品将在九州大学大桥校区多次元楼 2F 成果展示会中公开展出。",
            "ja": "提出された実物作品は、九州大学大橋キャンパス多次元棟2階の成果展示会で公開発表されます。",
            "en": "Submitted physical works will be publicly exhibited at the 2F Studio exhibition at Kyushu University Ohashi Campus."
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
        "advisor-profile-btn": {
            "zh": "研究者 Profile",
            "ja": "教員プロフィール",
            "en": "Faculty Profile"
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
        "instagram-follow-label": {
            "zh": "获取最新消息：关注官方 Instagram",
            "ja": "最新情報はこちら：公式 Instagram",
            "en": "Get the latest updates: Follow official Instagram"
        },
        "instagram-qr-hint": {
            "zh": "扫一扫关注 @rerecords20262026",
            "ja": "スキャンして公式 Instagram をフォロー",
            "en": "Scan to follow @rerecords20262026"
        },
        "instagram-expand-hint": {
            "zh": "[点击展开二维码 ↓]",
            "ja": "[QRコードを表示 ↓]",
            "en": "[Click to view QR code ↓]"
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
        },
        "map-badge": {
            "zh": "3D 校园互动导航",
            "ja": "3D キャンパスマップ",
            "en": "3D Campus Map",
            "zh-TW": "3D 校園互動導航",
            "fi": "Interaktiivinen 3D-kampuskartta"
        },
        "map-title": {
            "zh": "唱片领取点地图",
            "ja": "レコード配布ポイントマップ",
            "en": "Record Pickup Points Map",
            "zh-TW": "唱片領取點地圖",
            "fi": "Levyjen noutopisteiden kartta"
        },
        "map-lead": {
            "zh": "大桥校区的海报张贴、唱片领取与成果展点位，以建筑白模与右侧详情对应呈现。",
            "ja": "大橋キャンパスのポスター掲示・レコード配布・成果展示の地点を、建物モデルと右側の詳細で示します。",
            "en": "Poster, record pickup, and exhibition locations across Ohashi Campus, paired with the white model and location details.",
            "zh-TW": "大橋校區的海報張貼、唱片領取與成果展點位，以建築白模與右側詳情對應呈現。",
            "fi": "Ohashin kampuksen juliste-, levynouto- ja näyttelypaikat yhdistyvät valkoiseen malliin ja sijaintitietoihin."
        },
        "map-loading": {
            "zh": "加载 3D 校园白模中...",
            "ja": "3Dキャンパスマップを読み込み中...",
            "en": "Loading 3D Campus Model...",
            "zh-TW": "載入 3D 校園白模中...",
            "fi": "Ladataan 3D-mallia..."
        },
        "map-reset-view": {
            "zh": "全景",
            "ja": "全景",
            "en": "Overview",
            "zh-TW": "全景",
            "fi": "Yleisnäkymä"
        },
        "map-exhibition-view": {
            "zh": "展览 · 多次元",
            "ja": "展示 · 多次元デザイン実験棟",
            "en": "Exhibition · Multi-Dimensional Design Experimental Building",
            "zh-TW": "展覽 · 多次元",
            "fi": "Näyttely · Moniulotteisen suunnittelun kokeilurakennus"
        },
        "map-hint": {
            "zh": "建筑标记与右侧详情相互对应",
            "ja": "建物マーカーと右側の詳細が対応しています",
            "en": "Building markers correspond to the location details",
            "zh-TW": "建築標記與右側詳情相互對應",
            "fi": "Rakennusmerkit vastaavat sijaintitietoja"
        },
        "loc-all": {
            "zh": "全景 (All)",
            "ja": "全体 (All)",
            "en": "Overview (All)",
            "zh-TW": "全景 (All)",
            "fi": "Yleiskuva"
        },
        "loc-bldg7-hub": {
            "zh": "7号馆 2F (集中领取/工具/回收)",
            "ja": "7号館 2F (集中配布・工具貸出・回収)",
            "en": "Bldg 7, 2F (Central Hub)",
            "zh-TW": "7號館 2F (集中領取/工具/回收)",
            "fi": "Rakennus 7, 2. krs (Päänoutopiste)"
        },
        "loc-bldg1": {
            "zh": "1号馆 2F 掲示板",
            "ja": "1号館 2F 掲示板",
            "en": "Bldg 1, 2F Board",
            "zh-TW": "1號館 2F 佈告欄",
            "fi": "Rakennus 1, 2. krs"
        },
        "loc-bldg2": {
            "zh": "2号馆 2F 掲示板",
            "ja": "2号館 2F 掲示板",
            "en": "Bldg 2, 2F Board",
            "zh-TW": "2號館 2F 佈告欄",
            "fi": "Rakennus 2, 2. krs"
        },
        "loc-bldg5": {
            "zh": "5号馆 1F 掲示板",
            "ja": "5号館 1F 掲示板",
            "en": "Bldg 5, 1F Board",
            "zh-TW": "5號館 1F 佈告欄",
            "fi": "Rakennus 5, 1. krs"
        },
        "loc-bldg7-1f": {
            "zh": "7号馆 1F 掲示板",
            "ja": "7号館 1F 掲示板",
            "en": "Bldg 7, 1F Board",
            "zh-TW": "7號館 1F 佈告欄",
            "fi": "Rakennus 7, 1. krs"
        },
        "loc-library": {
            "zh": "图书馆 1F 掲示板",
            "ja": "図書館 1F 掲示板",
            "en": "Library 1F Board",
            "zh-TW": "圖書館 1F 佈告欄",
            "fi": "Kirjasto 1. krs"
        },
        "loc-bldg8": {
            "zh": "多次元 · 展览",
            "ja": "多次元 · 展示",
            "en": "Multi-Dimensional · Exhibition",
            "zh-TW": "多次元 · 展覽",
            "fi": "Moniulotteinen · Näyttely"
        },
        "map-meta-floor-label": {
            "zh": "具体楼层：",
            "ja": "設置階：",
            "en": "Floor:",
            "zh-TW": "具體樓層：",
            "fi": "Kerros:"
        },
        "map-meta-items-label": {
            "zh": "现场提供：",
            "ja": "提供備品・素材：",
            "en": "Available Items:",
            "zh-TW": "現場提供：",
            "fi": "Saatavilla:"
        }
    };

    const fiTranslations = {
        "doc-title": "RERE-CORDS | Käytöstä poistettujen vinyylilevyjen kestävän muotoilun näyttely",
        "sdg-badge-text": "Vastuullista kuluttamista ja tuotantoa",
        "hero-subtitle": "Kestävän muotoilun näyttely kierrätetyistä vinyylilevyistä",
        "hero-description": "Kutsumme Kyushun yliopiston muotoilutieteiden tiedekunnan ja tutkijakoulun opiskelijat osallistumaan. Kutsumme töitä, joissa käytetään tarjottuja poistolevyjä materiaalina.",
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
        "title-poster": "Miten saat levyn?",
        "lead-poster": "Fyysinen työ ja levyä hyödyntävä digitaalinen tulos käyttävät levyä, jonka voi ottaa kampuksen julisteesta tai keskitetystä jakelulaatikosta tai hankkia itse. Täysin digitaalinen työ voi ohittaa tämän osion.",
        "method1-title": "Ota levy kampuksen julisteesta",
        "method1-desc": "Etsi RERE-CORDS-juliste Kyushun yliopiston Ohashin kampukselta. Jokaisen julisteen taakse on kiinnitetty yksi käytöstä poistettu vinyylilevy, jonka voit ottaa.",
        "method1-purpose-note": "※ Analogisia levyjä saa ottaa vain tähän projektiin osallistumiseen suoraan liittyvää tarkoitusta varten. Levyjen ottaminen henkilökohtaiseen käyttöön on ehdottomasti kielletty.",
        "method1-note1": "※ Jos julisteen takana ei ole riittävästi levyjä, tarkista toinen juliste tai käytä keskitettyä jakelulaatikkoa.",
        "method1-note2": "※ Julisteiden sijainnit ja levyjen täydennysaikataulu julkaistaan, kun kampanjan julisteet on asetettu esille.",
        "method-pickup-title": "Nouda keskitetystä jakelulaatikosta",
        "method-pickup-desc": "Jos julisteiden takana olevia levyjä ei ole riittävästi, käytä keskitettyä jakelulaatikkoa Kyushun yliopiston Ohashin kampuksen rakennuksen 7 toisessa kerroksessa MEDIA STUDIO -huoneen edessä.",
        "method-pickup-note": "※ Ota vain työssäsi tarvitsemasi määrä. Yhdessä työssä saa edelleen käyttää enintään kuutta levyä.",
        "method2-title": "Hanki levy itse",
        "method2-desc": "Voit myös ostaa käytöstä poistetun vinyylilevyn omalla kustannuksellasi käytetyn musiikin liikkeestä tai verkkopalvelusta.",
        "method2-note1": "※ Yhdessä työssä saa käyttää enintään kuutta levyä myös silloin, kun levyt on hankittu itse.",
        "method2-note2": "※ Julisteisiin kiinnitetyt levyt ovat EP-kokoisia. Itse hankittu levy voi olla myös LP-kokoinen.",
        "title-requirements": "Työn vaatimukset",
        "lead-requirements": "Muotoilun ala on vapaa. Fyysisiä levyjä käyttävien reittien on noudatettava materiaalien ja työstämisen turvallisuussääntöjä; täysin digitaalisen työn on selitettävä selkeä suhteensa projektin teemaan.",
        "req-cat-title": "Muotoilun ala",
        "req-cat-text": "Alarajoituksia ei ole. Mahdollisia aloja ovat graafinen, tuote-, palvelu- ja muotisuunnittelu.",
        "req-limit-title": "Levyjen enimmäismäärä",
        "req-limit-text": "Fyysisiä levyjä käyttävässä työssä saa käyttää enintään <strong>6</strong> levyä. Käyttämättömiä levyjä ei tarvitse palauttaa.",
        "req-proc-title": "Työstötavat",
        "req-proc-text": "Levyjä voi leikata, taivuttaa, liittää tai yhdistää muihin materiaaleihin, mutta alla olevia turvallisuusohjeita on noudatettava. Kuumentaminen, hiominen ja sähkötyökalut ovat sallittuja vain hyväksytyssä tilassa, jossa on asianmukaiset suojaukset.",
        "req-sub-title": "Toimitettava aineisto",
        "req-sub-text": "Toimita fyysinen työ kierrätyslaatikkoon paikan päällä. Täydentävät aineistot, kuten kuvat ja videot, sekä osallistumislomake voidaan toimittaa verkossa tai paperilla.",
        "req-notice-text": "Säilytä valmis fyysinen työ turvallisesti ja suojaa terävät reunat sekä irtonaiset osat ennen kuljetusta. Hävitä syntyvät jätteet asianmukaisesti paikallisten viranomaismääräysten mukaisesti. Jätä työ rakennuksen 7 toisessa kerroksessa sijaitsevan MEDIA STUDIO -huoneen edessä olevaan keräyslaatikkoon 10. marraskuuta mennessä.",
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
        "advisor-profile-btn": "Tutkijan profiili",
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
        "footer-contact-label": "RERE-CORDS-järjestäjät · Kysyttävää? Ota meihin yhteyttä",
        "instagram-follow-label": "Uusimmat tiedot: Seuraa virallista Instagramia",
        "instagram-qr-hint": "Skannaa ja seuraa @rerecords20262026",
        "instagram-expand-hint": "[Näytä QR-koodi ↓]"
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

        if (typeof window.updateMapLanguageDetails === 'function') {
            window.updateMapLanguageDetails(currentLang);
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

            const currentScroll = -rect.top;
            let progress = currentScroll / scrollableDistance;
            progress = Math.max(0, Math.min(1, progress));

            let animProgress = 0;
            if (progress > 0.05 && progress < 0.95) {
                animProgress = (progress - 0.05) / 0.9;
            } else if (progress >= 0.95) {
                animProgress = 1;
            }

            const easeProgress = animProgress < 0.5
                ? 2 * animProgress * animProgress
                : 1 - Math.pow(-2 * animProgress + 2, 2) / 2;

            const isMobile = window.innerWidth <= 768;
            const maxFrameShift = isMobile ? -18 : -22;
            const maxVinylShift = isMobile ? 40 : 48;
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

    /* --------------------------------------------------------------------------
       7. Interactive 2.5D Campus Site Plan (Three.js)
       -------------------------------------------------------------------------- */
    const CAMPUS_LOCATIONS = {
        "all": {
            tag: { zh: "🌐 校区全貌", ja: "🌐 キャンパス全景", en: "🌐 Campus Overview", 'zh-TW': "🌐 校區全貌", fi: "🌐 Kampuksen yleisnäkymä" },
            tagType: "default",
            title: { zh: "九州大学 大桥校区 (大橋キャンパス)", ja: "九州大学 大橋キャンパス", en: "Kyushu University Ohashi Campus", 'zh-TW': "九州大學 大橋校區", fi: "Kyushun yliopisto, Ohashin kampus" },
            desc: {
                zh: "大桥校区内共设有 6 处海报张贴点与黑胶唱片领取点。7号馆 2 楼设有集中领取箱、安全工具免费借用处及作品回收箱；多次元设计实验栋 2 楼为 11 月成果展与沙龙会场。",
                ja: "大橋キャンパス内に計6箇所のポスター掲示・レコード配布スポットを設置しています。7号館2階には集中配布BOX・安全具無料レンタル・作品回収BOXが備わっており、多次元デザイン実験棟2階は11月の成果展会場です。",
                en: "A total of 6 poster and record pickup spots are located across Ohashi Campus. Building 7 2F serves as the central hub with safety tool loans and submission boxes, while the Multi-Dimensional Design Experimental Building 2F hosts the November exhibition.",
                'zh-TW': "大橋校區內共設有 6 處海報張貼點與黑膠唱片領取點。7號館 2 樓設有集中領取箱、安全工具免費借用處及作品回收箱；多次元設計實驗棟 2 樓為 11 月成果展與沙龍會場。",
                fi: "Ohashin kampuksella on 6 juliste- ja vinyylinnoutopistettä. Rakennuksen 7 toinen kerros toimii pääkeskuksena (työkalulainaus ja palautuslaatikko), ja Moniulotteisen suunnittelun kokeilurakennuksen toisessa kerroksessa järjestetään marraskuun näyttely."
            },
            floor: { zh: "大桥校区全域", ja: "キャンパス各棟", en: "Campus-wide", 'zh-TW': "大橋校區全域", fi: "Koko kampus" },
            items: { zh: "宣传海报 · 实体EP唱片 · 安全指南腰封 · 集中发放点 · 工具借用", ja: "公式ポスター · EPレコード実物 · 安全指南帯 · 集中配布BOX · 工具レンタル", en: "Official Posters · Vinyl Records · Safety Obi Band · Central Pickup Box · Safety Tools", 'zh-TW': "宣傳海報 · 實體EP唱片 · 安全指南腰封 · 集中發放點 · 工具借用", fi: "Julisteet · Vinyylilevyt · Turvallisuusnauha · Noutolaatikko · Työkalulainaus" },
        },
        "bldg-7-hub": {
            tag: { zh: "🌟 核心物资与服务枢纽", ja: "🌟 総合拠点・集中配布＆安全具貸出", en: "🌟 Primary Hub & Safety Loan", 'zh-TW': "🌟 核心物資與服務樞紐", fi: "🌟 Päänoutopiste & Työkalulainaus" },
            tagType: "badge-hub",
            title: { zh: "7号馆 2F MEDIA STUDIO 房间前", ja: "7号館 2F MEDIA STUDIO 部屋前", en: "Building 7, 2F (In front of MEDIA STUDIO)", 'zh-TW': "7號館 2F MEDIA STUDIO 房間前", fi: "Rakennus 7, 2. krs (MEDIA STUDIO)" },
            desc: {
                zh: "【核心服务点】设有官方黑胶唱片集中领取盒（配布BOX），常备充足唱片；同时提供护目镜、防割手套、DS2防尘口罩与安全P钩刀的无偿短期借用；亦为 11 月 10 日前实物作品的最终提交回收箱所在处。",
                ja: "【メイン拠点】予備レコードを常備する「集中配布ボックス」を設置。保護メガネ・耐切創手袋・DS2防塵マスク・Pカッターの無償レンタル（プランB）を実施。11月10日締切の実物作品回収ボックスもここに設置されます。",
                en: "【Main Hub】Features the Central Pickup Box stocked with extra records, free short-term loan of safety tool kits (goggles, cut-resistant gloves, DS2 masks, acrylic cutters), and the physical submission drop box.",
                'zh-TW': "【核心服務點】設有官方黑膠唱片集中領取盒（配布BOX），常備充足唱片；同時提供護目鏡、防割手套、DS2防塵口罩與安全P鉤刀的無償短期借用；亦為 11 月 10 日前實物作品的最終提交回收箱所在處。",
                fi: "【Pääkeskus】Sisältää vinyylien päänoutolaatikon, turvavarusteiden (suojalasit, viiltosuojakäsineet, DS2-maskit, leikkurit) ilmaisen lainauksen ja fyysisten töiden palautuslaatikon."
            },
            floor: { zh: "7号馆 2 楼 (2F) MEDIA STUDIO 房间正前方", ja: "7号館 2階 MEDIA STUDIO 部屋前", en: "Building 7, 2nd Floor, in front of MEDIA STUDIO", 'zh-TW': "7號館 2 樓 (2F) MEDIA STUDIO 房間正前方", fi: "Rakennus 7, 2. krs, MEDIA STUDIOn edessä" },
            items: { zh: "黑胶唱片集中领取盒 · 安全防护工具包无偿借用 · 实物作品提交回收箱", ja: "レコード集中配布BOX · 安全保護具無償レンタル · 実物作品回収BOX", en: "Central Record Pickup Box · Free Safety Tool Kit Loans · Final Submission Drop Box", 'zh-TW': "黑膠唱片集中領取盒 · 安全防護工具包無償借用 · 實物作品提交回收箱", fi: "Vinyylien noutolaatikko · Turvatyökalujen lainaus · Töiden palautuslaatikko" },
        },
        "bldg-1": {
            tag: { zh: "📍 常规张贴点", ja: "📍 ポスター掲示スポット", en: "📍 Poster Spot", 'zh-TW': "📍 常規張貼點", fi: "📍 Julistepiste" },
            tagType: "default",
            title: { zh: "1号馆 2F 走廊布告栏 (1号館 2F 掲示板)", ja: "1号館 2F 掲示板", en: "Building 1, 2F Bulletin Board", 'zh-TW': "1號館 2F 走廊佈告欄", fi: "Rakennus 1, 2. krs Ilmoitustaulu" },
            desc: {
                zh: "正门进入直行右侧 1 号馆（事务・大讲义栋）2 楼布告栏。海报背面挂载有 1 张附带双语安全腰封的 EP 黑胶唱片，取下即可直接带走创作。",
                ja: "正門を入ってすぐ右手の1号館（事務・大講義棟）2階掲示板。ポスター裏面に安全帯付きEPレコードが添付されており、そのままお持ち帰りいただけます。",
                en: "Located on the 2F bulletin board in Building 1 (Administration & Lecture Hall). An EP vinyl record with safety obi band is attached to the back of the poster.",
                'zh-TW': "正門進入直行右側 1 號館（事務・大講義棟）2 樓佈告欄。海報背面掛載有 1 張附帶雙語安全腰封的 EP 黑膠唱片，取下即可直接帶走創作。",
                fi: "Sijaitsee rakennuksen 1 toisen kerroksen ilmoitustaululla. Julisteen taustalla on EP-vinyylilevy turvanauhalla."
            },
            floor: { zh: "1 号馆 2 楼 (2F)", ja: "1号館 2階", en: "Building 1, 2nd Floor", 'zh-TW': "1 號館 2 樓 (2F)", fi: "Rakennus 1, 2. krs" },
            items: { zh: "活动宣传海报 · 实体 EP 唱片（背面取用） · 安全指南腰封", ja: "公式ポスター · 実物EPレコード · 安全加工ガイドライン帯", en: "Official Poster · Physical EP Record · Safety Guide Obi Band", 'zh-TW': "活動宣傳海報 · 實體 EP 唱片（背面取用） · 安全指南腰封", fi: "Juliste · EP-vinyyli · Turvallisuusohje" },
        },
        "bldg-2": {
            tag: { zh: "📍 常规张贴点", ja: "📍 ポスター掲示スポット", en: "📍 Poster Spot", 'zh-TW': "📍 常規張貼點", fi: "📍 Julistepiste" },
            tagType: "default",
            title: { zh: "2号馆 2F 走廊布告栏 (2号館 2F 掲示板)", ja: "2号館 2F 掲示板", en: "Building 2, 2F Bulletin Board", 'zh-TW': "2號館 2F 走廊佈告欄", fi: "Rakennus 2, 2. krs Ilmoitustaulu" },
            desc: {
                zh: "中庭北侧 2 号馆（音响设计・基础教学大楼）2 楼布告栏。海报背面附带实体 EP 唱片，如已被取完可前往 7 号馆 2 楼集中领取。",
                ja: "中庭北側の2号館（音響設計・基礎教育棟）2階掲示板。ポスター裏面にEPレコードが添付されています。在庫がない場合は7号館2階をご利用ください。",
                en: "Located on the 2F bulletin board in Building 2 (Acoustic Design & Lectures, north of courtyard). Discarded vinyl record attached to poster back.",
                'zh-TW': "中庭北側 2 號館（音響設計・基礎教學大樓）2 樓佈告欄。海報背面附帶實體 EP 唱片，如已被取完可前往 7 號館 2 樓集中領取。",
                fi: "Sijaitsee rakennuksen 2 toisen kerroksen ilmoitustaululla. Julisteen taustalla on vinyylilevy."
            },
            floor: { zh: "2 号馆 2 楼 (2F)", ja: "2号館 2階", en: "Building 2, 2nd Floor", 'zh-TW': "2 號館 2 樓 (2F)", fi: "Rakennus 2, 2. krs" },
            items: { zh: "活动宣传海报 · 实体 EP 唱片（背面取用） · 安全指南腰封", ja: "公式ポスター · 実物EPレコード · 安全加工ガイドライン帯", en: "Official Poster · Physical EP Record · Safety Guide Obi Band", 'zh-TW': "活動宣傳海報 · 實體 EP 唱片（背面取用） · 安全指南腰封", fi: "Juliste · EP-vinyyli · Turvallisuusohje" },
        },
        "bldg-5": {
            tag: { zh: "📍 常规张贴点", ja: "📍 ポスター掲示スポット", en: "📍 Poster Spot", 'zh-TW': "📍 常規张贴点", fi: "📍 Julistepiste" },
            tagType: "default",
            title: { zh: "5号馆 1F 大厅布告栏 (5号館 1F 掲示板)", ja: "5号館 1F 掲示板", en: "Building 5, 1F Bulletin Board", 'zh-TW': "5號館 1F 大廳佈告欄", fi: "Rakennus 5, 1. krs Ilmoitustaulu" },
            desc: {
                zh: "中庭南侧 5 号馆（视觉传达・环境设计栋）1 楼入口公共布告栏。海报背面附有 EP 唱片与双语安全告知单。",
                ja: "中庭南側の5号館（視覚情報・環境設計棟）1階エントランス掲示板。ポスター裏面にEPレコードと安全帯を添付しています。",
                en: "Located on the 1F entrance bulletin board in Building 5 (Visual Communication & Environmental Design).",
                'zh-TW': "中庭南側 5 號館（視覺傳達・環境設計棟）1 樓入口公共佈告欄。海報背面附有 EP 唱片與雙語安全告知單。",
                fi: "Sijaitsee rakennuksen 5 ensimmäisen kerroksen aulassa."
            },
            floor: { zh: "5 号馆 1 楼 (1F)", ja: "5号館 1階", en: "Building 5, 1st Floor", 'zh-TW': "5 號館 1 樓 (1F)", fi: "Rakennus 5, 1. krs" },
            items: { zh: "活动宣传海报 · 实体 EP 唱片（背面取用） · 安全指南腰封", ja: "公式ポスター · 実物EPレコード · 安全加工ガイドライン帯", en: "Official Poster · Physical EP Record · Safety Guide Obi Band", 'zh-TW': "活動宣傳海報 · 實體 EP 唱片（背面取用） · 安全指南腰封", fi: "Juliste · EP-vinyyli · Turvallisuusohje" },
        },
        "bldg-7-1f": {
            tag: { zh: "📍 常规张贴点", ja: "📍 ポスター掲示スポット", en: "📍 Poster Spot", 'zh-TW': "📍 常規張貼點", fi: "📍 Julistepiste" },
            tagType: "default",
            title: { zh: "7号馆 1F 走廊布告栏 (7号館 1F 掲示板)", ja: "7号館 1F 掲示板", en: "Building 7, 1F Bulletin Board", 'zh-TW': "7號館 1F 走廊佈告欄", fi: "Rakennus 7, 1. krs Ilmoitustaulu" },
            desc: {
                zh: "7 号馆（信息媒体栋）1 楼走廊布告栏。如需更多唱片或借用安全工具，请前往同栋 2 楼 MEDIA STUDIO 前。",
                ja: "7号館（情報処理教育・メディア棟）1階掲示板。追加レコードや工具レンタルは2階MEDIA STUDIO前をご利用ください。",
                en: "Located on the 1F bulletin board in Building 7 (Information Media Hall). Head upstairs to 2F for the central tool loan and pickup box.",
                'zh-TW': "7號館（資訊媒體棟）1 樓走廊佈告欄。如需更多唱片或借用安全工具，請前往同棟 2 樓 MEDIA STUDIO 前。",
                fi: "Sijaitsee rakennuksen 7 ensimmäisessä kerroksessa."
            },
            floor: { zh: "7 号馆 1 楼 (1F)", ja: "7号館 1階", en: "Building 7, 1st Floor", 'zh-TW': "7 號館 1 樓 (1F)", fi: "Rakennus 7, 1. krs" },
            items: { zh: "活动宣传海报 · 实体 EP 唱片（背面取用） · 安全指南腰封", ja: "公式ポスター · 実物EPレコード · 安全加工ガイドライン帯", en: "Official Poster · Physical EP Record · Safety Guide Obi Band", 'zh-TW': "活動宣傳海報 · 實體 EP 唱片（背面取用） · 安全指南腰封", fi: "Juliste · EP-vinyyli · Turvallisuusohje" },
        },
        "library": {
            tag: { zh: "📍 常规张贴点", ja: "📍 ポスター掲示スポット", en: "📍 Poster Spot", 'zh-TW': "📍 常規張貼點", fi: "📍 Julistepiste" },
            tagType: "default",
            title: { zh: "艺术工学图书馆 1F 馆内布告栏 (図書館 掲示板)", ja: "芸術工学図書館 1F 掲示板", en: "Design Library, 1F Bulletin Board", 'zh-TW': "藝術工學圖書館 1F 館內佈告欄", fi: "Muotoilukirjasto, 1. krs Ilmoitustaulu" },
            desc: {
                zh: "大桥校区艺术工学图书馆 1 楼入口布告栏。海报背面附有一张废旧黑胶唱片，可直接取下用于创作。",
                ja: "芸術工学図書館1階エントランスの掲示板。裏面にEPレコードが添付されています。",
                en: "Located on the 1F entrance bulletin board inside Kyushu University Design Library. Includes record attached to poster back.",
                'zh-TW': "大橋校區藝術工學圖書館 1 樓入口佈告欄。海報背面附有一張廢舊黑膠唱片，可直接取下用於創作。",
                fi: "Sijaitsee muotoilukirjaston 1. kerroksen ilmoitustaululla."
            },
            floor: { zh: "艺术工学图书馆 1 楼 (1F)", ja: "芸術工学図書館 1階", en: "Design Library, 1st Floor", 'zh-TW': "藝術工學圖書館 1 樓 (1F)", fi: "Muotoilukirjasto, 1. krs" },
            items: { zh: "活动宣传海报 · 实体 EP 唱片（背面取用） · 安全指南腰封", ja: "公式ポスター · 実物EPレコード · 安全加工ガイドライン帯", en: "Official Poster · Physical EP Record · Safety Guide Obi Band", 'zh-TW': "活動宣傳海報 · 實體 EP 唱片（背面取用） · 安全指南腰封", fi: "Juliste · EP-vinyyli · Turvallisuusohje" },
        },
        "bldg-8": {
            tag: { zh: "🌟 11月成果展与沙龙主会场", ja: "🌟 11月成果展示会＆サロン会場", en: "🌟 Nov Exhibition & Salon Venue", 'zh-TW': "🌟 11月成果展與沙龍主會場", fi: "🌟 Marraskuun näyttelytila" },
            tagType: "badge-exhibit",
            title: { zh: "多次元设计实验栋 2F Studio 201", ja: "多次元デザイン実験棟 2F スタジオ201", en: "Multi-Dimensional Design Experimental Building, 2F, Studio 201", 'zh-TW': "多次元設計實驗棟 2F Studio 201", fi: "Moniulotteisen suunnittelun kokeilurakennus, 2. krs (Studio 201)" },
            desc: {
                zh: "【展览与沙龙会场】2026年11月20日 - 25日 线下成果展主办地（开放市民与师生参观）；11月15日前后交流沙龙亦在此举行。",
                ja: "【成果展・サロン本会場】2026年11月20日〜25日の成果展示会メイン会場。11月中旬の交流サロンもここで開催されます。",
                en: "【Main Venue】The physical exhibition venue (Nov 20-25, 2026, open to public) and participant networking salon.",
                'zh-TW': "【展覽與沙龍會場】2026年11月20日 - 25日 線下成果展主辦地（開放市民與師生參觀）；11月15日前後交流沙龍亦在此舉行。",
                fi: "【Päänäyttelytila】RERE-CORDS-näyttely (20.–25.11.2026) ja verkostoitumissalonki."
            },
            floor: { zh: "多次元设计实验栋 2 楼 Studio 201", ja: "多次元デザイン実験棟 2階 スタジオ201", en: "Multi-Dimensional Design Experimental Building, 2nd Floor, Studio 201", 'zh-TW': "多次元設計實驗棟 2 樓 Studio 201", fi: "Moniulotteisen suunnittelun kokeilurakennus, 2. krs, Studio 201" },
            items: { zh: "实体与数字作品展示 · 现场投票与互动 · 评委沙龙与颁奖会", ja: "作品展示ブース · 来場者投票 · 講評＆交流サロン", en: "Artwork Exhibition · Audience Voting · Review & Awards Salon", 'zh-TW': "實體與數位作品展示 · 現場投票與互動 · 評委沙龍與頒獎會", fi: "Teosnäyttely · Yleisöäänestys · Palkintotilaisuus" },
        }
    };

    const CAMPUS_MAP_LABELS = {
        "bldg-7-hub": {
            zh: "7号馆 · 2F\n集中领取",
            ja: "7号館 · 2F\n集中配布",
            en: "Bldg 7 · 2F\nCentral pickup",
            'zh-TW': "7號館 · 2F\n集中領取",
            fi: "Rakennus 7 · 2F\nNoutopiste"
        },
        "bldg-1": {
            zh: "1号馆 · 2F\n布告栏",
            ja: "1号館 · 2F\n掲示板",
            en: "Bldg 1 · 2F\nBulletin board",
            'zh-TW': "1號館 · 2F\n佈告欄",
            fi: "Rakennus 1 · 2F\nIlmoitustaulu"
        },
        "bldg-2": {
            zh: "2号馆 · 2F\n布告栏",
            ja: "2号館 · 2F\n掲示板",
            en: "Bldg 2 · 2F\nBulletin board",
            'zh-TW': "2號館 · 2F\n佈告欄",
            fi: "Rakennus 2 · 2F\nIlmoitustaulu"
        },
        "bldg-5": {
            zh: "5号馆 · 1F\n布告栏",
            ja: "5号館 · 1F\n掲示板",
            en: "Bldg 5 · 1F\nBulletin board",
            'zh-TW': "5號館 · 1F\n佈告欄",
            fi: "Rakennus 5 · 1F\nIlmoitustaulu"
        },
        "bldg-7-1f": {
            zh: "7号馆 · 1F\n布告栏",
            ja: "7号館 · 1F\n掲示板",
            en: "Bldg 7 · 1F\nBulletin board",
            'zh-TW': "7號館 · 1F\n佈告欄",
            fi: "Rakennus 7 · 1F\nIlmoitustaulu"
        },
        library: {
            zh: "图书馆 · 1F\n布告栏",
            ja: "図書館 · 1F\n掲示板",
            en: "Library · 1F\nBulletin board",
            'zh-TW': "圖書館 · 1F\n佈告欄",
            fi: "Kirjasto · 1F\nIlmoitustaulu"
        },
        "bldg-8": {
            zh: "多次元 · 2F\n成果展",
            ja: "多次元デザイン実験棟 · 2F\n成果展示",
            en: "Multi-Dimensional Building · 2F\nExhibition",
            'zh-TW': "多次元 · 2F\n成果展",
            fi: "Moniulotteinen rakennus · 2F\nNäyttely"
        }
    };

    const CAMPUS_LOCATION_PHOTOS = [
        {
            id: 'b1',
            locationKey: 'bldg-1',
            src: './素材/地点/b1.JPG',
            brightness: '1.08',
            caption: { zh: '1号馆 · 2F', ja: '1号館 · 2F', en: 'Bldg 1 · 2F', 'zh-TW': '1號館 · 2F', fi: 'Rakennus 1 · 2F' },
            alt: { zh: '1号馆二楼海报张贴点现场照片', ja: '1号館2階ポスター掲示場所の写真', en: 'Photo of the Building 1, 2F poster location', 'zh-TW': '1號館二樓海報張貼點現場照片', fi: 'Kuva rakennuksen 1 toisen kerroksen julistepisteestä' }
        },
        {
            id: 'b2',
            locationKey: 'bldg-2',
            src: './素材/地点/b2.JPG',
            brightness: '1.12',
            caption: { zh: '2号馆 · 2F', ja: '2号館 · 2F', en: 'Bldg 2 · 2F', 'zh-TW': '2號館 · 2F', fi: 'Rakennus 2 · 2F' },
            alt: { zh: '2号馆二楼海报张贴点现场照片', ja: '2号館2階ポスター掲示場所の写真', en: 'Photo of the Building 2, 2F poster location', 'zh-TW': '2號館二樓海報張貼點現場照片', fi: 'Kuva rakennuksen 2 toisen kerroksen julistepisteestä' }
        },
        {
            id: 'b5',
            locationKey: 'bldg-5',
            src: './素材/地点/b5.JPG',
            brightness: '1.1',
            caption: { zh: '5号馆 · 1F', ja: '5号館 · 1F', en: 'Bldg 5 · 1F', 'zh-TW': '5號館 · 1F', fi: 'Rakennus 5 · 1F' },
            alt: { zh: '5号馆一楼海报张贴点现场照片', ja: '5号館1階ポスター掲示場所の写真', en: 'Photo of the Building 5, 1F poster location', 'zh-TW': '5號館一樓海報張貼點現場照片', fi: 'Kuva rakennuksen 5 ensimmäisen kerroksen julistepisteestä' }
        },
        {
            id: 'b7-1f',
            locationKey: 'bldg-7-1f',
            src: './素材/地点/b7-1f.JPG',
            brightness: '1.14',
            caption: { zh: '7号馆 · 1F', ja: '7号館 · 1F', en: 'Bldg 7 · 1F', 'zh-TW': '7號館 · 1F', fi: 'Rakennus 7 · 1F' },
            alt: { zh: '7号馆一楼海报张贴点现场照片', ja: '7号館1階ポスター掲示場所の写真', en: 'Photo of the Building 7, 1F poster location', 'zh-TW': '7號館一樓海報張貼點現場照片', fi: 'Kuva rakennuksen 7 ensimmäisen kerroksen julistepisteestä' }
        },
        {
            id: 'b7-2f',
            locationKey: 'bldg-7-hub',
            src: './素材/地点/b7-2f.JPG',
            brightness: '1.16',
            caption: { zh: '7号馆 · 2F', ja: '7号館 · 2F', en: 'Bldg 7 · 2F', 'zh-TW': '7號館 · 2F', fi: 'Rakennus 7 · 2F' },
            alt: { zh: '7号馆二楼海报与唱片领取点现场照片', ja: '7号館2階ポスター・レコード配布場所の写真', en: 'Photo of the Building 7, 2F poster and record pickup location', 'zh-TW': '7號館二樓海報與唱片領取點現場照片', fi: 'Kuva rakennuksen 7 toisen kerroksen juliste- ja levynoutopisteestä' }
        }
    ];

    function getCampusMapLabel(locationKey, lang = currentLang) {
        const labels = CAMPUS_MAP_LABELS[locationKey] || {};
        return labels[lang] || labels.en || locationKey;
    }

    function updateMapPhotoPanel(locationKey, lang = currentLang) {
        const panel = document.getElementById('map-photo-panel');
        const grid = document.getElementById('map-photo-grid');
        if (!panel || !grid) return;

        const photo = CAMPUS_LOCATION_PHOTOS.find((candidate) => candidate.locationKey === locationKey);
        panel.hidden = !photo;
        grid.replaceChildren();
        if (!photo) return;

        const figure = document.createElement('figure');
        figure.className = 'map-photo-item is-selected';
        figure.dataset.photoId = photo.id;
        figure.dataset.photoLocation = photo.locationKey;

        const frame = document.createElement('div');
        frame.className = 'map-photo-frame';

        const image = document.createElement('img');
        image.src = photo.src;
        image.alt = photo.alt[lang] || photo.alt.en || '';
        image.width = 4032;
        image.height = 3024;
        image.loading = 'lazy';
        image.decoding = 'async';
        image.style.setProperty('--map-photo-brightness', photo.brightness);
        frame.append(image);

        const caption = document.createElement('figcaption');
        caption.textContent = photo.caption[lang] || photo.caption.en || '';
        figure.append(frame, caption);
        grid.append(figure);
    }


    let activeMapLocationKey = 'all';

    function updateMapDetailPanel(key, lang = currentLang) {
        const data = CAMPUS_LOCATIONS[key] || CAMPUS_LOCATIONS.all;
        const tagEl = document.getElementById('map-detail-tag');
        const titleEl = document.getElementById('map-detail-title');
        const descEl = document.getElementById('map-detail-desc');
        const floorEl = document.getElementById('map-meta-floor');
        const itemsEl = document.getElementById('map-meta-items');

        if (tagEl) {
            tagEl.className = 'detail-badge ' + (data.tagType || '');
            tagEl.textContent = data.tag[lang] || data.tag.en || '';
        }
        if (titleEl) titleEl.textContent = data.title[lang] || data.title.en || '';
        if (descEl) descEl.textContent = data.desc[lang] || data.desc.en || '';
        if (floorEl) floorEl.textContent = data.floor[lang] || data.floor.en || '';
        if (itemsEl) itemsEl.textContent = data.items[lang] || data.items.en || '';

        document.querySelectorAll('.map-location-button').forEach((button) => {
            const isActive = button.dataset.location === key;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });

        updateMapPhotoPanel(key, lang);

    }

    window.updateMapLanguageDetails = function(lang) {
        updateMapDetailPanel(activeMapLocationKey, lang);
        if (typeof window.updateCampusMapLabels === 'function') {
            window.updateCampusMapLabels(lang);
        }
    };

    function initCampus3DMap() {
        const viewport = document.getElementById('campus-3d-viewport');
        const loadingIndicator = document.getElementById('map-loading-indicator');
        function createCampusLayout(source) {
            const buildingIds = new Set(source.buildings.map((building) => building.id));
            return {
                ...source,
                buildings: source.buildings.filter((building) => Array.isArray(building.shape) && building.shape.length >= 3),
                markers: source.markers.filter((marker) => buildingIds.has(marker.buildingId))
            };
        }

        const campusMap = createCampusLayout(window.RERE_CORDS_CAMPUS_MAP);

        if (!viewport || !campusMap || typeof THREE === 'undefined') return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xFFFFFF);

        const width = viewport.clientWidth || 900;
        const height = viewport.clientHeight || 520;
        const camera = new THREE.PerspectiveCamera(31, width / height, 1, 600);
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance'
        });

        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.NoToneMapping;
        viewport.appendChild(renderer.domElement);

        let controls = null;
        if (typeof THREE.OrbitControls !== 'undefined') {
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            // Keep camera movement deterministic; location selections are the only view changes.
            controls.enabled = false;
            controls.enableRotate = false;
            controls.enableZoom = false;
            controls.enablePan = false;
            controls.enableDamping = true;
            controls.dampingFactor = 0.07;
            controls.minDistance = 58;
            controls.maxDistance = 270;
            controls.maxPolarAngle = Math.PI / 2.16;
        }

        const materials = {
            ground: new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.95 }),
            path: new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.94 }),
            lawn: new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.96 }),
            field: new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.96 }),
            tennis: new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.94 }),
            water: new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.84 }),
            building: new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.84 }),
            contextBuilding: new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.9 }),
            hubBuilding: new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.82 }),
            exhibitBuilding: new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.82 }),
            line: new THREE.LineBasicMaterial({ color: 0xA7A7A7, transparent: true, opacity: 0.72 }),
            treeTrunk: new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.94 }),
            treeCanopy: new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.95 }),
            markerPoster: new THREE.MeshStandardMaterial({ color: 0x171717, roughness: 0.5, metalness: 0.08 }),
            markerHub: new THREE.MeshStandardMaterial({ color: 0x526647, roughness: 0.46, metalness: 0.06 }),
            markerExhibit: new THREE.MeshStandardMaterial({ color: 0xC15535, roughness: 0.46, metalness: 0.06 }),
            markerCenter: new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.82 })
        };

        function shapeFromPoints(points) {
            const shape = new THREE.Shape();
            points.forEach(([x, z], index) => {
                const shapeY = -z;
                if (index === 0) shape.moveTo(x, shapeY);
                else shape.lineTo(x, shapeY);
            });
            shape.closePath();
            return shape;
        }

        function createPlanShape(points, material, y = 0, depth = 0) {
            const geometry = depth > 0
                ? new THREE.ExtrudeGeometry(shapeFromPoints(points), { depth, bevelEnabled: false })
                : new THREE.ShapeGeometry(shapeFromPoints(points));
            geometry.rotateX(-Math.PI / 2);
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.y = y;
            mesh.receiveShadow = true;
            return mesh;
        }

        function createCirclePlane(center, radius, material, y = 0) {
            const mesh = new THREE.Mesh(new THREE.CircleGeometry(radius, 48), material);
            mesh.rotation.x = -Math.PI / 2;
            mesh.position.set(center.x, y, center.z);
            mesh.receiveShadow = true;
            return mesh;
        }

        function createReferencePlan() {
            const reference = campusMap.reference;
            if (!reference?.image || reference.render === false) return;

            const material = new THREE.MeshBasicMaterial({
                color: 0xFFFFFF,
                transparent: true,
                opacity: reference.opacity || 0.06,
                depthWrite: false
            });
            const plane = new THREE.Mesh(
                new THREE.PlaneGeometry(reference.worldWidth, reference.worldDepth),
                material
            );
            plane.rotation.x = -Math.PI / 2;
            plane.position.y = 0.705;
            plane.renderOrder = 0;
            scene.add(plane);

            new THREE.TextureLoader().load(reference.image, (texture) => {
                texture.colorSpace = THREE.SRGBColorSpace;
                material.map = texture;
                material.needsUpdate = true;
            });
        }

        function createMapLabelTexture(locationKey, lang = currentLang) {
            const lines = getCampusMapLabel(locationKey, lang).split('\n');
            const canvas = document.createElement('canvas');
            canvas.width = 360;
            canvas.height = lines.length > 1 ? 112 : 76;
            const context = canvas.getContext('2d');
            context.fillStyle = 'rgba(255, 255, 255, 0.94)';
            context.fillRect(4, 4, canvas.width - 8, canvas.height - 8);
            context.strokeStyle = 'rgba(23, 23, 23, 0.3)';
            context.lineWidth = 2;
            context.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);
            context.fillStyle = '#171717';
            context.font = '600 27px Alegreya Sans, Arial, sans-serif';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            const lineHeight = 31;
            const startY = canvas.height / 2 - ((lines.length - 1) * lineHeight) / 2;
            lines.forEach((line, index) => context.fillText(line, canvas.width / 2, startY + index * lineHeight));
            return {
                texture: new THREE.CanvasTexture(canvas),
                width: lines.some((line) => line.length > 12) ? 14.5 : 11.5,
                height: lines.length > 1 ? 4.15 : 3.2
            };
        }

        function createFloatingLocationLabel(marker, stemHeight) {
            const labelData = createMapLabelTexture(marker.locationKey);
            const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
                map: labelData.texture,
                transparent: true,
                depthTest: false
            }));
            sprite.scale.set(labelData.width, labelData.height, 1);
            // The label is a child of the marker group, so keep it in group-local X/Z.
            const labelLift = marker.locationKey === 'bldg-7-hub' ? 2.4 : 0;
            sprite.position.set(0, 1 + stemHeight + 4.6 + labelLift, 0);
            sprite.renderOrder = 5;
            sprite.userData = { id: marker.locationKey, isMapLabel: true };
            labelSpritesByLocation[marker.locationKey] = sprite;
            interactiveObjects.push(sprite);
            return sprite;
        }

        function createExtrudedBuilding(building) {
            const material = building.tone === 'hub'
                ? materials.hubBuilding
                : building.tone === 'exhibit'
                    ? materials.exhibitBuilding
                    : building.tone === 'context'
                        ? materials.contextBuilding
                        : materials.building;
            const group = new THREE.Group();
            const footprint = building.shape.reduce((bounds, [x, z]) => ({
                minX: Math.min(bounds.minX, x),
                maxX: Math.max(bounds.maxX, x),
                minZ: Math.min(bounds.minZ, z),
                maxZ: Math.max(bounds.maxZ, z)
            }), { minX: Infinity, maxX: -Infinity, minZ: Infinity, maxZ: -Infinity });
            const width = footprint.maxX - footprint.minX;
            const depth = footprint.maxZ - footprint.minZ;
            const centerX = (footprint.minX + footprint.maxX) / 2;
            const centerZ = (footprint.minZ + footprint.maxZ) / 2;
            const mesh = new THREE.Mesh(
                new THREE.BoxGeometry(width, building.height, depth),
                material
            );
            mesh.position.set(centerX, 0.72 + building.height / 2, centerZ);
            mesh.castShadow = true;
            group.add(mesh);

            const edges = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry), materials.line);
            edges.position.copy(mesh.position);
            group.add(edges);

            group.userData = { id: building.id, footprint, height: building.height, isBuilding: true };
            mesh.userData = { id: building.id, group, isBuilding: true };
            interactiveObjects.push(mesh);
            buildingsById[building.id] = { ...building, footprint, group };
            scene.add(group);
            return group;
        }

        function createFieldLines(center, size) {
            const points = [
                new THREE.Vector3(center.x - size.x / 2, 0.91, center.z - size.z / 2),
                new THREE.Vector3(center.x + size.x / 2, 0.91, center.z - size.z / 2),
                new THREE.Vector3(center.x + size.x / 2, 0.91, center.z + size.z / 2),
                new THREE.Vector3(center.x - size.x / 2, 0.91, center.z + size.z / 2),
                new THREE.Vector3(center.x - size.x / 2, 0.91, center.z - size.z / 2),
                new THREE.Vector3(center.x, 0.91, center.z - size.z / 2),
                new THREE.Vector3(center.x, 0.91, center.z + size.z / 2),
                new THREE.Vector3(center.x, 0.91, center.z + size.z / 2),
                new THREE.Vector3(center.x, 0.91, center.z - size.z / 2)
            ];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({
                color: 0xC8C8C8,
                transparent: true,
                opacity: 0.76
            }));
            scene.add(line);
        }

        function createTreeGroup(tree) {
            const group = new THREE.Group();
            const scale = tree.scale || 1;
            const trunk = new THREE.Mesh(
                new THREE.CylinderGeometry(0.34 * scale, 0.5 * scale, 2.2 * scale, 7),
                materials.treeTrunk
            );
            trunk.position.y = 1.1 * scale;
            trunk.castShadow = true;
            group.add(trunk);

            const canopy = new THREE.Mesh(
                new THREE.SphereGeometry(1.9 * scale, 16, 10),
                materials.treeCanopy
            );
            canopy.position.y = 3.2 * scale;
            canopy.scale.set(1.18, 0.92, 1.08);
            canopy.castShadow = true;
            group.add(canopy);

            group.position.set(tree.x, 0.82, tree.z);
            scene.add(group);
        }

        function createLandmark(landmark) {
            if (landmark.type === 'field') {
                if (landmark.shape) {
                    const field = createPlanShape(landmark.shape, materials.field, 0.82, 0.12);
                    field.receiveShadow = true;
                    scene.add(field);
                    return;
                }
                const field = new THREE.Mesh(
                    new THREE.BoxGeometry(landmark.size.x, 0.18, landmark.size.z),
                    materials.field
                );
                field.position.set(landmark.center.x, 0.82, landmark.center.z);
                field.receiveShadow = true;
                scene.add(field);
                createFieldLines(landmark.center, {
                    x: landmark.size.x - 2,
                    z: landmark.size.z - 2
                });
                return;
            }

            if (landmark.type === 'tennis') {
                if (landmark.shape) {
                    const court = createPlanShape(landmark.shape, materials.tennis, 0.84, 0.1);
                    court.receiveShadow = true;
                    scene.add(court);
                    return;
                }
                const court = new THREE.Mesh(
                    new THREE.BoxGeometry(landmark.size.x, 0.16, landmark.size.z),
                    materials.tennis
                );
                court.position.set(landmark.center.x, 0.82, landmark.center.z);
                court.receiveShadow = true;
                scene.add(court);
                createFieldLines(landmark.center, {
                    x: landmark.size.x - 1.6,
                    z: landmark.size.z - 1.6
                });
                return;
            }

            if (landmark.type === 'circle') {
                const outer = createCirclePlane(landmark.center, landmark.radius + 2.2, materials.path, 0.81);
                const inner = createCirclePlane(landmark.center, landmark.radius, materials.lawn, 0.86);
                scene.add(outer, inner);
                return;
            }

            if (landmark.type === 'fountain') {
                const outer = new THREE.Mesh(
                    new THREE.CylinderGeometry(landmark.radius + 2.8, landmark.radius + 2.8, 0.18, 48),
                    materials.path
                );
                outer.position.set(landmark.center.x, 0.85, landmark.center.z);
                outer.receiveShadow = true;
                scene.add(outer);

                const basin = new THREE.Mesh(
                    new THREE.CylinderGeometry(landmark.radius, landmark.radius, 0.26, 48),
                    materials.water
                );
                basin.position.set(landmark.center.x, 0.98, landmark.center.z);
                scene.add(basin);

                const rim = new THREE.Mesh(
                    new THREE.TorusGeometry(landmark.radius + 0.15, 0.42, 8, 48),
                    materials.building
                );
                rim.rotation.x = Math.PI / 2;
                rim.position.set(landmark.center.x, 1.1, landmark.center.z);
                rim.castShadow = true;
                scene.add(rim);

                const nozzle = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.65, 0.9, 0.8, 16),
                    materials.water
                );
                nozzle.position.set(landmark.center.x, 1.38, landmark.center.z);
                scene.add(nozzle);
            }
        }

        const interactiveObjects = [];
        const buildingsById = {};
        const locationsByBuilding = {};
        const labelSpritesByLocation = {};

        const base = createPlanShape(campusMap.ground.boundary, materials.ground, 0, 0.7);
        base.receiveShadow = true;
        scene.add(base);
        createReferencePlan();

        campusMap.ground.paths.forEach((path) => {
            scene.add(createPlanShape(path.shape, materials.path, 0.73, 0.05));
        });
        campusMap.ground.lawns.forEach((lawn) => {
            scene.add(createPlanShape(lawn.shape, materials.lawn, 0.76, 0.06));
        });
        campusMap.landmarks.forEach(createLandmark);
        campusMap.trees.forEach(createTreeGroup);
        campusMap.buildings.forEach(createExtrudedBuilding);

        function getMarkerPosition(marker) {
            const building = buildingsById[marker.buildingId];
            if (!building) return { x: 0, z: 0, height: 0 };
            const { footprint } = building;
            const width = footprint.maxX - footprint.minX;
            const depth = footprint.maxZ - footprint.minZ;
            return {
                x: (footprint.minX + footprint.maxX) / 2 + width * (marker.offset.x || 0) / 2,
                z: (footprint.minZ + footprint.maxZ) / 2 + depth * (marker.offset.z || 0) / 2,
                height: building.height
            };
        }

        function createAnchoredMarker(marker) {
            const position = getMarkerPosition(marker);
            const color = marker.tone === 'hub'
                ? materials.markerHub
                : marker.tone === 'exhibit'
                    ? materials.markerExhibit
                    : materials.markerPoster;
            const group = new THREE.Group();

            const shadow = new THREE.Mesh(
                new THREE.RingGeometry(1.1, 1.55, 24),
                new THREE.MeshBasicMaterial({ color: 0xB8B8B8, transparent: true, opacity: 0.24, side: THREE.DoubleSide })
            );
            shadow.rotation.x = -Math.PI / 2;
            shadow.position.y = 0.96;
            group.add(shadow);

            const stemHeight = Math.max(8, position.height + 5);
            const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, stemHeight, 8), color);
            stem.position.y = 1 + stemHeight / 2;
            stem.castShadow = true;
            group.add(stem);

            const record = new THREE.Mesh(
                new THREE.CylinderGeometry(1.45, 1.45, 0.24, 32),
                color
            );
            record.position.y = 1 + stemHeight + 1.35;
            record.castShadow = true;
            record.userData = { id: marker.locationKey, group, isMarker: true };
            group.add(record);

            const recordLabel = new THREE.Mesh(
                new THREE.CylinderGeometry(0.34, 0.34, 0.28, 24),
                materials.markerCenter
            );
            recordLabel.position.y = record.position.y + 0.05;
            group.add(recordLabel);

            const recordRing = new THREE.Mesh(
                new THREE.TorusGeometry(0.6, 0.08, 6, 32),
                materials.markerCenter
            );
            recordRing.rotation.x = Math.PI / 2;
            recordRing.position.y = record.position.y + 0.18;
            group.add(recordRing);

            const label = createFloatingLocationLabel(marker, stemHeight);
            if (label) group.add(label);

            group.position.set(position.x, 0, position.z);
            group.userData = { id: marker.locationKey, baseY: 0, height: position.height };
            animatedPins.push(group);
            interactiveObjects.push(record);
            locationsByBuilding[marker.buildingId] = locationsByBuilding[marker.buildingId] || marker.locationKey;
            scene.add(group);
        }

        const animatedPins = [];
        campusMap.markers.forEach(createAnchoredMarker);

        window.updateCampusMapLabels = (lang) => {
            Object.entries(labelSpritesByLocation).forEach(([locationKey, sprite]) => {
                const labelData = createMapLabelTexture(locationKey, lang);
                if (sprite.material.map) sprite.material.map.dispose();
                sprite.material.map = labelData.texture;
                sprite.material.needsUpdate = true;
                sprite.scale.set(labelData.width, labelData.height, 1);
            });
        };
        window.updateCampusMapLabels(currentLang);

        const sunLight = new THREE.DirectionalLight(0xFFFFFF, 0.78);
        sunLight.position.set(-90, 130, -80);
        sunLight.castShadow = true;
        sunLight.shadow.mapSize.width = 1024;
        sunLight.shadow.mapSize.height = 1024;
        sunLight.shadow.camera.near = 10;
        sunLight.shadow.camera.far = 300;
        sunLight.shadow.camera.left = -115;
        sunLight.shadow.camera.right = 115;
        sunLight.shadow.camera.top = 115;
        sunLight.shadow.camera.bottom = -115;
        sunLight.shadow.bias = -0.0004;
        scene.add(sunLight);
        scene.add(new THREE.HemisphereLight(0xFFFFFF, 0xB8B8B8, 0.52));
        scene.add(new THREE.AmbientLight(0xF0F0F0, 0.18));

        let targetCamPos = { ...campusMap.views.overview.camera };
        let targetControlsPos = { ...campusMap.views.overview.target };
        let isTransitioning = false;
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function applyView(view) {
            const nextView = view || campusMap.views.overview;
            targetCamPos = { ...nextView.camera };
            targetControlsPos = { ...nextView.target };
            if (reducedMotion) {
                camera.position.set(targetCamPos.x, targetCamPos.y, targetCamPos.z);
                if (controls) controls.target.set(targetControlsPos.x, targetControlsPos.y, targetControlsPos.z);
                isTransitioning = false;
            } else {
                isTransitioning = true;
            }
        }

        function focusLocation(locationKey) {
            activeMapLocationKey = CAMPUS_LOCATIONS[locationKey] ? locationKey : 'all';
            updateMapDetailPanel(activeMapLocationKey, currentLang);
            applyView(campusMap.views[activeMapLocationKey] || campusMap.views.overview);
        }

        updateMapDetailPanel(activeMapLocationKey, currentLang);
        applyView(campusMap.views.overview);

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        function getPointerPos(event) {
            const rect = renderer.domElement.getBoundingClientRect();
            return {
                x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
                y: -((event.clientY - rect.top) / rect.height) * 2 + 1
            };
        }

        function getLocationForHit(hit) {
            const id = hit?.userData?.id;
            if (!id) return null;
            if (CAMPUS_LOCATIONS[id]) return id;
            return locationsByBuilding[id] || null;
        }

        renderer.domElement.addEventListener('pointermove', (event) => {
            const pointer = getPointerPos(event);
            mouse.set(pointer.x, pointer.y);
            raycaster.setFromCamera(mouse, camera);
            const intersections = raycaster.intersectObjects(interactiveObjects, false);
            renderer.domElement.style.cursor = intersections.length ? 'pointer' : 'default';
        });

        renderer.domElement.addEventListener('click', (event) => {
            const pointer = getPointerPos(event);
            mouse.set(pointer.x, pointer.y);
            raycaster.setFromCamera(mouse, camera);
            const intersections = raycaster.intersectObjects(interactiveObjects, false);
            const locationKey = getLocationForHit(intersections[0]?.object);
            if (locationKey) focusLocation(locationKey);
        });

        document.querySelectorAll('.map-location-button').forEach((button) => {
            button.addEventListener('click', () => focusLocation(button.dataset.location));
        });

        if (loadingIndicator) {
            window.setTimeout(() => loadingIndicator.classList.add('loaded'), 280);
        }

        const clock = new THREE.Clock();
        function animate() {
            requestAnimationFrame(animate);
            const elapsed = clock.getElapsedTime();

            if (!reducedMotion) {
                animatedPins.forEach((pin, index) => {
                    pin.position.y = Math.sin(elapsed * 2 + index * 0.65) * 0.12;
                    pin.rotation.y = Math.sin(elapsed * 0.35 + index) * 0.08;
                });
            }

            if (isTransitioning) {
                camera.position.x += (targetCamPos.x - camera.position.x) * 0.08;
                camera.position.y += (targetCamPos.y - camera.position.y) * 0.08;
                camera.position.z += (targetCamPos.z - camera.position.z) * 0.08;
                if (controls) {
                    controls.target.x += (targetControlsPos.x - controls.target.x) * 0.08;
                    controls.target.y += (targetControlsPos.y - controls.target.y) * 0.08;
                    controls.target.z += (targetControlsPos.z - controls.target.z) * 0.08;
                }
                if (Math.hypot(
                    targetCamPos.x - camera.position.x,
                    targetCamPos.y - camera.position.y,
                    targetCamPos.z - camera.position.z
                ) < 0.25) {
                    isTransitioning = false;
                }
            }

            if (controls) controls.update();
            renderer.render(scene, camera);
        }

        animate();

        function handleResize() {
            const nextWidth = viewport.clientWidth;
            const nextHeight = viewport.clientHeight;
            if (!nextWidth || !nextHeight) return;
            camera.aspect = nextWidth / nextHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(nextWidth, nextHeight);
        }

        window.addEventListener('resize', handleResize);
        if (typeof ResizeObserver !== 'undefined') {
            const mapResizeObserver = new ResizeObserver(handleResize);
            mapResizeObserver.observe(viewport);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCampus3DMap);
    } else {
        initCampus3DMap();
    }
});
