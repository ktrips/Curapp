// アプリケーションの状態管理
let currentQuestionIndex = 0;
let answers = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
};

// 保存した本のデータ管理
let savedBooks = [];
let currentEditingBookId = null;
let affiliateTag = ''; // Amazonアフィリエイトタグ

// DOM要素の取得
const homeScreen = document.getElementById('home-screen');
const mbtiInputScreen = document.getElementById('mbti-input-screen');
const strengthInputScreen = document.getElementById('strength-input-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');
const savedBooksScreen = document.getElementById('saved-books-screen');
const bookDetailScreen = document.getElementById('book-detail-screen');
const settingsScreen = document.getElementById('settings-screen');

const headerMyBooksBtn = document.getElementById('header-my-books-btn');
const headerSettingsBtn = document.getElementById('header-settings-btn');
const settingsBackBtn = document.getElementById('settings-back-btn');
const affiliateTagInput = document.getElementById('affiliate-tag');
const saveSettingsBtn = document.getElementById('save-settings-btn');

const mbtiInputBtn = document.getElementById('mbti-input-btn');
const strengthInputBtn = document.getElementById('strength-input-btn');
const diagnosisBtn = document.getElementById('diagnosis-btn');
const savedBooksBtn = document.getElementById('saved-books-btn');
const savedBooksBackBtn = document.getElementById('saved-books-back-btn');

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

const savedBooksListElement = document.getElementById('saved-books-list');
const detailBookTitle = document.getElementById('detail-book-title');
const detailBookAuthor = document.getElementById('detail-book-author');
const detailBookDescription = document.getElementById('detail-book-description');
const starRating = document.getElementById('star-rating');
const ratingText = document.getElementById('rating-text');
const bookReview = document.getElementById('book-review');
const saveReviewBtn = document.getElementById('save-review-btn');
const deleteBookBtn = document.getElementById('delete-book-btn');
const detailBackBtn = document.getElementById('detail-back-btn');

// 画面遷移関数
function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}

// ローカルストレージから保存した本を読み込む
function loadSavedBooks() {
    const saved = localStorage.getItem('savedBooks');
    if (saved) {
        savedBooks = JSON.parse(saved);
        // 既存のデータにstatusがない場合はデフォルトで'want-to-read'を設定
        savedBooks = savedBooks.map(book => {
            if (!book.status) {
                book.status = 'want-to-read';
            }
            return book;
        });
        saveSavedBooks(); // 更新したデータを保存
    }
}

// ローカルストレージに保存した本を保存
function saveSavedBooks() {
    localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
}

// アフィリエイトタグを読み込む
function loadAffiliateTag() {
    const saved = localStorage.getItem('affiliateTag');
    if (saved) {
        affiliateTag = saved;
        if (affiliateTagInput) {
            affiliateTagInput.value = affiliateTag;
        }
    }
}

// アフィリエイトタグを保存
function saveAffiliateTag() {
    localStorage.setItem('affiliateTag', affiliateTag);
}

// Amazonリンクにアフィリエイトタグを追加
function addAffiliateTagToUrl(url) {
    if (!affiliateTag || !url) return url;
    
    try {
        const urlObj = new URL(url);
        urlObj.searchParams.set('tag', affiliateTag);
        return urlObj.toString();
    } catch (e) {
        // URLが無効な場合は元のURLを返す
        return url;
    }
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

savedBooksBtn.addEventListener('click', () => {
    loadSavedBooks();
    showSavedBooksList();
    showScreen(savedBooksScreen);
});

headerMyBooksBtn.addEventListener('click', () => {
    loadSavedBooks();
    showSavedBooksList();
    showScreen(savedBooksScreen);
});

headerSettingsBtn.addEventListener('click', () => {
    loadAffiliateTag();
    showScreen(settingsScreen);
});

settingsBackBtn.addEventListener('click', () => {
    showScreen(homeScreen);
});

saveSettingsBtn.addEventListener('click', () => {
    affiliateTag = affiliateTagInput.value.trim();
    saveAffiliateTag();
    alert('設定を保存しました！');
    showScreen(homeScreen);
});

savedBooksBackBtn.addEventListener('click', () => {
    showScreen(homeScreen);
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
    
    // 保存した本を読み込む
    loadSavedBooks();

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

    books.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        
        // 既存の本をチェック（タイトルと著者で判定）
        const existingBook = savedBooks.find(b => b.title === book.title && b.author === book.author);
        const isSaved = !!existingBook;
        const bookId = existingBook ? existingBook.id : `${mbtiType}-${book.title}-${book.author}-${Date.now()}`;
        
        bookCard.innerHTML = `
            <div class="book-title">${book.title}</div>
            <div class="book-author">著者: ${book.author}</div>
            <div class="book-description">${book.description}</div>
            <div style="display: flex; gap: 10px; margin-top: 15px; flex-wrap: wrap;">
                <a href="${addAffiliateTagToUrl(book.amazonUrl)}" target="_blank" class="amazon-link">
                    📚 Amazonで見る
                </a>
                <button class="save-book-btn ${isSaved ? 'saved' : ''}" data-book-id="${bookId}" data-book-title="${book.title}" data-book-author="${book.author}" data-book-description="${book.description}" data-book-url="${book.amazonUrl}">
                    ${isSaved ? '✓ 保存済み' : '💾 保存する'}
                </button>
            </div>
        `;
        
        booksListElement.appendChild(bookCard);
    });
    
    // 保存ボタンのイベントリスナーを追加
    document.querySelectorAll('.save-book-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const bookTitle = e.target.dataset.bookTitle;
            const bookAuthor = e.target.dataset.bookAuthor;
            
            // 既存の本をチェック
            const existingIndex = savedBooks.findIndex(b => b.title === bookTitle && b.author === bookAuthor);
            
            if (existingIndex === -1) {
                // 新しい本を保存
                const bookId = e.target.dataset.bookId;
                const book = {
                    id: bookId,
                    title: bookTitle,
                    author: bookAuthor,
                    description: e.target.dataset.bookDescription,
                    amazonUrl: e.target.dataset.bookUrl,
                    status: 'want-to-read', // デフォルトは「読みたい」
                    rating: 0,
                    review: '',
                    savedAt: new Date().toISOString()
                };
                
                savedBooks.push(book);
                e.target.textContent = '✓ 保存済み';
                e.target.classList.add('saved');
                saveSavedBooks();
                alert('本を保存しました！');
            } else {
                // 既に保存されている場合は詳細画面を開く
                showBookDetail(savedBooks[existingIndex].id);
            }
        });
    });
}

// 保存した本のリストを表示
function showSavedBooksList() {
    loadSavedBooks();
    savedBooksListElement.innerHTML = '';
    
    // 各状態の本の数をカウント
    const stats = {
        'want-to-read': savedBooks.filter(b => b.status === 'want-to-read').length,
        'reading': savedBooks.filter(b => b.status === 'reading').length,
        'read': savedBooks.filter(b => b.status === 'read').length
    };
    
    // 統計を表示
    document.getElementById('stat-want-to-read').textContent = stats['want-to-read'];
    document.getElementById('stat-reading').textContent = stats['reading'];
    document.getElementById('stat-read').textContent = stats['read'];
    
    if (savedBooks.length === 0) {
        savedBooksListElement.innerHTML = `
            <div class="empty-saved-books">
                <div class="empty-saved-books-icon">📚</div>
                <p>まだ保存した本がありません</p>
                <p>推薦された本を保存して、評価と書評を追加しましょう</p>
            </div>
        `;
        return;
    }
    
    savedBooks.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.className = 'saved-book-item';
        
        // 状態の表示
        const statusLabels = {
            'want-to-read': '📖 読みたい',
            'reading': '📚 読んでる',
            'read': '✅ 読んだ！'
        };
        const statusLabel = statusLabels[book.status] || statusLabels['want-to-read'];
        
        const ratingStars = '⭐'.repeat(book.rating || 0);
        const reviewPreview = book.review ? (book.review.length > 100 ? book.review.substring(0, 100) + '...' : book.review) : '';
        
        const amazonLink = book.amazonUrl ? addAffiliateTagToUrl(book.amazonUrl) : '#';
        
        bookItem.innerHTML = `
            <div class="saved-book-item-header">
                <div>
                    <div class="saved-book-title">${book.title}</div>
                    <div class="saved-book-author">著者: ${book.author}</div>
                    <div class="saved-book-status">${statusLabel}</div>
                </div>
                <div class="saved-book-rating">${ratingStars || '未評価'}</div>
            </div>
            ${book.status === 'read' && reviewPreview ? `<div class="saved-book-review-preview">${reviewPreview}</div>` : ''}
            ${book.amazonUrl ? `<div style="margin-top: 10px;"><a href="${amazonLink}" target="_blank" class="amazon-link" style="display: inline-block;">📚 Amazonで見る</a></div>` : ''}
        `;
        
        bookItem.addEventListener('click', () => {
            showBookDetail(book.id);
        });
        
        savedBooksListElement.appendChild(bookItem);
    });
}

// 本の詳細画面を表示
function showBookDetail(bookId) {
    loadSavedBooks();
    const book = savedBooks.find(b => b.id === bookId);
    
    if (!book) {
        alert('本が見つかりませんでした');
        return;
    }
    
    currentEditingBookId = bookId;
    detailBookTitle.textContent = book.title;
    detailBookAuthor.textContent = `著者: ${book.author}`;
    detailBookDescription.textContent = book.description;
    bookReview.value = book.review || '';
    
    // 状態の設定（デフォルトは「読みたい」）
    const currentStatus = book.status || 'want-to-read';
    updateStatusButtons(currentStatus);
    
    // 状態ボタンのクリックイベント
    document.querySelectorAll('.status-btn').forEach(btn => {
        btn.onclick = () => {
            const newStatus = btn.dataset.status;
            updateStatusButtons(newStatus);
            // 状態に応じて評価・書評セクションの表示を切り替え
            toggleRatingAndReview(newStatus);
        };
    });
    
    // 星評価の表示
    updateStarRating(book.rating || 0);
    
    // 星評価のクリックイベント
    starRating.querySelectorAll('.star').forEach((star, index) => {
        star.onclick = () => {
            const rating = index + 1;
            updateStarRating(rating);
        };
    });
    
    // 初期状態に応じて評価・書評セクションの表示を設定
    toggleRatingAndReview(currentStatus);
    
    showScreen(bookDetailScreen);
}

// 状態ボタンの表示を更新
function updateStatusButtons(status) {
    document.querySelectorAll('.status-btn').forEach(btn => {
        if (btn.dataset.status === status) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// 状態に応じて評価・書評セクションの表示を切り替え
function toggleRatingAndReview(status) {
    const ratingSection = document.getElementById('rating-section');
    const reviewSection = document.getElementById('review-section');
    
    if (status === 'read') {
        // 「読んだ！」状態の時のみ評価と書評を表示
        ratingSection.style.display = 'block';
        reviewSection.style.display = 'block';
    } else {
        // 「読みたい」「読んでる」状態の時は非表示
        ratingSection.style.display = 'none';
        reviewSection.style.display = 'none';
    }
}

// 星評価を更新
function updateStarRating(rating) {
    const stars = starRating.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
    
    const ratingTexts = ['', '⭐ 1つ星', '⭐⭐ 2つ星', '⭐⭐⭐ 3つ星', '⭐⭐⭐⭐ 4つ星', '⭐⭐⭐⭐⭐ 5つ星'];
    ratingText.textContent = ratingTexts[rating] || '評価を選択してください';
}

// レビューを保存
saveReviewBtn.addEventListener('click', () => {
    if (!currentEditingBookId) return;
    
    loadSavedBooks();
    const bookIndex = savedBooks.findIndex(b => b.id === currentEditingBookId);
    
    if (bookIndex === -1) {
        alert('本が見つかりませんでした');
        return;
    }
    
    // 現在選択されている状態を取得
    const activeStatusBtn = document.querySelector('.status-btn.active');
    const newStatus = activeStatusBtn ? activeStatusBtn.dataset.status : 'want-to-read';
    
    savedBooks[bookIndex].status = newStatus;
    
    // 「読んだ！」状態の時のみ評価と書評を保存
    if (newStatus === 'read') {
        const stars = starRating.querySelectorAll('.star.active');
        const rating = stars.length;
        savedBooks[bookIndex].rating = rating;
        savedBooks[bookIndex].review = bookReview.value;
    } else {
        // 「読みたい」「読んでる」状態の時は評価と書評をクリア
        savedBooks[bookIndex].rating = 0;
        savedBooks[bookIndex].review = '';
    }
    
    saveSavedBooks();
    showSavedBooksList();
    showScreen(savedBooksScreen);
    
    alert('保存しました！');
});

// 本を削除
deleteBookBtn.addEventListener('click', () => {
    if (!currentEditingBookId) return;
    
    if (!confirm('この本を削除しますか？')) {
        return;
    }
    
    loadSavedBooks();
    savedBooks = savedBooks.filter(b => b.id !== currentEditingBookId);
    saveSavedBooks();
    showSavedBooksList();
    showScreen(savedBooksScreen);
    
    alert('削除しました');
});

// 詳細画面から戻る
detailBackBtn.addEventListener('click', () => {
    showSavedBooksList();
    showScreen(savedBooksScreen);
});

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

// アプリケーション起動時に保存した本とアフィリエイトタグを読み込む
loadSavedBooks();
loadAffiliateTag();
