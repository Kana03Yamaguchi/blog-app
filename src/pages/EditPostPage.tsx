import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostDetailApi } from "../ApiAdapter/GetPostDetail";
import { PostType } from "../Types/PostType";
import { putPostApi } from "../ApiAdapter/PutPost";
import { motion } from "framer-motion";
import styles from "./EditPostPage.module.css";

/**
 * EditPostPageコンポーネント
 * - 記事編集ページ
 */
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

  // 記事一覧画面に戻る関数
  const handleBackClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ページタイトルエリア */}
      <h2>{postDetail?.title ?? "記事を編集"}</h2>

      {/* エラー表示エリア */}
      {errorMsg && <p>{errorMsg}</p>}

      {/* ローディング中表示 */}
      {loading ? (
        <p>ローディング中...</p>
      ) : (
        <>
          {/* フォームエリア */}
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.formItem}>
              <label>タイトル：</label>
              <input
                className={styles.input}
                type="text"
                value={title}
                onChange={titleChange}
              />
            </div>

            <div className={styles.formItem}>
              <label>本文：</label>
              <textarea
                className={styles.textarea}
                value={content}
                onChange={contentChange}
              />
            </div>

            {/* 投稿ボタン */}
            <div>
              <button className={styles.submitButton} type="submit">
                投稿
              </button>
            </div>

            {/* 記事一覧ページに戻るボタン */}
            <div>
              <button
                onClick={handleBackClick}
                className={styles.backButton}
                type="button"
              >
                一覧に戻る
              </button>
            </div>
          </form>
        </>
      )}
    </motion.div>
  );
}

export default EditPostPage;
