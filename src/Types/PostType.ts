/**
 * 型定義：PostType
 * - API から取得する記事データの構造を定義
 */
export interface PostType {
  userId: number; // 投稿ユーザーのID
  id: number; // 記事ID
  title: string; // 記事のタイトル
  body: string; // 記事の本文
}
