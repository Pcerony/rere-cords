/* ==========================================================================
   RERE-CORDS Javascript Logic
   Bilingual Translation & Form Handling
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       1. Bilingual Translation System (ZH / JA)
       -------------------------------------------------------------------------- */
    const i18nDict = {
        "doc-title": {
            "zh": "RERE-CORDS | 废旧黑胶唱片再利用的可持续设计展",
            "ja": "RERE-CORDS | 廃棄アナログレコード再利用サステナブルデザイン企画"
        },
        "nav-concept": {
            "zh": "活动理念",
            "ja": "コンセプト"
        },
        "nav-poster": {
            "zh": "活动海报",
            "ja": "ポスター"
        },
        "nav-timeline": {
            "zh": "日程安排",
            "ja": "スケジュール"
        },
        "nav-register": {
            "zh": "立即报名",
            "ja": "エントリー"
        },
        "sdg-badge-text": {
            "zh": "负责任消费和生产",
            "ja": "つくる責任 つかう責任"
        },
        "hero-subtitle": {
            "zh": "废旧黑胶唱片的再利用<br><span class=\"highlight-text\">可持续设计展览与作品征集</span>",
            "ja": "廃棄アナログレコードの再利用による<br><span class=\"highlight-text\">サステナブルデザイン展示・作品募集</span>"
        },
        "hero-description": {
            "zh": "100张失去播放价值的旧唱片。通过物理裁剪、热塑和重构，赋予它们第二生命。这是九州大学大桥校区开展的一场跨越学生、校友与教职工的社区循环艺术探索。",
            "ja": "役割を終えた100枚の音楽メディア。それらを物理的に加工・再構築し、新たな価値を与える。九州大学大橋キャンパスを舞台に、学生・卒業生・教職員が共に創る循環型デザインの実験室。"
        },
        "btn-hero-register": {
            "zh": "提交作品方案",
            "ja": "今すぐエントリー"
        },
        "btn-hero-concept": {
            "zh": "了解理念",
            "ja": "詳細を見る"
        },
        "tag-concept": {
            "zh": "CONCEPT",
            "ja": "CONCEPT"
        },
        "title-concept": {
            "zh": "企划理念",
            "ja": "企画について"
        },
        "lead-concept": {
            "zh": "用设计的力量，在废旧黑胶的黑色纹路中，写下关于“共生”的新曲。",
            "ja": "音楽を紡いだ黒い盤面に、デザインの力で「第二の命」を吹き込む。"
        },
        "card1-title": {
            "zh": "废弃唱片循环再生",
            "ja": "廃棄レコードの再資源化"
        },
        "card1-text": {
            "zh": "我们从福冈本地唱片店收集了100张无法再播放的废弃黑胶唱片，并向参与者无偿发放。通过剪裁、热定型、彩绘或物理拆解等自由手段，设计成全新的艺术装置、时装配件或日用品。",
            "ja": "中古レコード店等で廃棄予定となったアナログレコード100枚を無償で配布します。熱軟化、裁断、塗装、再接合など、自由な手法で全く新しいアートやプロダクトへ昇華させます。"
        },
        "card2-title": {
            "zh": "跨越代际的共创网络",
            "ja": "世代・分野を超えた連携"
        },
        "card2-text": {
            "zh": "不仅仅面向在校生，该企划特别邀请了毕业生成员（艺术工学设计先辈）以及学校教职工共同组队和评审。以旧唱片为纽带，搭建一个温馨有温度的设计师交流沙龙。",
            "ja": "学部生・大学院生だけでなく、卒業生（校友）のプロデザイナーや教職員も創作・審査のプロセスに関わります。芸術工学の知見を融合し、コミュニティの活性化を促します。"
        },
        "card3-title": {
            "zh": "地域温情与社区延伸",
            "ja": "地域社会への接続"
        },
        "card3-text": {
            "zh": "活动后期，我们将与本地中古店联合，将优秀作品在商圈展出，并开展面向市民的创意手作工坊。将艺术工学的学术研究成果，转化为能够点亮街区和市民生活的可持续温度。",
            "ja": "学内展示にとどまらず、福岡地域の中古レコード店と提携。将来的に一般市民向けワークショップを開催するなど、大学の壁を超えた持続可能な地域連携活動の創出を模索します。"
        },
        "details-title": {
            "zh": "用温度解构“负责任消费与生产”",
            "ja": "「つくる責任 つかう責任」を物理的に解釈する"
        },
        "details-text": {
            "zh": "黑胶唱片由不易降解的氯乙烯制成。一旦失去播放功能，它们极易成为长眠于垃圾填埋场的塑料废料。“RERE-CORDS”并不将再生视作冷冰冰的垃圾分类与工业回炉，而是视作一次带有情感的、人文层面的“再创作”。我们邀请每一位创作者，在磨损的划痕上重塑质感，用诗意和美学守护地球家园。",
            "ja": "アナログレコードは塩化ビニルというプラスチック素材で作られています。音楽メディアとしての役割を終えたレコードは、そのまま廃棄物となってしまいます。「RERE-CORDS」は、この「役割を终えた素材」を物理的に再構築することを通じて、身の回りの資源循環について考えるきっかけを提供します。"
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
            "zh": "优秀方案评选展出",
            "ja": "選抜展示数"
        },
        "tag-poster": {
            "zh": "FLYER",
            "ja": "VISUAL"
        },
        "title-poster": {
            "zh": "宣传海报",
            "ja": "公式ポスター"
        },
        "lead-poster": {
            "zh": "这是粘贴在校园内的体验型海报——ポスター裏面に実物レコードを貼り付け、路上の学生が直接剥がして持ち帰れる体験型広報。",
            "ja": "学内に掲示されるポスター裏面に実物レコードを貼り付け、路上の学生が直接剥がして持ち帰れる体験型広報。"
        },
        "poster-card-title": {
            "zh": "体验型海报设计",
            "ja": "体験型ポスター"
        },
        "poster-card-text": {
            "zh": "海报背面贴有真实的旧唱片，校园里的过路者可以直接将其撕下带走。带走的唱片既是本次创意的入场券，也是你的创作素材本身。",
            "ja": "学内に掲示されるポスターには、実物の廃棄レコードが添付されており、自由に剥がして持ち帰ることができます。持ち帰ったレコードがあなたの制作のスタートラインです。"
        },
        "tag-timeline": {
            "zh": "TIMELINE",
            "ja": "SCHEDULE"
        },
        "title-timeline": {
            "zh": "日程进程",
            "ja": "プロジェクトの歩み"
        },
        "lead-timeline": {
            "zh": "从夏日的征集、自主制作，到深秋大桥校区的生态展览及授奖沙龙。",
            "ja": "作品の募集から審査、そして大橋キャンパスでの展示・交流サロンまでのスケジュール。"
        },
        "time-step1": {
            "zh": "2026年8月1日 〜 10月31日",
            "ja": "8月1日（土）〜 10月31日（土）"
        },
        "title-step1": {
            "zh": "唱片分发与自主制作",
            "ja": "作品募集・制作期間"
        },
        "text-step1": {
            "zh": "领取废旧唱片后，个人或团队（学生、校友、老师混编）在3个月内进行设计与制作。制作花絮推荐分享到社交网络并添加 #RERECORDS 标签进行共鸣。",
            "ja": "廃棄アナログレコードを配布し、個人またはチーム（混成可）でサステナブル作品を自主制作・応募。制作の進捗はハッシュタグ #RERECORDS でSNS発信します。"
        },
        "time-step2": {
            "zh": "2026年11月1日 〜 11月10日",
            "ja": "11月1日（日）〜 11月10日（火）"
        },
        "title-step2": {
            "zh": "作品线上评审",
            "ja": "作品審査・選考"
        },
        "text-step2": {
            "zh": "特邀专业毕业校友设计师担任特聘评审，依据提交的方案图片、说明文档以及一段30秒的“手作制作过程短视频”进行线上综合评优。",
            "ja": "外部から特別招聘する卒業生デザイナー1名を審査員に迎え、提出された作品写真、コンセプト文、および30秒の制作ショート動画をオンラインにて審査します。"
        },
        "time-step3": {
            "zh": "2026年11月20日 〜 11月25日",
            "ja": "11月20日（金）〜 11月25日（水）"
        },
        "title-step3": {
            "zh": "校区低碳成果展",
            "ja": "展示会（オンライン・オフライン）"
        },
        "text-step3": {
            "zh": "在大桥校区多功能厅或图书馆展厅举办线下成果展。展出道具全部使用可回收瓦楞纸箱和纸架，参观者可扫码查看创作者的制作视频并参与人气投票。",
            "ja": "大橋キャンパス内（多目的ホール等）で再生段ボール什器を使ったエコ展示を実施。来場者による一般投票も行われます。同時に特設Web上でもアーカイブ公開します。"
        },
        "time-step4": {
            "zh": "2026年11月25日 15:00-17:00",
            "ja": "11月25日（水）15:00〜17:00"
        },
        "title-step4": {
            "zh": "交流沙龙与颁奖典礼",
            "ja": "交流サロン & 授賞式"
        },
        "text-step4": {
            "zh": "展览最后一日举办设计师沙龙。评审会带来可持续设计的微型分享，随后颁发人气奖和专家选择奖。在欢愉的人文气息下，加深师生与校友的网络链接。",
            "ja": "展示最終日に、学生・教職員・卒業生審査員が集う交流サロンを開催。サステナブルデザインのミニトーク、受賞作の表彰式、フリートークで校友連携を深めます。"
        },
        "tag-register": {
            "zh": "REGISTRATION",
            "ja": "ENTRY"
        },
        "title-register": {
            "zh": "项目参与报名",
            "ja": "参加エントリー"
        },
        "lead-register": {
            "zh": "如果您有意向参与废旧唱片再利用的创作或提交设想方案，请在此填写报名信息。",
            "ja": "RERE-CORDS企画へのご参加、作品応募はこちらのフォームから申請してください。"
        },
        "label-name": {
            "zh": "代表者姓名",
            "ja": "氏名 / 代表者氏名"
        },
        "label-id": {
            "zh": "学生学号 或 教师所属部门",
            "ja": "学生番号 または 所属部署/研究院"
        },
        "label-category": {
            "zh": "身份类别",
            "ja": "区分"
        },
        "select-placeholder": {
            "zh": "请选择您的身份",
            "ja": "選択してください"
        },
        "opt-student": {
            "zh": "本科生・研究生",
            "ja": "学部生・大学院生"
        },
        "opt-alumni": {
            "zh": "毕业生（校友）",
            "ja": "卒業生（校友）"
        },
        "opt-faculty": {
            "zh": "教职工",
            "ja": "教職員"
        },
        "opt-other": {
            "zh": "其他（共同研究员等）",
            "ja": "その他（共同研究員等）"
        },
        "label-email": {
            "zh": "电子邮箱",
            "ja": "メールアドレス"
        },
        "label-idea": {
            "zh": "创意草案或设想（仅需简短描述，如后续有变动没关系）",
            "ja": "制作・企画のアイデア（現時点のイメージで構いません）"
        },
        "placeholder-idea": {
            "zh": "例如：计划通过热风枪加热唱片将其塑造成创意台灯的灯罩，或者计划手工雕刻唱片盘面制作一幅复古艺术壁挂钟表。",
            "ja": "例：廃棄レコードを熱で変形させてお洒落なデスクランプのシェードを作りたい、レコードの盤面を彫刻してオリジナルの壁掛け時計を作成したい、など。"
        },
        "label-safety": {
            "zh": "我同意在热塑、裁剪等创作阶段自己做好防烫伤与工具安全使用的防范工作，安全责任自负。",
            "ja": "加工時の火傷防止や工具の安全使用など、安全対策を自己責任で徹底することに同意します。"
        },
        "btn-submit": {
            "zh": "发送申请方案",
            "ja": "エントリーを送信する"
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
