import axios from "axios";

/**
 * 記事編集
 * - 入力されたタイトルと本文を使って記事を更新する
 * @param id - 記事ID
 * @param title - 記事タイトル
 * @param content - 記事本文
 */
export const putPostApi = async (
  id: number,
  title: string,
  content: string
): Promise<boolean> => {
  try {
    await axios.put(import.meta.env.VITE_API_URL + "/api/posts/" + id, {
      title,
      content,
    });
    return true;
  } catch (error) {
    console.error("記事編集に失敗しました", error);
    return false;
  }
};
