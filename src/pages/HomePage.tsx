import { useEffect, useState } from "react";
import { PostType } from "../Types/PostType";
import { getPostsListApi } from "../ApiAdapter/GetPostList";
import PostListItem from "../components/PostListItem";
import styles from "./HomePage.module.css";
import appStyles from "../App.module.css";
import Pagination from "../components/Pagination";

/**
 * HomePageコンポーネント
 * -トップページ
 */
function HomePage() {
  // ローディング状態を管理
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // エラーメッセージを管理
  const [errorMsg, setErrorMsg] = useState<string>("");
  // 記事一覧データを管理
  const [posts, setPosts] = useState<PostType[]>([]);
  // ページ番号を管理
  const [currentPage, setCurrentPage] = useState<number>(1);
  // 1ページあたりの表示件数
  const postsPerPage = 5;

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

  /**
   * 記事一覧データ取得処理
   */
  const getPosts = async () => {
    // ローディング開始
    setIsLoading(true);
    // エラーメッセージ初期化
    setErrorMsg("");

    // 記事一覧データを取得
    const data = await getPostsListApi();

    if (data.length === 0) {
      setErrorMsg("記事が存在しません");
      // ローディング終了
      setIsLoading(false);
      return;
    }

    setPosts(data);
    // ローディング終了
    setIsLoading(false);
  };

  /**
   * 記事一覧表示処理
   */
  const postsList = pagePosts.map((post) => {
    return <PostListItem key={post.id} post={post} />;
  });

  /**
   * 初期表示処理
   */
  useEffect(() => {
    getPosts();
  }, []);

  // ページ切り替え時にスクロールをトップへ移動
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className={appStyles.container}>
      {/* ページタイトルエリア */}
      <h2 className={styles.title}>記事一覧</h2>

      {/* エラー表示エリア */}
      {errorMsg && <p>{errorMsg}</p>}

      {/* ローディング中表示 */}
      {isLoading ? (
        <p>ローディング中...</p>
      ) : (
        <>
          {/* 記事一覧エリア */}
          <ul className={styles.list}>{postsList}</ul>
          {/* ページネーション */}
          <Pagination
            totalPosts={posts.length}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

export default HomePage;
