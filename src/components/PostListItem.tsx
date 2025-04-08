import { Link } from "react-router-dom";
import { PostType } from "../Types/PostType";

/**
 * props定義
 */
interface PostListItemProps {
  post: PostType; // 記事データ
}

/**
 * PostListItemコンポーネント
 * - 個々の記事タイトルを表示
 */
function PostListItem(props: PostListItemProps) {
  // 対象の記事詳細ページに遷移
  return <Link to={"/posts/" + props.post.id}>{props.post.title}</Link>;
}

export default PostListItem;
