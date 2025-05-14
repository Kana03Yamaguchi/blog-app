import axios from "axios";

const API_URL = "https://blog-backend-1jic.onrender.com/api/posts";

const postDummy = async () => {
  for (let i = 1; i <= 50; i++) {
    try {
      const res = await axios.post(API_URL, {
        title: `Renderダミー記事 ${i}`,
        content: `これは Render に投稿されたダミー記事 ${i} の本文です。`,
      });
      console.log(`投稿 ${i} 完了:`, res.data);
    } catch (err) {
      console.error(`投稿 ${i} 失敗:`, err);
    }
  }
};

postDummy();
