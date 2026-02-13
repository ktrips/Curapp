// アプリケーションの状態管理
let currentQuestionIndex = 0;
let answers = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
};

// DOM要素の取得
const homeScreen = document.getElementById('home-screen');
const mbtiInputScreen = document.getElementById('mbti-input-screen');
const strengthInputScreen = document.getElementById('strength-input-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');

const mbtiInputBtn = document.getElementById('mbti-input-btn');
const strengthInputBtn = document.getElementById('strength-input-btn');
const diagnosisBtn = document.getElementById('diagnosis-btn');

const mbtiSelect = document.getElementById('mbti-select');
const mbtiSubmitBtn = document.getElementById('mbti-submit-btn');
const mbtiBackBtn = document.getElementById('mbti-back-btn');

const strengthSubmitBtn = document.getElementById('strength-submit-btn');
const strengthBackBtn = document.getElementById('strength-back-btn');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options');
const progressFill = document.getElementById('progress');
const questionBackBtn = document.getElementById('question-back-btn');

const mbtiTypeElement = document.getElementById('mbti-type');
const typeDescriptionElement = document.getElementById('type-description');
const booksListElement = document.getElementById('books-list');
const restartBtn = document.getElementById('restart-btn');
const homeBtn = document.getElementById('home-btn');

// 画面遷移関数
function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}

// ホーム画面のボタンイベント
mbtiInputBtn.addEventListener('click', () => {
    showScreen(mbtiInputScreen);
});

strengthInputBtn.addEventListener('click', () => {
    showScreen(strengthInputScreen);
});

diagnosisBtn.addEventListener('click', () => {
    // 診断をリセット
    currentQuestionIndex = 0;
    answers = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    showScreen(questionScreen);
    showQuestion();
});

// MBTI入力画面のイベント
mbtiSubmitBtn.addEventListener('click', () => {
    const selectedType = mbtiSelect.value;
    if (selectedType) {
        showResultWithType(selectedType);
    } else {
        alert('MBTIタイプを選択してください');
    }
});

mbtiBackBtn.addEventListener('click', () => {
    showScreen(homeScreen);
});

// Strength Finder入力画面のイベント
strengthSubmitBtn.addEventListener('click', () => {
    const strengths = [
        document.getElementById('strength-1').value,
        document.getElementById('strength-2').value,
        document.getElementById('strength-3').value,
        document.getElementById('strength-4').value,
        document.getElementById('strength-5').value
    ];
    
    if (strengths.some(s => s.trim() === '')) {
        alert('すべての強みを入力してください');
        return;
    }
    
    // Strength Finderの結果に基づいてMBTIタイプを推測
    // ここでは簡易的に、一般的な強みの組み合わせからMBTIタイプを推測
    // 実際の実装では、より詳細なマッピングが必要
    const estimatedType = estimateMBTIFromStrengths(strengths);
    showResultWithType(estimatedType);
});

strengthBackBtn.addEventListener('click', () => {
    showScreen(homeScreen);
});

// Strength FinderからMBTIタイプを推測（mbti-data.jsの関数を使用）

// 質問画面の戻るボタン
questionBackBtn.addEventListener('click', () => {
    if (confirm('診断を中断しますか？')) {
        showScreen(homeScreen);
    }
});

// 質問を表示
function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResult();
        return;
    }

    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;
    
    // 進捗バーの更新
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressFill.style.width = progress + '%';

    // オプションボタンの作成
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option.text;
        button.addEventListener('click', () => {
            selectOption(option.value);
        });
        optionsContainer.appendChild(button);
    });
}

// オプション選択
function selectOption(value) {
    answers[value]++;
    currentQuestionIndex++;
    
    // 次の質問へ（少し遅延を入れてスムーズに）
    setTimeout(() => {
        showQuestion();
    }, 300);
}

// 結果を表示（診断から）
function showResult() {
    // MBTIタイプの判定
    const mbtiType = 
        (answers.E > answers.I ? 'E' : 'I') +
        (answers.S > answers.N ? 'S' : 'N') +
        (answers.T > answers.F ? 'T' : 'F') +
        (answers.J > answers.P ? 'J' : 'P');

    showResultWithType(mbtiType);
}

// タイプを指定して結果を表示
function showResultWithType(mbtiType) {
    showScreen(resultScreen);

    // タイプの表示
    mbtiTypeElement.textContent = mbtiType;
    typeDescriptionElement.textContent = typeDescriptions[mbtiType] || '';

    // 推薦書籍の表示
    const books = bookRecommendations[mbtiType] || [];
    booksListElement.innerHTML = '';

    if (books.length === 0) {
        booksListElement.innerHTML = '<p>推薦書籍のデータが見つかりませんでした。</p>';
        return;
    }

    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        
        bookCard.innerHTML = `
            <div class="book-title">${book.title}</div>
            <div class="book-author">著者: ${book.author}</div>
            <div class="book-description">${book.description}</div>
            <a href="${book.amazonUrl}" target="_blank" class="amazon-link">
                📚 Amazonで見る
            </a>
        `;
        
        booksListElement.appendChild(bookCard);
    });
}

// 再診断
restartBtn.addEventListener('click', () => {
    // 状態のリセット
    currentQuestionIndex = 0;
    answers = {
        E: 0, I: 0,
        S: 0, N: 0,
        T: 0, F: 0,
        J: 0, P: 0
    };
    
    // 画面の切り替え
    showScreen(questionScreen);
    showQuestion();
});

// ホームに戻る
homeBtn.addEventListener('click', () => {
    showScreen(homeScreen);
});
