const { PrismaClient } = require("@prisma/client"); // prismaをつかうため
const bcrypt = require("bcrypt"); // パスワードハッシュのため　　モジュールによって変数かオブジェクトで読み込むかが違う
const jwt = require("jsonwebtoken");
require("dotenv").config();

const express = require("express"); // expressをつかう
const app = express(); // instance?
const PORT = 4000;

// api express get method
// app.get("/", (req, res) => {
//   res.send("<h1>hello</h1>");
// });

// prisma client
const prisma = new PrismaClient();

// expressでjsonをうけとる
app.use(express.json());

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

// ユーザーログインAPI
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  // emailはユニークなので
  const user = prisma.user.findUnique({ where: { email } }); // モデルのデータが取れる
  // ユーザーがいなければ
  if (!user) {
    return res.status(401).json({ error: "パスワードかメルアドが違います:e1" });
  }
  // password check
  const isPasswordValid = await bcrypt.compare(password, user.password); // リクエストとモデルの値を比較
  if (!isPasswordValid) {
    return res.status(401).json({ error: "パスワードかメルアドが違います:e2" });
  }
  // json web token のライブラリを使う
  // .envはprocess.envでよびだせる
  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
    expiresIn: "id",
  });

  // tokenだけかえす
  return res.json({ token });
});
// サーバー立ち上げ npm run dev
app.listen(PORT, () => console.log(`server is running on Port ${PORT}`));
