import { useCallback } from "react";
import styles from "./Pagination.module.css";

/**
 * props定義
 */
interface PaginationProps {
  totalPosts: number; // 総記事数
  postsPerPage: number; // 1ページあたりの記事数
  currentPage: number; // 現在のページ番号
  onPageChange: (page: number) => void; // ページ切り替え時に呼び出す関数
}

/**
 * Paginationコンポーネント
 * - ページネーションボタンの表示/ページの切り替え
 */
function Pagination(props: PaginationProps) {
  /**
   * メモ化
   */
  // 「前へ」ボタン押下時の処理
  const handlePrevClick = useCallback(() => {
    props.onPageChange(props.currentPage - 1);
  }, [props]);
  // 「次へ」ボタン押下時の処理
  const handleNextClick = useCallback(() => {
    props.onPageChange(props.currentPage + 1);
  }, [props]);

  /**
   * 総ページ数取得処理
   * @param totalPosts 総記事数
   * @param postsPerPage 1ページあたりの記事数
   * @returns 総ページ数
   */
  const getTotalPage = (totalPosts: number, postsPerPage: number) => {
    return Math.ceil(totalPosts / postsPerPage);
  };

  /**
   * 総ページ番号取得処理
   * 例：総ページ数が 3 の場合 → [1, 2, 3]
   * @param totalPages 総ページ数
   * @returns ページ番号の配列
   */
  const getTotalPageNumber = (totalPage: number) => {
    const totalPageNumber = [];
    for (let i = 1; i <= totalPage; i++) {
      totalPageNumber.push(i);
    }
    return totalPageNumber;
  };

  // ページネーション表示処理
  const paginationDisplay = () => {
    // 総ページ数を取得
    const totalPage = getTotalPage(props.totalPosts, props.postsPerPage);
    // 総ページ数が 1 以下なら何も表示しない
    if (totalPage <= 1) {
      return [];
    }

    // 総ページ番号を取得
    const totalPageNumber = getTotalPageNumber(totalPage);

    // ページボタン一覧を作成
    return totalPageNumber.map((pageNumber) => {
      return (
        <li key={pageNumber}>
          <button onClick={() => props.onPageChange(pageNumber)}>
            {pageNumber}
          </button>
        </li>
      );
    });
  };

  return (
    <nav>
      <ul className={styles.pagination}>
        {/* 「前へ」ボタン：1ページ目以外のときに表示 */}
        {props.currentPage > 1 && (
          <li>
            <button onClick={handlePrevClick}>前へ</button>
          </li>
        )}

        {/* ページ番号ボタンの一覧 */}
        {paginationDisplay()}

        {/* 「次へ」ボタン：最終ページ以外のときに表示 */}
        {props.currentPage <
          getTotalPage(props.totalPosts, props.postsPerPage) && (
          <li>
            <button onClick={handleNextClick}>次へ</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Pagination;
