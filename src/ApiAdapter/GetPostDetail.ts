import axios from "axios";
import { PostType } from "../Types/PostType";

/**
 * 記事詳細取得
 * - 外部APIから記事詳細データを取得する
 * @param id 取得記事ID
 * @returns PostType | null の Promise
 */
export const getPostDetailApi = async (
  id: number
): Promise<PostType | null> => {
  try {
    const response = await axios.get<PostType>(
      "https://jsonplaceholder.typicode.com/posts/" + id
    );
    // 成功時は取得データを返却
    return response.data;
  } catch (error) {
    console.error("API呼び出しエラー:", error);
    // 失敗時はnullを返却
    return null;
  }
};
