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
            "zh": "RERE-CORDS | 循环黑胶的可持续艺术展",
            "ja": "RERE-CORDS | 廃棄レコードの再構築とサステナブルデザイン"
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
        "cli-title": {
            "zh": "rere-records --status",
            "ja": "rere-records --status"
        },
        "cli-title-concept": {
            "zh": "rere-records --concept",
            "ja": "rere-records --concept"
        },
        "cli-title-poster": {
            "zh": "rere-records --poster",
            "ja": "rere-records --poster"
        },
        "cli-title-timeline": {
            "zh": "rere-records --timeline",
            "ja": "rere-records --timeline"
        },
        "cli-command": {
            "zh": "npx rere-records --init",
            "ja": "npx rere-records --init"
        },
        "cli-output": {
            "zh": "[status] 100 analog records loaded.<br>[target] SDG12: Responsible Consumption and Production.<br>[environment] Kyushu University Ohashi Campus.",
            "ja": "[status] 100 analog records loaded.<br>[target] SDG12: Responsible Consumption and Production.<br>[environment] Kyushu University Ohashi Campus."
        },
        "hero-partners-label": {
            "zh": "联合主办 & 协办",
            "ja": "主催・共催・協力"
        },
        "hero-subtitle": {
            "zh": "让废旧黑胶，在温热的重构中重生",
            "ja": "役割を終えた盤面に、もう一度温度を与える"
        },
        "hero-description": {
            "zh": "100张无法再播放的唱片。在大桥校区，我们邀请学生、校友与教职工一起物理剪裁、热塑重组，探讨资源循环的可能。",
            "ja": "廃棄される100枚のレコード。大橋キャンパスを舞台に、切断し、熱を加え、再構成する。世代を超えて語り合う、サステナブルな循環実験。"
        },
        "btn-hero-concept": {
            "zh": "阅读理念",
            "ja": "詳細を読む"
        },
        "title-concept": {
            "zh": "企划理念",
            "ja": "企画について"
        },
        "lead-concept": {
            "zh": "在黑胶的圈线里，重写关于循环的叙事。",
            "ja": "黒い溝に刻む、新たな「共生」の軌跡。"
        },
        "card1-title": {
            "zh": "旧物重构",
            "ja": "物理的再構成"
        },
        "card1-text": {
            "zh": "分发100张废弃黑胶。通过热塑、切割与重组，让音乐塑料成为全新的器物或艺术装置。",
            "ja": "廃棄予定のアナログレコード100枚を無償で配布。熱軟化や裁断を施し、新たなプロダクトへ。"
        },
        "card2-title": {
            "zh": "跨代连结",
            "ja": "世代を超えた共創"
        },
        "card2-text": {
            "zh": "不仅面向学生，更联合校友设计师与教职员工，在共同创作中建立有温度的代际网络。",
            "ja": "学生、教職員、そしてプロの卒業生デザイナーが混成チームを作り、共に悩み、創る。"
        },
        "card3-title": {
            "zh": "社区延伸",
            "ja": "地域への接続"
        },
        "card3-text": {
            "zh": "与福冈中古店及街区合作展出优秀作品，把艺术工学的循环理念转化为点亮社区的温度。",
            "ja": "福岡のレコード店と連携した展示やワークショップを行い、大学の壁を超えた対話を生み出す。"
        },
        "details-title": {
            "zh": "情感层面的“再创作”",
            "ja": "素材の物語を紡ぐ"
        },
        "details-text": {
            "zh": "黑胶唱片是难以自然降解的氯乙烯。我们将再生视作一次带有情感温度的再创作，在旧痕里，塑造可以触摸的未来。",
            "ja": "音楽を愛した記憶の詰まった塩化ビニル。これを冷たいゴミ分類ではなく、感情を込めて「手作業で再生」する。"
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
            "zh": "校园中的体验型宣传——ポスター裏面に実物レコードを貼り付け，体验手工作业的循环魅力。",
            "ja": "ポスター裏面に実物のレコードを添付。通りがかった学生が直接剥がして持ち帰る、手触りのある広報。"
        },
        "poster-card-title": {
            "zh": "触觉式的入场券",
            "ja": "触覚的なチケット"
        },
        "poster-card-text": {
            "zh": "海报背后的黑胶不仅是活动的邀请函，更是属于你的创作画布。",
            "ja": "剥がしたレコードは、本企画への入場券であり、あなたの創作の最初のキャンバスになります。"
        },
        "title-timeline": {
            "zh": "日程进程",
            "ja": "プロジェクトの歩み"
        },
        "lead-timeline": {
            "zh": "从夏日分发自主制作，至深秋成果展览。",
            "ja": "作品の募集から審査、そして大橋キャンパスでの展示・交流サロンまでのスケジュール。"
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
            "zh": "由特邀校友设计师担任评审，在线上评估创意过程。",
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
            "zh": "在大桥校区举办设计师交流会，颁发评选奖项。",
            "ja": "展示最終日、学内外の参加者が集う対話と表彰のサロン。"
        },
        "footer-desc": {
            "zh": "废旧黑胶唱片再利用的可持续设计展览与作品征集策划",
            "ja": "廃棄アナログレコードの再利用によるサステナブルデザイン展示・作品募集企画"
        },
        "footer-co": {
            "zh": "联合协办:",
            "ja": "協賛・協力:"
        },
        "partner-assoc": {
            "zh": "九州大学同窗会",
            "ja": "九州大学同窓会"
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

        const navLinks = document.querySelectorAll('.nav-link, .btn-secondary-nav');
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
       3. Scroll Reveal Animations (Timeline)
       -------------------------------------------------------------------------- */
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length > 0) {
        const observerOptions = {
            root: null,
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        };

        const timelineObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }

    // Set default language on load
    updateLanguage(currentLang);
});
