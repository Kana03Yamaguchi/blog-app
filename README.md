# ブログアプリ

## 概要

- シンプルなブログ投稿・閲覧アプリ
- 記事の新規投稿・編集・削除・詳細閲覧が可能
- フェードインやホバー時のアニメーション付きで、使いやすく柔らかい UI を実現
- ページネーションやローディングスケルトンで快適な一覧表示を提供

## 機能一覧

- 記事一覧の取得（API 経由）
- 記事の新規投稿（タイトル・本文の入力、バリデーションあり）
- 記事の詳細表示（コメント一覧付き）
- 記事の編集（タイトル・本文の更新）
- 記事の削除（確認ダイアログあり）
- 一覧画面への戻るボタン
- ページネーション（5 件ずつ表示）
- ホバーアニメーション（ボタン・リンク）
- ローディング表示（react-loading-skeleton）
- アニメーション付きの画面遷移（Framer Motion）

## 技術スタック

- TypeScript
- React
- React Router
- Framer Motion
- react-loading-skeleton
- CSS Modules
- Vite

## 使い方

```bash
git clone https://github.com/Kana03Yamaguchi/blog-app.git
cd blog-app
npm install
npm run dev
```

## 今後の改善案

- コメント投稿機能の追加
- 記事の検索・タグ機能
- 認証（ログイン／ログアウト）機能
- 投稿順の並び替え
- 管理画面の追加
