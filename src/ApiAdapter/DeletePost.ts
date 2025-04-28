import axios from "axios";

/**
 * 記事削除
 * - 指定されたIDの記事を削除する
 * @param id - 記事ID
 */
export const deletePostApi = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(import.meta.env.VITE_API_URL + "/api/posts/" + id);
    return true;
  } catch (error) {
    console.error("記事削除に失敗しました", error);
    return false;
  }
};
