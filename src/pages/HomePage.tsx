import { Suspense, useEffect, useState } from "react";
import { getPostsListApi } from "../ApiAdapter/GetPostList";
import styles from "../styles/HomePage.module.css";
import appStyles from "../App.module.css";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import React from "react";
import { useQuery } from "@tanstack/react-query";

// 遅延読み込み
const PostList = React.lazy(() => import("../components/PostList"));

/**
 * HomePageコンポーネント
 * -トップページ
 */
function HomePage() {
  // ページ番号を管理
  const [currentPage, setCurrentPage] = useState<number>(1);
  // 1ページあたりの表示件数
  const postsPerPage = 10;

  /**
   * 初期表示処理
   */
  // 記事一覧を取得（キャッシュ・ローディング・エラー状態も含む）
  const {
    data: posts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPostsListApi,
  });

  /**
   * ページごとの記事データを算出
   */
  // 開始インデックスを計算
  // 例：(1ページ目 - 1) * 5 = 0 → 0件目から表示
  const startIndex = (currentPage - 1) * postsPerPage;

  // 終了インデックスを計算
  // 例：0 + 5 = 5 →「0〜4件目」まで表示
  const endIndex = startIndex + postsPerPage;

  // 表示する記事一覧を切り出す
  // 例：posts[0]〜posts[4] を抽出
  const pagePosts = posts.slice(startIndex, endIndex);

  // ページ切り替え時にスクロールをトップへ移動
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <motion.div
      className={appStyles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ページタイトルエリア */}
      <h2 className={styles.title}>記事一覧</h2>

      {/* エラー表示エリア */}
      {error && <p className={styles.errorMessage}>エラーが発生しました</p>}

      {/* ローディング中表示 */}
      {isLoading ? (
        <Skeleton count={5} height={40} />
      ) : (
        <>
          {/* 記事作成ボタン */}
          <div className={styles.createButtonArea}>
            <Link to="/posts/new">
              <button className={styles.createButton}>＋ 新しく投稿する</button>
            </Link>
          </div>

          {/* 記事一覧エリア */}
          {/* PostListをSuspenseでラップして遅延読み込み */}
          <Suspense fallback={<div>Loading...</div>}>
            <PostList posts={pagePosts} />
          </Suspense>

          {/* ページネーション */}
          <Pagination
            totalPosts={posts.length}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </motion.div>
  );
}

export default HomePage;
