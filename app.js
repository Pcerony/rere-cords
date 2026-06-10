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
            "zh": "RERE-CORDS | 废旧黑胶唱片再利用可持续设计展",
            "ja": "RERE-CORDS | 廃棄レコードの再利用によるサステナブルデザイン展示"
        },
        "nav-concept": {
            "zh": "企划理念",
            "ja": "コンセプト"
        },
        "nav-poster": {
            "zh": "宣传海报",
            "ja": "ポスター"
        },
        "nav-timeline": {
            "zh": "日程进程",
            "ja": "スケジュール"
        },
        "sdg-badge-text": {
            "zh": "负责任消费和生产",
            "ja": "つくる責任 つかう責任"
        },
        "hero-subtitle": {
            "zh": "废旧黑胶唱片再利用的可持续设计展",
            "ja": "廃棄アナログレコードの再利用によるサステナブルデザイン展示"
        },
        "hero-description": {
            "zh": "面向九州大学学生、校友及教职工征集创意。活动无偿发放100张废旧唱片作为设计原料，通过物理裁切与热塑重构，探讨废弃塑料的可持续循环与设计实践方式。",
            "ja": "九州大学大橋キャンパスを舞台に、学生、教職員、卒業生を対象としたクリエイティブ再利用プロジェクト。廃棄される100枚のレコードを物理的加工で新たなデザインへと昇華させます。"
        },
        "title-concept": {
            "zh": "企划理念",
            "ja": "企画について"
        },
        "lead-concept": {
            "zh": "将废旧黑胶唱片作为设计材料进行再利用与创作，探讨资源循环与环境友好设计的实践可能。",
            "ja": "再生不能となったアナログレコードをデザイン素材として再利用し、資源循環と環境配慮設計の実践可能性を提示します。"
        },
        "card1-title": {
            "zh": "旧物重构",
            "ja": "物理的再構成"
        },
        "card1-text": {
            "zh": "分发100张废旧唱片，通过切割、热塑、重组等自由加工手段，设计制作为全新的装置艺术、生活器具或饰品。",
            "ja": "廃棄レコード100枚を無償配布。切断や熱加工など自由な手法を用いて、新たなアート作品、日用品、アクセサリーへと再生します。"
        },
        "details-title": {
            "zh": "废旧塑料与可持续设计实践",
            "ja": "廃棄プラスチックとデザインによる資源循環"
        },
        "details-text": {
            "zh": "黑胶唱片主要由聚氯乙烯（PVC）制成，属于难降解塑料。本项目通过创意设计赋予废弃塑料第二次生命，以直观的形式实践联合国可持续发展目标12（负责任消费和生产）。",
            "ja": "アナログレコードの主原料である塩化ビニルは難分解性プラスチックです。本企画は、クリエイティブな再利用設計を通じて、SDGs目標12「つくる責任 つかう責任」を具体的に実践します。"
        },
        "stat-records": {
            "zh": "提供循环唱片数量",
            "ja": "配布レコード数"
        },
        "stat-target": {
            "zh": "核心实践目标",
            "ja": "対象目標"
        },
        "stat-exhibit": {
            "zh": "优秀作品展示",
            "ja": "選抜展示数"
        },
        "title-poster": {
            "zh": "宣传海报",
            "ja": "公式ポスター"
        },
        "lead-poster": {
            "zh": "校园中的体验型宣传——在海报背面贴上真实的黑胶唱片，过路人可以直接撕下带走作为创作材料。",
            "ja": "ポスター裏面に実物のレコードを添付。通りがかった学生が直接剥がして持ち帰る、手触りのある広報。"
        },
        "poster-card-title": {
            "zh": "海报与素材一体化设计",
            "ja": "ポスターと素材の一体型広報"
        },
        "poster-card-text": {
            "zh": "校园宣传海报背面附有真实废旧黑胶唱片，师生可直接撕下带走，作为本次设计征集活动的原生创作材料。",
            "ja": "学内に掲示されたポスターの裏面からレコードを直接剥がし、そのまま本企画の制作素材として持ち帰ることができます。"
        },
        "title-timeline": {
            "zh": "日程进程",
            "ja": "プロジェクト of 歩み"
        },
        "lead-timeline": {
            "zh": "2026年8月启动制作，经线上作品评审后，于11月下旬在九州大学大桥校区举办线下成果展与沙龙与表彰。",
            "ja": "2026年8月より自主制作を開始し、オンライン審査を経て、11月下旬に九州大学大橋キャンパスにて成果展示会および交流会を行います。"
        },
        "time-step1": {
            "zh": "2026年8月1日 〜 10月31日",
            "ja": "8月1日 〜 10月31日"
        },
        "title-step1": {
            "zh": "分发与创作",
            "ja": "配布と自主制作"
        },
        "text-step1": {
            "zh": "领取唱片，在3个月内进行个性化设计与制作。",
            "ja": "レコードを回収し配布。3ヶ月間の自主制作期間。"
        },
        "time-step2": {
            "zh": "2026年11月1日 〜 11月10日",
            "ja": "11月1日 〜 11月10日"
        },
        "title-step2": {
            "zh": "线上作品评审",
            "ja": "オンライン審査"
        },
        "text-step2": {
            "zh": "由特邀校友设计师担任评审，在线上评估创意过程与方案设计。",
            "ja": "卒業生デザイナーを招き、作品画像やコンセプトをオンライン審査。"
        },
        "time-step3": {
            "zh": "2026年11月20日 〜 11月25日",
            "ja": "11月20日 〜 11月25日"
        },
        "title-step3": {
            "zh": "大桥校区成果展",
            "ja": "エコ展示会"
        },
        "text-step3": {
            "zh": "在大桥校区多功能厅展出作品，采用全瓦楞纸低碳展具。",
            "ja": "大橋キャンパス内にて、再生段ボール什器を使用したエコ展示。"
        },
        "time-step4": {
            "zh": "2026年11月25日 15:00-17:00",
            "ja": "11月25日 15:00-17:00"
        },
        "title-step4": {
            "zh": "交流沙龙与表彰",
            "ja": "交流サロン・授賞式"
        },
        "text-step4": {
            "zh": "在大桥校区举办设计师交流会，颁发评选奖项，拉近校友与师生连接。",
            "ja": "展示最終日、学内外の参加者が集う対話と表彰のサロン。"
        },
        "footer-desc": {
            "zh": "废旧黑胶唱片再利用的可持续设计展览与作品征集策划",
            "ja": "廃棄アナログレコードの再利用によるサステナブルデザイン展示・作品募集企画"
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
       2. Mobile Navigation Menu
       -------------------------------------------------------------------------- */
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('#nav-menu');

    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = mobileNavToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('open')) {
                    icon.setAttribute('data-lucide', 'x');
                } else {
                    icon.setAttribute('data-lucide', 'menu');
                }
                lucide.createIcons();
            }
        });

        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                const icon = mobileNavToggle.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            });
        });
    }

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
});
