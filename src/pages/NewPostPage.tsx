import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postPostApi } from "../ApiAdapter/PostPost";

/**
 * NewPostPageコンポーネント
 * - 記事作成ページ
 */
function NewPostPage() {
  // タイトルの状態を管理
  const [title, setTitle] = useState("");
  // 本文の状態を管理
  const [content, setContent] = useState("");
  // ページ遷移用のフック
  const navigate = useNavigate();

  /**
   * メモ化
   */
  // タイトルの入力変更時の関数
  const titleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);
  // 本文の入力変更時の関数
  const contentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
    },
    []
  );

  /**
   * フォーム送信時の処理
   * - 成功：トップページへ戻る
   * - 失敗：アラート表示
   */
  const handleSubmit = async (e: React.FormEvent) => {
    // デフォルトのフォーム送信（ページリロード）を防止
    e.preventDefault();

    // 記事作成APIを呼び出し
    const success = await postPostApi(title, content);

    if (success) {
      // 成功：記事一覧ページ（トップ）へ遷移
      navigate("/");
    } else {
      // 失敗：アラート表示
      alert("記事の作成に失敗しました");
    }
  };

  return (
    <div>
      <h2>記事を作成</h2>
      {/* フォームエリア */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>タイトル：</label>
          <input type="text" value={title} onChange={titleChange} />
        </div>
        <div>
          <label>本文：</label>
          <textarea value={content} onChange={contentChange} />
        </div>
        <button type="submit">投稿</button>
      </form>
    </div>
  );
}

export default NewPostPage;
