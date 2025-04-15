import { useNavigate, useParams } from "react-router-dom";
import { PostType } from "../Types/PostType";
import { useCallback, useEffect, useState } from "react";
import { getPostDetailApi } from "../ApiAdapter/GetPostDetail";
import styles from "./PostDetailPage.module.css";
import { CommentType } from "../Types/CommentType";
import { getCommentListApi } from "../ApiAdapter/GetCommentList";

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
  // 記事一覧遷移用の関数を取得
  const navigate = useNavigate();

  /**
   * メモ化
   */
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

      // URLパラメータSID
      const postId = Number(urlParams.id);

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
  }, [urlParams.id]);

  const commentList = comments.map((comment) => {
    return (
      <li key={comment.id}>
        {comment.name}：{comment.body}
      </li>
    );
  });

  return (
    <div className={styles.container}>
      {/* ページタイトルエリア */}
      <h2 className={styles.title}>{postDetail?.title ?? "記事詳細ページ"}</h2>

      {/* エラー表示エリア */}
      {errorMsg && <p>{errorMsg}</p>}

      {/* ローディング中表示 */}
      {loading ? (
        <p>ローディング中...</p>
      ) : (
        <>
          {/* 記事内容エリア */}
          <p className={styles.body}>
            {postDetail?.body ?? "選択された記事の内容が表示"}
          </p>
          {/* コメント一覧エリア */}
          <h3>コメント一覧</h3>
          <ul>{commentList}</ul>

          {/* 記事一覧ページに戻るボタン */}
          <button onClick={handleBackClick}>一覧に戻る</button>
        </>
      )}
    </div>
  );
}

export default PostDetailPage;
