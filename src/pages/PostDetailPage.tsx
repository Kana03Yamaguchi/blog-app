import { useParams } from "react-router-dom";
import { PostType } from "../Types/PostType";
import { useEffect, useState } from "react";
import { getPostDetailApi } from "../ApiAdapter/GetPostDetail";

/**
 * PostDetailPageコンポーネント
 * - 記事詳細ページ
 */
function PostDetailPage() {
  // URLパラメータを取得
  const urlParams = useParams<{ id: string }>();
  // 記事詳細を管理
  const [postDetail, setPostDetail] = useState<PostType>();

  /**
   * 初期表示処理
   */
  useEffect(() => {
    (async () => {
      // 記事詳細データを取得
      const data = await getPostDetailApi(Number(urlParams.id));

      if (!data) {
        console.warn("記事詳細が存在しません");
        return;
      }
      setPostDetail(data);
      console.log(data);
    })();
  }, [urlParams.id]);

  return (
    <div>
      {/* ページタイトルエリア */}
      <h2>{postDetail?.title ?? "記事詳細ページ"}</h2>
      {/* 記事内容エリア */}
      <p>{postDetail?.body ?? "選択された記事の内容が表示"}</p>
    </div>
  );
}

export default PostDetailPage;
