// server.jsではappを使っていたがrouterにする
const router = require("express").Router(); // 関数
const { PrismaClient } = require("@prisma/client"); // prismaをつかうため
const bcrypt = require("bcrypt"); // パスワードハッシュのため　　モジュールによって変数かオブジェクトで読み込むかが違う
const jwt = require("jsonwebtoken");

// prisma client
const prisma = new PrismaClient();

// 投稿
router.post("/post", async (req, res) => {
  // 分割代入でリクエスト取得
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({
      message: "投稿内容がありません",
    });
  }
  try {
    // DBにいれる
    const newPost = await prisma.post.create({
      data: {
        content,
        authorId: 1,
      },
      // リレーションを取得するのにincludeを使う
      include: {
        author: true,
      },
    });
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "サーバーエラーです。",
    });
  }

  //   // modelを使ってdataを挿入
  //   const user = await prisma.user.create({
  //     data: {
  //       username,
  //       email,
  //       password: hashedPassword,
  //     },
  //   });
  //   // 取得したオブジェクトを返す
  //   return res.json({ user });
});

// 最新取得
router.get("/get_latest_post", async (req, res) => {
  try {
    const latestPosts = await prisma.post.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      // リレーションを取得するのにincludeを使う
      include: {
        author: true,
      },
    });
    console.log(latestPosts);
    return res.json(latestPosts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "サーバーエラーです" });
  }
});

// 出力して他で使えるようにする
module.exports = router; // 上で指定したオブジェクト
