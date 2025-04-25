import axios from "axios";

/**
 * 記事作成
 * - 入力されたタイトルと本文を使って記事を新規登録する
 * @param title - 記事タイトル
 * @param content - 記事本文
 */
export const postPostApi = async (
  title: string,
  content: string
): Promise<boolean> => {
  try {
    await axios.post("/api/posts", { title, content });
    return true;
  } catch (error) {
    console.error("記事作成に失敗しました", error);
    return false;
  }
};
