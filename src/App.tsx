import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import styles from "./App.module.css";
import React, { Suspense } from "react";
import { AnimatePresence } from "framer-motion";

// 遅延読み込み
const PostDetailPage = React.lazy(() => import("./pages/PostDetailPage"));
const NewPostPage = React.lazy(() => import("./pages/NewPostPage"));
const EditPostPage = React.lazy(() => import("./pages/EditPostPage"));

/**
 * Appコンポーネント
 * - アプリ全体のレイアウトとルーティングを管理
 */
function App() {
  return (
    <div className={styles.container}>
      {/* ヘッダーエリア */}
      <header className={styles.header}>
        <h1>Blog</h1>
      </header>

      {/* メインコンテンツエリア：ページごとの表示切り替え */}
      <main className={styles.main}>
        <Suspense fallback={<p>Loading...</p>}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/posts/:id" element={<PostDetailPage />} />
            <Route path="/posts/new" element={<NewPostPage />} />
            <Route path="/posts/:id/edit" element={<EditPostPage />} />
          </Routes>
          </AnimatePresence>
        </Suspense>
      </main>

      {/* フッターエリア */}
      <footer className={styles.footer}>
        <p>&copy; 2025 KanaYamaguchi</p>
      </footer>
    </div>
  );
}

export default App;
