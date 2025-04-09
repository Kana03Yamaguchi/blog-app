import { Link } from "react-router-dom";
import { PostType } from "../Types/PostType";
import styles from "./PostListItem.module.css";

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
  return (
    <li>
      <Link className={styles.link} to={"/posts/" + props.post.id}>
        {props.post.title}
      </Link>
    </li>
  );
}

export default PostListItem;
