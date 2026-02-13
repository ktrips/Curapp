// MBTI診断の質問データ
const questions = [
    {
        question: "パーティーや集まりでは？",
        options: [
            { text: "多くの人と話し、エネルギーをもらう", value: "E" },
            { text: "少人数の親しい人と深く話す", value: "I" }
        ]
    },
    {
        question: "情報を処理する際、あなたは？",
        options: [
            { text: "具体的な事実と詳細を重視する", value: "S" },
            { text: "パターンや可能性を重視する", value: "N" }
        ]
    },
    {
        question: "決定を下す際、主に？",
        options: [
            { text: "論理と客観的な分析に基づく", value: "T" },
            { text: "価値観と人間関係を重視する", value: "F" }
        ]
    },
    {
        question: "日常生活では？",
        options: [
            { text: "計画を立て、整理整頓を好む", value: "J" },
            { text: "柔軟性を保ち、臨機応変に対応する", value: "P" }
        ]
    },
    {
        question: "新しいプロジェクトを始める時は？",
        options: [
            { text: "すぐに行動を起こし、試行錯誤しながら進める", value: "E" },
            { text: "まず計画を立て、準備を整えてから始める", value: "I" }
        ]
    },
    {
        question: "問題解決のアプローチは？",
        options: [
            { text: "実績のある方法を試す", value: "S" },
            { text: "新しい創造的な解決策を考える", value: "N" }
        ]
    },
    {
        question: "チームで意見が対立した時は？",
        options: [
            { text: "事実と論理で解決策を見つける", value: "T" },
            { text: "全員の気持ちを考慮して解決策を見つける", value: "F" }
        ]
    },
    {
        question: "締切がある時は？",
        options: [
            { text: "余裕を持って早めに完了させる", value: "J" },
            { text: "締切直前まで集中して取り組む", value: "P" }
        ]
    },
    {
        question: "ストレスを感じた時は？",
        options: [
            { text: "誰かと話して気分転換する", value: "E" },
            { text: "一人の時間を取ってリラックスする", value: "I" }
        ]
    },
    {
        question: "本を読む時は？",
        options: [
            { text: "事実や実用的な情報を重視する", value: "S" },
            { text: "アイデアや概念、可能性を探る", value: "N" }
        ]
    },
    {
        question: "批判を受けた時は？",
        options: [
            { text: "論理的に分析し、改善点を探す", value: "T" },
            { text: "感情的に受け止め、関係性を気にする", value: "F" }
        ]
    },
    {
        question: "旅行の計画は？",
        options: [
            { text: "詳細なスケジュールを立てる", value: "J" },
            { text: "大まかな方向性だけ決めて自由に行動する", value: "P" }
        ]
    },
    {
        question: "会議や討論では？",
        options: [
            { text: "積極的に発言し、アイデアを共有する", value: "E" },
            { text: "よく考えてから発言する", value: "I" }
        ]
    },
    {
        question: "未来について考える時は？",
        options: [
            { text: "現実的で実現可能な目標を設定する", value: "S" },
            { text: "大きなビジョンや理想を描く", value: "N" }
        ]
    },
    {
        question: "重要な決断をする時は？",
        options: [
            { text: "メリット・デメリットを分析する", value: "T" },
            { text: "自分の価値観や感情に従う", value: "F" }
        ]
    },
    {
        question: "週末の過ごし方は？",
        options: [
            { text: "計画を立てて活動する", value: "J" },
            { text: "その時の気分で自由に過ごす", value: "P" }
        ]
    }
];

// MBTIタイプの説明
const typeDescriptions = {
    "INTJ": "建築家 - 戦略的思考と独立性を備えた完璧主義者",
    "INTP": "論理学者 - 知識への情熱と論理的思考を持つ革新者",
    "ENTJ": "指揮官 - 大胆で決断力のあるリーダー",
    "ENTP": "討論者 - 知的で好奇心旺盛な思考家",
    "INFJ": "提唱者 - 創造的で理想主義的な完璧主義者",
    "INFP": "仲介者 - 詩的で優しい理想主義者",
    "ENFJ": "主人公 - カリスマ的でインスピレーションを与えるリーダー",
    "ENFP": "運動家 - 熱心で創造的な自由人",
    "ISTJ": "管理者 - 実践的で信頼できる組織者",
    "ISFJ": "擁護者 - 温かく献身的な保護者",
    "ESTJ": "幹部 - 優秀でエネルギッシュな管理者",
    "ESFJ": "領事官 - 思いやりがあり社交的な協力者",
    "ISTP": "巨匠 - 大胆で実践的な実験者",
    "ISFP": "冒険家 - 柔軟で魅力的な芸術家",
    "ESTP": "起業家 - スマートでエネルギッシュな知覚者",
    "ESFP": "エンターテイナー - 自発的で熱狂的なエンターテイナー"
};

// MBTIタイプ別の推薦書籍データ
const bookRecommendations = {
    "INTJ": [
        {
            title: "思考の整理学",
            author: "外山滋比古",
            description: "論理的思考と戦略的アプローチを深めるための本。INTJの知的好奇心に応える内容。",
            amazonUrl: "https://www.amazon.co.jp/s?k=思考の整理学+外山滋比古"
        },
        {
            title: "ゼロ秒思考",
            author: "赤羽雄二",
            description: "戦略的思考を高め、意思決定を迅速化する方法を学べる本。",
            amazonUrl: "https://www.amazon.co.jp/s?k=ゼロ秒思考+赤羽雄二"
        },
        {
            title: "イノベーションのジレンマ",
            author: "クレイトン・クリステンセン",
            description: "戦略的思考とイノベーションについて深く理解できる名著。",
            amazonUrl: "https://www.amazon.co.jp/s?k=イノベーションのジレンマ"
        }
    ],
    "INTP": [
        {
            title: "哲学の歴史",
            author: "岡本裕一朗",
            description: "論理的思考と哲学的な探求を深めるための本。INTPの知的好奇心に応える。",
            amazonUrl: "https://www.amazon.co.jp/s?k=哲学の歴史+岡本裕一朗"
        },
        {
            title: "思考実験",
            author: "ジュリアン・バッジーニ",
            description: "論理的思考を鍛える思考実験の本。INTPの知的好奇心を刺激する。",
            amazonUrl: "https://www.amazon.co.jp/s?k=思考実験+ジュリアン・バッジーニ"
        },
        {
            title: "サイエンス・フィクション傑作選",
            author: "アーサー・C・クラーク",
            description: "科学的思考と想像力を刺激するSF作品。",
            amazonUrl: "https://www.amazon.co.jp/s?k=アーサー・C・クラーク"
        }
    ],
    "ENTJ": [
        {
            title: "リーダーシップの法則",
            author: "ジョン・C・マクスウェル",
            description: "リーダーシップとマネジメントスキルを高める本。ENTJのリーダーシップ能力を強化。",
            amazonUrl: "https://www.amazon.co.jp/s?k=リーダーシップの法則+マクスウェル"
        },
        {
            title: "7つの習慣",
            author: "スティーブン・R・コヴィー",
            description: "効果的なリーダーシップと成功の原則を学べる名著。",
            amazonUrl: "https://www.amazon.co.jp/s?k=7つの習慣+コヴィー"
        },
        {
            title: "グロービスMBA経営戦略",
            author: "グロービス経営大学院",
            description: "戦略的思考と経営判断力を高める実践的な本。",
            amazonUrl: "https://www.amazon.co.jp/s?k=グロービスMBA経営戦略"
        }
    ],
    "ENTP": [
        {
            title: "アイデアのつくり方",
            author: "ジェームズ・W・ヤング",
            description: "創造性とイノベーションを高める方法を学べる本。ENTPの創造性を刺激。",
            amazonUrl: "https://www.amazon.co.jp/s?k=アイデアのつくり方+ヤング"
        },
        {
            title: "ゼロから1を作り出す",
            author: "ピーター・ティール",
            description: "イノベーションと起業家精神について学べる本。",
            amazonUrl: "https://www.amazon.co.jp/s?k=ゼロから1を作り出す+ピーター・ティール"
        },
        {
            title: "ハック思考",
            author: "スコット・アダムス",
            description: "創造的な問題解決とハック思考を学べる本。",
            amazonUrl: "https://www.amazon.co.jp/s?k=ハック思考+スコット・アダムス"
        }
    ],
    "INFJ": [
        {
            title: "ユング心理学入門",
            author: "河合隼雄",
            description: "深い洞察と人間理解を深める本。INFJの内面的な探求に応える。",
            amazonUrl: "https://www.amazon.co.jp/s?k=ユング心理学入門+河合隼雄"
        },
        {
            title: "生き方",
            author: "稲盛和夫",
            description: "人生の意味と価値観について深く考える本。",
            amazonUrl: "https://www.amazon.co.jp/s?k=生き方+稲盛和夫"
        },
        {
            title: "星の王子さま",
            author: "アントワーヌ・ド・サン＝テグジュペリ",
            description: "人間の本質と愛について深く考える物語。",
            amazonUrl: "https://www.amazon.co.jp/s?k=星の王子さま"
        }
    ],
    "INFP": [
        {
            title: "詩を読む",
            author: "谷川俊太郎",
            description: "感情と表現の世界を深める本。INFPの創造性と感情表現を高める。",
            amazonUrl: "https://www.amazon.co.jp/s?k=詩を読む+谷川俊太郎"
        },
        {
            title: "ハリー・ポッターシリーズ",
            author: "J・K・ローリング",
            description: "想像力と感情を刺激する物語。INFPの理想主義と創造性に響く。",
            amazonUrl: "https://www.amazon.co.jp/s?k=ハリー・ポッター"
        },
        {
            title: "夜と霧",
            author: "ヴィクトール・E・フランクル",
            description: "人生の意味と価値観について深く考える本。",
            amazonUrl: "https://www.amazon.co.jp/s?k=夜と霧+フランクル"
        }
    ],
    "ENFJ": [
        {
            title: "人を動かす",
            author: "デール・カーネギー",
            description: "人間関係とリーダーシップを高める本。ENFJの人間理解と影響力を強化。",
            amazonUrl: "https://www.amazon.co.jp/s?k=人を動かす+カーネギー"
        },
        {
            title: "EQ こころの知能指数",
            author: "ダニエル・ゴールマン",
            description: "感情知能と人間関係について学べる本。",
            amazonUrl: "https://www.amazon.co.jp/s?k=EQ+こころの知能指数"
        },
        {
            title: "チームが機能するとはどういうことか",
            author: "エイミー・C・エドモンドソン",
            description: "チームビルディングと組織心理学について学べる本。",
            amazonUrl: "https://www.amazon.co.jp/s?k=チームが機能するとはどういうことか"
        }
    ],
    "ENFP": [
        {
            title: "クリエイティブ・マインドセット",
            author: "デイヴィッド・ケリー",
            description: "創造性とイノベーションを高める本。ENFPの創造性と熱意を刺激。",
            amazonUrl: "https://www.amazon.co.jp/s?k=クリエイティブ・マインドセット"
        },
        {
            title: "スタートアップ",
            author: "ガイ・カワサキ",
            description: "起業家精神とイノベーションについて学べる本。",
            amazonUrl: "https://www.amazon.co.jp/s?k=スタートアップ+ガイ・カワサキ"
        },
        {
            title: "人生を変える80対20の法則",
            author: "リチャード・コッチ",
            description: "エネルギッシュに行動するための効率化の本。",
            amazonUrl: "https://www.amazon.co.jp/s?k=80対20の法則"
        }
    ],
    "ISTJ": [
        {
            title: "整理術",
            author: "佐藤可士和",
            description: "実践的な整理と効率化の方法を学べる本。ISTJの組織力と実用性を高める。",
            amazonUrl: "https://www.amazon.co.jp/s?k=整理術+佐藤可士和"
        },
        {
            title: "エッセンシャル思考",
            author: "グレッグ・マキューン",
            description: "本質を見極め、効率的に行動する方法を学べる本。",
            amazonUrl: "https://www.amazon.co.jp/s?k=エッセンシャル思考"
        },
        {
            title: "システム思考",
            author: "ドネラ・メドウズ",
            description: "論理的思考とシステム理解を深める本。",
            amazonUrl: "https://www.amazon.co.jp/s?k=システム思考+メドウズ"
        }
    ],
    "ISFJ": [
        {
            title: "思いやりの心理学",
            author: "ブレネー・ブラウン",
            description: "思いやりと人間関係について深く理解できる本。ISFJの優しさと献身性を高める。",
            amazonUrl: "https://www.amazon.co.jp/s?k=思いやりの心理学+ブレネー・ブラウン"
        },
        {
            title: "家族の絆",
            author: "河合隼雄",
            description: "家族関係と人間の絆について考える本。",
            amazonUrl: "https://www.amazon.co.jp/s?k=家族の絆+河合隼雄"
        },
        {
            title: "感謝の力",
            author: "ロバート・エモンズ",
            description: "感謝とポジティブ思考について学べる本。",
            amazonUrl: "https://www.amazon.co.jp/s?k=感謝の力+エモンズ"
        }
    ],
    "ESTJ": [
        {
            title: "経営戦略",
            author: "マイケル・ポーター",
            description: "実践的な経営と戦略について学べる本。ESTJの組織力とリーダーシップを強化。",
            amazonUrl: "https://www.amazon.co.jp/s?k=経営戦略+マイケル・ポーター"
        },
        {
            title: "リーダーシップの極意",
            author: "ジョン・C・マクスウェル",
            description: "効果的なリーダーシップとマネジメントを学べる本。",
            amazonUrl: "https://www.amazon.co.jp/s?k=リーダーシップの極意+マクスウェル"
        },
        {
            title: "実行力",
            author: "ラリー・ボシディ",
            description: "実行力と結果を出す方法を学べる本。",
            amazonUrl: "https://www.amazon.co.jp/s?k=実行力+ラリー・ボシディ"
        }
    ],
    "ESFJ": [
        {
            title: "人を動かす",
            author: "デール・カーネギー",
            description: "人間関係とコミュニケーションを高める本。ESFJの社交性と協調性を強化。",
            amazonUrl: "https://www.amazon.co.jp/s?k=人を動かす+カーネギー"
        },
        {
            title: "チームワークの心理学",
            author: "パトリック・レンシオーニ",
            description: "チームビルディングと協力について学べる本。",
            amazonUrl: "https://www.amazon.co.jp/s?k=チームワークの心理学"
        },
        {
            title: "感謝の習慣",
            author: "ロバート・エモンズ",
            description: "感謝とポジティブな人間関係を築く方法を学べる本。",
            amazonUrl: "https://www.amazon.co.jp/s?k=感謝の習慣"
        }
    ],
    "ISTP": [
        {
            title: "実践的な問題解決",
            author: "ジェームズ・L・アダムス",
            description: "実践的な思考と問題解決を学べる本。ISTPの実用性と技術的思考を高める。",
            amazonUrl: "https://www.amazon.co.jp/s?k=実践的な問題解決"
        },
        {
            title: "メイカーズ",
            author: "クリス・アンダーソン",
            description: "ものづくりとイノベーションについて学べる本。",
            amazonUrl: "https://www.amazon.co.jp/s?k=メイカーズ+クリス・アンダーソン"
        },
        {
            title: "ハッカーの思考法",
            author: "ポール・グラハム",
            description: "技術的思考と創造的問題解決を学べる本。",
            amazonUrl: "https://www.amazon.co.jp/s?k=ハッカーの思考法"
        }
    ],
    "ISFP": [
        {
            title: "アート思考",
            author: "エイミー・ウィットカー",
            description: "創造性と芸術的思考を高める本。ISFPの創造性と美的感覚を刺激。",
            amazonUrl: "https://www.amazon.co.jp/s?k=アート思考"
        },
        {
            title: "色彩の心理学",
            author: "ヨハネス・イッテン",
            description: "色彩とデザインについて学べる本。",
            amazonUrl: "https://www.amazon.co.jp/s?k=色彩の心理学+イッテン"
        },
        {
            title: "創造性の技法",
            author: "エドワード・デ・ボノ",
            description: "創造的思考とイノベーションを学べる本。",
            amazonUrl: "https://www.amazon.co.jp/s?k=創造性の技法+デ・ボノ"
        }
    ],
    "ESTP": [
        {
            title: "行動力",
            author: "ジェームズ・アルトゥチェル",
            description: "迅速な行動と決断力を高める本。ESTPの行動力と実践性を強化。",
            amazonUrl: "https://www.amazon.co.jp/s?k=行動力+アルトゥチェル"
        },
        {
            title: "起業家の思考法",
            author: "ピーター・ティール",
            description: "起業家精神とビジネスについて学べる本。",
            amazonUrl: "https://www.amazon.co.jp/s?k=起業家の思考法+ピーター・ティール"
        },
        {
            title: "スピード経営",
            author: "ジャック・ウェルチ",
            description: "迅速な意思決定と実行力について学べる本。",
            amazonUrl: "https://www.amazon.co.jp/s?k=スピード経営+ウェルチ"
        }
    ],
    "ESFP": [
        {
            title: "人生を楽しむ技術",
            author: "デール・カーネギー",
            description: "人生を楽しみ、ポジティブに生きる方法を学べる本。ESFPの楽観性と社交性を高める。",
            amazonUrl: "https://www.amazon.co.jp/s?k=人生を楽しむ技術+カーネギー"
        },
        {
            title: "ポジティブ心理学",
            author: "マーティン・セリグマン",
            description: "ポジティブ思考と幸福について学べる本。",
            amazonUrl: "https://www.amazon.co.jp/s?k=ポジティブ心理学+セリグマン"
        },
        {
            title: "エンターテイメントの力",
            author: "スティーブン・ジョンソン",
            description: "エンターテイメントと創造性について学べる本。",
            amazonUrl: "https://www.amazon.co.jp/s?k=エンターテイメントの力"
        }
    ]
};

// Strength Finderの強みとMBTIタイプのマッピング
const strengthToMBTIMapping = {
    // 分析・思考系の強み → INTJ, INTP, ENTJ, ENTP
    "分析思考": ["INTJ", "INTP", "ENTJ"],
    "戦略性": ["INTJ", "ENTJ", "ENTP"],
    "学習欲": ["INTJ", "INTP", "ENTP"],
    "原点思考": ["INTP", "INTJ"],
    "内省": ["INTJ", "INTP", "INFJ"],
    "収集心": ["INTP", "INTJ"],
    
    // 実行・達成系の強み → ESTJ, ENTJ, ISTJ
    "達成欲": ["ESTJ", "ENTJ", "ISTJ"],
    "実行力": ["ESTJ", "ENTJ", "ISTJ"],
    "責任感": ["ESTJ", "ISTJ", "ISFJ"],
    "規律性": ["ISTJ", "ESTJ"],
    "整理整頓": ["ISTJ", "ESTJ"],
    "慎重さ": ["ISTJ", "ISFJ"],
    
    // 人間関係・影響力系の強み → ENFJ, ESFJ, ENFP, ESFP
    "コミュニケーション": ["ENFJ", "ESFJ", "ENFP"],
    "共感性": ["ENFJ", "ESFJ", "INFP", "ISFP"],
    "調和性": ["ESFJ", "ISFJ", "ENFJ"],
    "個別化": ["ENFJ", "ESFJ", "INFJ"],
    "包含": ["ENFJ", "ESFJ"],
    "親密性": ["ESFJ", "ISFJ", "ENFJ"],
    "社交性": ["ESFP", "ESFJ", "ENFP"],
    "最上志向": ["ENFJ", "ENTJ"],
    
    // 影響力・リーダーシップ系の強み → ENTJ, ENFJ, ESTJ
    "指令性": ["ENTJ", "ESTJ"],
    "活発性": ["ESTP", "ESFP", "ENTP"],
    "自己確信": ["ENTJ", "ESTJ"],
    "競争性": ["ESTJ", "ENTJ", "ESTP"],
    "信念": ["INFJ", "ENFJ", "INTJ"],
    
    // 創造・適応系の強み → ENFP, ENTP, INFP, ISFP
    "適応性": ["ENFP", "ENTP", "ISFP"],
    "着想": ["ENFP", "ENTP", "INFP"],
    "創造性": ["ENFP", "INFP", "ISFP"],
    "柔軟性": ["ENFP", "ENTP", "ISFP"],
    "未来志向": ["ENFP", "ENTP", "INTJ"],
    
    // 支援・献身系の強み → ISFJ, ESFJ, INFJ
    "回復志向": ["ISFJ", "ESFJ"],
    "献身": ["ISFJ", "ESFJ", "INFJ"],
    "育成": ["ISFJ", "ESFJ", "ENFJ"],
    "ポジティブ": ["ESFP", "ESFJ", "ENFP"],
    
    // 戦略・実行系の強み → INTJ, ENTJ, ISTJ
    "戦略性": ["INTJ", "ENTJ"],
    "目標志向": ["ENTJ", "ESTJ", "INTJ"],
    "焦点": ["INTJ", "ISTJ", "ENTJ"],
    
    // その他
    "公平性": ["ISTJ", "ISFJ"],
    "運命思考": ["INFJ", "INFP"],
    "成長促進": ["ENFJ", "ESFJ"],
    "適応性": ["ENFP", "ENTP"]
};

// Strength Finderの強みからMBTIタイプを推測
function estimateMBTIFromStrengths(strengths) {
    const typeScores = {
        "INTJ": 0, "INTP": 0, "ENTJ": 0, "ENTP": 0,
        "INFJ": 0, "INFP": 0, "ENFJ": 0, "ENFP": 0,
        "ISTJ": 0, "ISFJ": 0, "ESTJ": 0, "ESFJ": 0,
        "ISTP": 0, "ISFP": 0, "ESTP": 0, "ESFP": 0
    };
    
    strengths.forEach((strength, index) => {
        const strengthLower = strength.toLowerCase();
        let found = false;
        
        // マッピングデータを検索
        for (const [key, types] of Object.entries(strengthToMBTIMapping)) {
            if (strengthLower.includes(key.toLowerCase()) || key.toLowerCase().includes(strengthLower)) {
                types.forEach(type => {
                    // 上位の強みほど重みを大きく
                    const weight = 5 - index;
                    typeScores[type] += weight;
                });
                found = true;
            }
        }
        
        // マッピングが見つからない場合、キーワードで推測
        if (!found) {
            if (strengthLower.includes('分析') || strengthLower.includes('戦略') || strengthLower.includes('学習') || strengthLower.includes('思考')) {
                typeScores['INTJ'] += (5 - index);
                typeScores['INTP'] += (5 - index);
            }
            if (strengthLower.includes('達成') || strengthLower.includes('実行') || strengthLower.includes('責任') || strengthLower.includes('規律')) {
                typeScores['ESTJ'] += (5 - index);
                typeScores['ISTJ'] += (5 - index);
            }
            if (strengthLower.includes('コミュニケーション') || strengthLower.includes('共感') || strengthLower.includes('調和') || strengthLower.includes('社交')) {
                typeScores['ENFJ'] += (5 - index);
                typeScores['ESFJ'] += (5 - index);
            }
            if (strengthLower.includes('創造') || strengthLower.includes('着想') || strengthLower.includes('適応') || strengthLower.includes('柔軟')) {
                typeScores['ENFP'] += (5 - index);
                typeScores['ENTP'] += (5 - index);
            }
        }
    });
    
    // 最もスコアが高いタイプを返す
    let maxScore = 0;
    let bestType = 'INTJ'; // デフォルト
    
    for (const [type, score] of Object.entries(typeScores)) {
        if (score > maxScore) {
            maxScore = score;
            bestType = type;
        }
    }
    
    return bestType;
}
