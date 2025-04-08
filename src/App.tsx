import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import PostDetailPage from "./pages/PostDetailPage";

/**
 * Appコンポーネント
 * - アプリ全体のレイアウトとルーティングを管理
 */
function App() {
  return (
    <div>
      {/* ヘッダーエリア */}
      <header>
        <h1>ブログアプリ</h1>
      </header>

      {/* メインコンテンツエリア：ページごとの表示切り替え */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
        </Routes>
      </main>

      {/* フッターエリア */}
      <footer>
        <p>&copy; 2025 KanaYamaguchi</p>
      </footer>
    </div>
  );
}

export default App;
