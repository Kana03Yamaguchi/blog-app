import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostDetailApi } from "../ApiAdapter/GetPostDetail";
import { PostType } from "../Types/PostType";
import { putPostApi } from "../ApiAdapter/PutPost";

function EditPostPage() {
  // ローディング状態を管理
  const [loading, setLoading] = useState<boolean>(true);
  // エラーメッセージを管理
  const [errorMsg, setErrorMsg] = useState<string>("");
  // 記事詳細を管理
  const [postDetail, setPostDetail] = useState<PostType>();
  // タイトルの状態を管理
  const [title, setTitle] = useState("");
  // 本文の状態を管理
  const [content, setContent] = useState("");
  // ページ遷移用のフック
  const navigate = useNavigate();
  // URLパラメータを取得
  const urlParams = useParams<{ id: string }>();
  // URLパラメータID
  const postId = Number(urlParams.id);

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

    // 記事編集APIを呼び出し
    const success = await putPostApi(postId, title, content);

    if (success) {
      // 成功：記事一覧ページ（トップ）へ遷移
      navigate("/");
    } else {
      // 失敗：アラート表示
      alert("記事の作成に失敗しました");
    }
  };

  /**
   * 初期表示処理
   */
  useEffect(() => {
    (async () => {
      // ローディング開始
      setLoading(true);
      // エラーメッセージ初期化
      setErrorMsg("");

      // 記事詳細データを取得
      const postData = await getPostDetailApi(postId);
      if (!postData) {
        setErrorMsg("記事詳細が存在しません");
        // ローディング終了
        setLoading(false);
        return;
      }
      setPostDetail(postData);
      setTitle(postData.title);
      setContent(postData.content);

      // ローディング終了
      setLoading(false);
    })();
  }, [postId]);

  return (
    <div>
      <h2>記事を編集</h2>
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

export default EditPostPage;
