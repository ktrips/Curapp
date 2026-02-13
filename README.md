# MBTI性格診断 × 本の推薦アプリ

MBTI（Myers-Briggs Type Indicator）性格診断を行い、診断結果に基づいてあなたにぴったりの本を推薦するWebアプリケーションです。

## 機能

### 3つの入力方法
1. **MBTIタイプを直接入力**: 既に知っているMBTIタイプを選択して本を推薦
2. **Strength Finderの結果を入力**: Strength Finderの上位5つの強みを入力してMBTIタイプを推測し、本を推薦
3. **性格診断をする**: 16の質問に答えてMBTIタイプを診断し、本を推薦

### その他の機能
- **16種類の性格タイプ判定**: INTJ、INTP、ENTJ、ENTP、INFJ、INFP、ENFJ、ENFP、ISTJ、ISFJ、ESTJ、ESFJ、ISTP、ISFP、ESTP、ESFP
- **タイプ別の本の推薦**: 各MBTIタイプに最適な3冊の本を推薦
- **Amazonリンク生成**: 推薦された本のAmazon検索リンクを自動生成
- **Strength Finderマッピング**: Strength Finderの34の強みからMBTIタイプを推測

## 使い方

1. `index.html`をブラウザで開く
2. ホーム画面から3つの選択肢から1つを選ぶ：
   - **MBTIタイプを入力**: ドロップダウンからタイプを選択
   - **Strength Finderの結果を入力**: 上位5つの強みを入力
   - **性格診断をする**: 16の質問に答える
3. 診断結果と推薦書籍を確認
4. Amazonリンクから本を購入

## ファイル構成

```
Curapp/
├── index.html      # メインHTMLファイル
├── styles.css      # スタイルシート
├── app.js          # アプリケーションロジック
├── mbti-data.js    # MBTI質問データと書籍推薦データ
└── README.md       # このファイル
```

## 技術スタック

- HTML5
- CSS3（グラデーション、アニメーション）
- Vanilla JavaScript（フレームワークなし）

## ブラウザ対応

モダンブラウザ（Chrome、Firefox、Safari、Edge）で動作します。

## ライセンス

このプロジェクトは自由に使用・改変できます。
