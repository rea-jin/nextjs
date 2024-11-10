const { PrismaClient } = require("@prisma/client");
const { bcrypt } = require("bcrypt");
const express = require("express");
const app = express(); // instance?
const PORT = 4000;

// api express get method
// app.get("/", (req, res) => {
//   res.send("<h1>hello</h1>");
// });

// prisma client
const prisma = new PrismaClient();

// 新規ユーザー登録API
app.post("/api/auth/register", async (req, res) => {
  // 分割代入でリクエスト取得
  const { username, email, password } = req.body;
  //   password はハッシュ化
  const hashedPassword = await bcrypt.hash(password, 10);

  // modelを使ってdataを挿入
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
  // 取得したオブジェクトを返す
  return res.json({ user });
});

// サーバー立ち上げ npm run dev
app.listen(PORT, () => console.log(`server is running on Port ${PORT}`));
