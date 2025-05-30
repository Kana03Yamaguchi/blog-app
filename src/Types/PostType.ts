/**
 * 型定義：PostType
 * - APIから取得する記事データの型定義
 */
export interface PostType {
  id: number; // 記事ID
  title: string; // 記事のタイトル
  content: string; // 記事の本文
  createdAt: string; // 作成日時
  updatedAt: string; // 更新日時
}
