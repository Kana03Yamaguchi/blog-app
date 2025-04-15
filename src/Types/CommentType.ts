/**
 * 型定義：CommentType
 * - API から取得するコメントデータの型定義
 */
export interface CommentType {
  postId: number; // コメントに紐づく記事ID
  id: number; // コメントID
  name: string; // コメント者の名前
  email: string; // コメント者のメールアドレス
  body: string; // コメントの本文
}
