import { useNavigate, useParams } from "react-router-dom";
import { useCallback } from "react";
import { getPostDetailApi } from "../ApiAdapter/GetPostDetail";
import styles from "./PostDetailPage.module.css";
import { deletePostApi } from "../ApiAdapter/DeletePost";
import { motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCommentListApi } from "../ApiAdapter/GetCommentList";
import Skeleton from "react-loading-skeleton";

/**
 * PostDetailPageコンポーネント
 * - 記事詳細ページ
 */
function PostDetailPage() {
  // URLパラメータを取得
  const urlParams = useParams<{ id: string }>();
  // URLパラメータID
  const postId = Number(urlParams.id);
  // 記事一覧遷移用の関数を取得
  const navigate = useNavigate();
  // クライアントのインスタンスを取得
  const queryClient = useQueryClient();

  /**
   * 初期表示処理
   */
  // 記事詳細データを取得（キャッシュキーにIDを含める）
  const {
    data: postDetail,
    isLoading: isPostLoading,
    error: postError,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostDetailApi(postId),
    // 1分間はキャッシュ有効
    staleTime: 1000 * 60,
  });
  // コメント一覧を取得（IDに紐づけ）
  const {
    data: comments = [],
    isLoading: isCommentLoading,
    error: commentError,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getCommentListApi(postId),
    // 1分間はキャッシュ有効
    staleTime: 1000 * 60,
  });

  // 記事削除処理：mutationを定義
  const deleteMutation = useMutation({
    // 実行するAPI処理を定義（mutationFnに渡す）
    mutationFn: (id: number) => deletePostApi(id),

    // 削除成功時の処理
    onSuccess: () => {
      // 記事一覧のキャッシュを無効化して再取得
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      // 記事一覧ページに遷移
      navigate("/");
    },
    // 削除失敗時の処理
    onError: () => {
      alert("記事の削除に失敗しました");
    },
  });

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
      // 記事削除処理を実行
      deleteMutation.mutate(postId);
    }
  }, [deleteMutation, postId]);

  // 記事一覧画面に戻る関数
  const handleBackClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  // コメント一覧を表示するためのリストを作成
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
      {postError && <p>記事が取得できませんでした</p>}
      {commentError && <p>コメントの取得に失敗しました</p>}

      {/* ローディング中表示 */}
      {isPostLoading || isCommentLoading ? (
        <>
          {/* タイトルスケルトン */}
          <Skeleton height={32} style={{ marginBottom: "16px" }} />

          {/* 本文スケルトン（3行分） */}
          <Skeleton count={3} height={20} style={{ marginBottom: "8px" }} />

          {/* コメント一覧の見出し */}
          <Skeleton width={120} height={24} style={{ margin: "24px 0 8px" }} />

          {/* コメント（2件分の例） */}
          <Skeleton count={2} height={20} style={{ marginBottom: "6px" }} />
        </>
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
