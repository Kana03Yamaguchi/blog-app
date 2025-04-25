/**
 * 型定義：PostType
 * - APIから取得する記事データの型定義
 */
export interface PostType {
  userId: number; // 投稿ユーザーのID
  id: number; // 記事ID
  title: string; // 記事のタイトル
  body: string; // 記事の本文
}
