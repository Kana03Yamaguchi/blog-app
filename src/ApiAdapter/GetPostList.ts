import axios from "axios";
import { PostType } from "../Types/PostType";

/**
 * 記事一覧取得
 * - 外部APIから記事一覧データを取得する
 * @returns PostType[] の Promise
 */
export const getPostsListApi = async (): Promise<PostType[]> => {
  try {
    const response = await axios.get<PostType[]>(
      "https://jsonplaceholder.typicode.com/posts"
    );
    // 成功時は取得データを返却
    return response.data;
  } catch {
    // 失敗時は空配列を返却
    return [];
  }
};
