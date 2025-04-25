import axios from "axios";
import { CommentType } from "../Types/CommentType";

/**
 * コメント一覧取得
 * - 外部APIからコメント一覧データを取得する
 * @param postId 紐づく記事ID
 * @returns CommentType[] の Promise
 */
export const getCommentListApi = async (
  postId: number
): Promise<CommentType[]> => {
  try {
    const response = await axios.get<CommentType[]>(
      // APIサーバーのURL
      "/api/posts/" + postId + "/comments"
    );
    // 成功時は取得データを返却
    return response.data;
  } catch {
    // 失敗時は空配列を返却
    return [];
  }
};
