import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostDetailPage from "./pages/PostDetailPage";
import styles from "./App.module.css";
import NewPostPage from "./pages/NewPostPage";
import EditPostPage from "./pages/EditPostPage";

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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/posts/new" element={<NewPostPage />} />
          <Route path="/posts/:id/edit" element={<EditPostPage />} />
        </Routes>
      </main>

      {/* フッターエリア */}
      <footer className={styles.footer}>
        <p>&copy; 2025 KanaYamaguchi</p>
      </footer>
    </div>
  );
}

export default App;
