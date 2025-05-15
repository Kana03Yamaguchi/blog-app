import { motion } from "framer-motion";
import { PostType } from "../Types/PostType";
import PostListItem from "./PostListItem";
import styles from "../styles/PostList.module.css";

/**
 * props定義
 */
interface PostListProps {
  posts: PostType[];
}

// 親のアニメーション設定（子を順番に出す）
const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      // 子を0.15秒ずつずらして表示
      staggerChildren: 0.15,
      duration: 1.5,
    },
  },
};

// 子のアニメーション設定
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

/**
 * PostListコンポーネント
 * - 全体の記事タイトルを表示
 */
function PostList(props: PostListProps) {
  // 記事一覧を表示するためのリストを作成
  const postListItems = props.posts.map((post) => {
    return (
      <motion.li key={post.id} variants={itemVariants}>
        <PostListItem post={post} />
      </motion.li>
    );
  });

  return (
    <motion.ul
      className={styles.postList}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {postListItems}
    </motion.ul>
  );
}

export default PostList;
