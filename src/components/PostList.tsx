import { PostType } from "../Types/PostType";
import PostListItem from "./PostListItem";

/**
 * props定義
 */
interface PostListProps {
  posts: PostType[];
}

/**
 * PostListコンポーネント
 * - 全体の記事タイトルを表示
 */
function PostList(props: PostListProps) {
  /**
   * 記事一覧表示処理
   */
  const postListItems = props.posts.map((post) => {
    return <PostListItem key={post.id} post={post} />;
  });

  return <ul>{postListItems}</ul>;
}

export default PostList;
