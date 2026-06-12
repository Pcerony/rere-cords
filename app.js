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
            "ja": "RERE-CORDS | 廃棄レコードのサステナブルデザイン展示",
            "en": "RERE-CORDS | Sustainable Design Exhibition with Discarded Vinyl Records"
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
            "ja": "廃棄アナログレコードの再利用によるサステナブルデザイン展示",
            "en": "Sustainable Design Exhibition with Recycled Vinyl Records"
        },
        "hero-description": {
            "zh": "面向九州大学大桥校区学生、校友及教职工征集创意。活动发放100张废旧唱片作为设计原料，通过裁切与热塑重构，探讨废弃塑料的可持续循环与设计实践方式。",
            "ja": "九州大学大橋キャンパスの学生・教職員・卒業生を対象とした、廃棄レコードの再利用デザイン企画。100枚の廃棄レコードを素材として無償提供し、設計・加工を通じたプラスチック循環を試みます。",
            "en": "We invite creative proposals from students, alumni, and staff at Kyushu University Ohashi Campus. Using 100 discarded vinyl records as design materials, we explore the sustainable cycling and design practices of waste plastics through cutting and thermoforming reconstruction."
        },
        "title-concept": {
            "zh": "企划理念",
            "ja": "企画コンセプト",
            "en": "Project Concept"
        },
        "lead-concept": {
            "zh": "将废旧黑胶唱片作为材料进行再利用与创作，探讨资源循环与环境友好设计的实践可能。",
            "ja": "再生不能となったアナログレコードをデザイン素材として再利用し、資源循環と環境配慮設計の実践可能性を提示します。",
            "en": "By reusing and creating with discarded vinyl records as materials, we explore the practical possibilities of resource cycling and eco-friendly design."
        },
        "card1-title": {
            "zh": "材料重构",
            "ja": "素材の再構成",
            "en": "Material Reconstruction"
        },
        "card1-text": {
            "zh": "分发100张废旧唱片，通过切割、热塑、重构等方式，设计制作为生活器具、饰品或艺术装置。",
            "ja": "廃棄レコード100枚を無償配布し、切断や熱加工などの手法を用いて、器物、アクセサリー、またはアート作品として再設計します。",
            "en": "Distribute 100 discarded vinyl records to be redesigned and processed into daily utensils, accessories, or art installations through cutting, thermoforming, and restructuring."
        },
        "details-title": {
            "zh": "材料循环与可持续设计",
            "ja": "素材循環とサステナブルデザイン",
            "en": "Material Cycling & Sustainable Design"
        },
        "details-text": {
            "zh": "黑胶唱片的主要成分为聚氯乙烯（PVC），属于难降解塑料。本项目通过设计介入，将100张废置唱片切割、热塑并重构为生活器具、饰品或艺术装置，以此探讨并实践联合国可持续发展目标（负责任的消费和生产）。",
            "ja": "アナログレコードの主原料であるポリ塩化ビニル（PVC）は、自然分解が極めて困難なプラスチックです。本プロジェクトは、提供された100枚の廃棄レコードを切断や熱加工などによって器物、アクセサリー、アート作品へ再構築し、国連の持続可能な開発目標（つくる責任 つかう責任）を実践的に検証します。",
            "en": "The main component of vinyl records is polyvinyl chloride (PVC), which is a non-biodegradable plastic. Through design intervention, this project cuts, thermoforms, and reconstructs 100 discarded records into daily utensils, accessories, or art installations to explore and practice the UN Sustainable Development Goal 12 (Responsible Consumption and Production)."
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
            "zh": "宣传海报",
            "ja": "公式ポスター",
            "en": "Official Poster"
        },
        "lead-poster": {
            "zh": "海报背面附有废旧黑胶唱片，师生可直接取下作为创作材料。",
            "ja": "ポスター裏面に実物のレコードを添付。希望者がその場で取り外して制作素材として持ち帰れる仕様にしています。",
            "en": "Physical posters placed on campus are equipped with real discarded vinyl records on the back, which can be directly taken off by teachers and students as raw materials."
        },
        "poster-card-title": {
            "zh": "实体海报与材料补充说明",
            "ja": "実物ポスターと素材の追加配布について",
            "en": "Physical Poster & Material Supplement Note"
        },
        "poster-card-text": {
            "zh": "* 注：通常在校园内张贴的实体海报背面均附有一张废旧黑胶唱片。如果海报背面的唱片已被取完，请寻找校园内的其他海报，或直接通过电子邮件联系我们申请补充材料。",
            "ja": "* 注：学内に掲示されている実物ポスターの裏面には、制作素材としてのアナログレコードが添付されています。もし裏面のレコードがすでに回収されている場合は、他所に掲示されたポスターを探すか、または事務局メールアドレスまで直接ご連絡の上、追加配布を申請してください。",
            "en": "* Note: Usually, the physical posters posted on campus are attached with a discarded vinyl record on the back. If the records on the posters have already been taken, please search for other posters on campus or contact us directly via email to request supplementary materials."
        },
        "title-apply": {
            "zh": "报名方法",
            "ja": "応募方法",
            "en": "How to Apply"
        },
        "lead-apply": {
            "zh": "请通过电子邮件提交您的设计意向及作品申请，具体要求与时间如下：",
            "ja": "メールにて制作の申請および作品データの送付を受け付けています。詳細な要件と期間は以下の通りです。",
            "en": "Please submit your design proposal and entry application via email. Detailed requirements and dates are as follows:"
        },
        "apply-method-title": {
            "zh": "递交方式",
            "ja": "提出方法",
            "en": "Submission Method"
        },
        "apply-method-text": {
            "zh": "将您的设计方案、作品图像/照片以及一段30秒的制作过程视频发送至电子邮箱：<a href='mailto:rerecords2026@gmail.com' class='apply-email'>rerecords2026@gmail.com</a>",
            "ja": "デザインコンセプト、作品写真、および30秒の制作プロセス動画を、事務局メールアドレス（<a href='mailto:rerecords2026@gmail.com' class='apply-email'>rerecords2026@gmail.com</a>）宛てにお送りください。",
            "en": "Send your design proposal, artwork images/photos, and a 30-second production video to the project email address: <a href='mailto:rerecords2026@gmail.com' class='apply-email'>rerecords2026@gmail.com</a>"
        },
        "apply-period-title": {
            "zh": "征集时间",
            "ja": "募集・申請期間",
            "en": "Application Period"
        },
        "apply-period-text": {
            "zh": "2026年5月1日 — 7月30日（在此期间进行参与申请及废旧唱片原材料的分发领取）",
            "ja": "2026年5月1日 — 7月30日（本期間中に参加申請を行い、制作素材である廃棄アナログレコードを受け取ることができます）",
            "en": "May 1 — July 30, 2026 (During this period, design applications are accepted and discarded vinyl records are distributed)"
        },
        "title-timeline": {
            "zh": "日程进程",
            "ja": "プロジェクトスケジュール",
            "en": "Project Schedule"
        },
        "lead-timeline": {
            "zh": "自2026年8月启动材料分发与自主制作，经作品评审后，于11月下旬在九州大学大桥校区举办成果展与沙龙。",
            "ja": "2026年8月より素材配布と自主制作を開始し、作品審査を経て、11月下旬に九州大学大橋キャンパスにて展示会とサロンを開催します。",
            "en": "Starting with material distribution and autonomous design in August 2026, followed by artwork evaluation, the final exhibition and exchange salon will take place at Kyushu University Ohashi Campus in late November."
        },
        "time-step1": {
            "zh": "2026年8月1日 - 10月31日",
            "ja": "8月1日 - 10月31日",
            "en": "August 1 - October 31, 2026"
        },
        "title-step1": {
            "zh": "分发与制作",
            "ja": "素材配布・制作",
            "en": "Distribution & Creation"
        },
        "text-step1": {
            "zh": "无偿领取废旧唱片，于制作周期内完成作品的设计与加工。",
            "ja": "廃棄レコードを無償で受け取り、制作期間内に作品の設計および加工を行います。",
            "en": "Receive discarded records free of charge, and complete design and processing within the creation period."
        },
        "time-step2": {
            "zh": "2026年11月1日 - 11月10日",
            "ja": "11月1日 - 11月10日",
            "en": "November 1 - November 10, 2026"
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
            "zh": "2026年12月1日 - 12月25日",
            "ja": "12月1日 - 12月25日",
            "en": "December 1 - December 25, 2026"
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
        }
    };

    let currentLang = localStorage.getItem('rere_cords_lang') || 'zh';

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
});
