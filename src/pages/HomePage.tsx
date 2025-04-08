import { useEffect, useState } from "react";
import { PostType } from "../Types/PostType";
import { getPostsListApi } from "../ApiAdapter/GetPostList";
import PostListItem from "../components/PostListItem";

/**
 * HomePageコンポーネント
 * -トップページ
 */
function HomePage() {
  // 記事データを管理
  const [posts, setPosts] = useState<PostType[]>([]);

  /**
   * 記事一覧データ取得処理
   */
  const getPosts = async () => {
    // 記事一覧データを取得
    const data = await getPostsListApi();

    if (data.length === 0) {
      console.warn("記事が存在しません");
      return;
    }
    setPosts(data);
    console.log(data);
  };

  /**
   * 初期表示処理
   */
  useEffect(() => {
    getPosts();
  }, []);

  /**
   * 記事一覧表示処理
   */
  const postsList = posts.map((post) => {
    return <PostListItem key={post.id} post={post} />;
  });

  return (
    <div>
      {/* ページタイトルエリア */}
      <h2>ホームページ</h2>

      {/* 記事一覧エリア */}
      <ul>{postsList}</ul>
    </div>
  );
}

export default HomePage;
