import { useNavigate, useParams } from "react-router-dom";
import { PostType } from "../Types/PostType";
import { useCallback, useEffect, useState } from "react";
import { getPostDetailApi } from "../ApiAdapter/GetPostDetail";
import styles from "./PostDetailPage.module.css";
import { CommentType } from "../Types/CommentType";
import { getCommentListApi } from "../ApiAdapter/GetCommentList";
import { deletePostApi } from "../ApiAdapter/DeletePost";
import { motion } from "framer-motion";

/**
 * PostDetailPageコンポーネント
 * - 記事詳細ページ
 */
function PostDetailPage() {
  // ローディング状態を管理
  const [loading, setLoading] = useState<boolean>(true);
  // エラーメッセージを管理
  const [errorMsg, setErrorMsg] = useState<string>("");
  // 記事詳細を管理
  const [postDetail, setPostDetail] = useState<PostType>();
  // コメント一覧データを管理
  const [comments, setComments] = useState<CommentType[]>([]);
  // URLパラメータを取得
  const urlParams = useParams<{ id: string }>();
  // URLパラメータID
  const postId = Number(urlParams.id);
  // 記事一覧遷移用の関数を取得
  const navigate = useNavigate();

  /**
   * メモ化
   */
  // 記事を編集画面へ遷移する関数
  const handleEditClick = useCallback(() => {
    navigate("/posts/" + postId + "/edit");
  }, [navigate, postId]);

  // 記事を削除してに記事一覧画面に戻る関数
  const handleDeleteClick = useCallback(async () => {
    const result = window.confirm("この記事を本当に削除してもよいですか？");

    if (result) {
      // 記事削除APIを呼び出し
      const success = await deletePostApi(postId);
      if (success) {
        // 成功：記事一覧ページ（トップ）へ遷移
        navigate("/");
      } else {
        // 失敗：アラート表示
        alert("記事の削除に失敗しました");
      }
    }
  }, [navigate, postId]);

  // 記事一覧画面に戻る関数
  const handleBackClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

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
        return;
      }
      setPostDetail(postData);

      // コメント一覧データを取得
      const commentData = await getCommentListApi(postId);
      if (commentData.length === 0) {
        setErrorMsg("コメントが存在しません");
        return;
      }
      setComments(commentData);

      // ローディング終了
      setLoading(false);
    })();
  }, [postId]);

  const commentList = comments.map((comment) => {
    return (
      <li key={comment.id}>
        {comment.name}：{comment.body}
      </li>
    );
  });

  return (
    <motion.div
      className={styles.postBox}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ページタイトルエリア */}
      <h2 className={styles.title}>{postDetail?.title ?? "記事詳細"}</h2>

      {/* エラー表示エリア */}
      {errorMsg && <p>{errorMsg}</p>}

      {/* ローディング中表示 */}
      {loading ? (
        <p>ローディング中...</p>
      ) : (
        <>
          {/* 記事内容エリア */}
          <p className={styles.body}>
            {postDetail?.content ?? "選択された記事の内容が表示"}
          </p>

          {/* コメント一覧エリア */}
          <h3>コメント一覧</h3>
          <div className={styles.commentBox}>
            <ul>{commentList}</ul>
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

          {/* 記事編集ボタン */}
          <div>
            <button
              className={styles.editbutton}
              onClick={handleEditClick}
              type="button"
            >
              編集
            </button>

            {/* 記事削除ボタン */}
            <button
              className={styles.deletebutton}
              onClick={handleDeleteClick}
              type="button"
            >
              削除
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default PostDetailPage;
