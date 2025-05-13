import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postPostApi } from "../ApiAdapter/PostPost";
import { motion } from "framer-motion";
import styles from "./NewPostPage.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
  // クライアントのインスタンスを取得
  const queryClient = useQueryClient();

  /**
   * 記事作成処理：mutation定義（投稿処理と成功時・失敗時の処理をまとめる）
   */
  const postMutation = useMutation({
    // 実行するAPI処理を定義（mutationFnに渡す）
    mutationFn: (data: { title: string; content: string }) =>
      postPostApi(data.title, data.content),

    // 投稿成功時の処理
    onSuccess: () => {
      // 記事一覧のキャッシュを無効化して再取得
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      // 記事一覧ページに遷移
      navigate("/");
    },
    // 投稿失敗時の処理
    onError: () => {
      alert("記事の作成に失敗しました");
    },
  });

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
   */
  const handleSubmit = async (e: React.FormEvent) => {
    // デフォルトのフォーム送信（ページリロード）を防止
    e.preventDefault();
    // 記事作成処理を実行
    postMutation.mutate({ title, content });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ページタイトルエリア */}
      <h2>記事を作成</h2>
      {/* フォームエリア */}
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        {/* 記事タイトル */}
        <div className={styles.formItem}>
          <label>タイトル：</label>
          <input
            className={styles.input}
            type="text"
            value={title}
            onChange={titleChange}
          />
        </div>

        {/* 記事本文 */}
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
    </motion.div>
  );
}

export default NewPostPage;
