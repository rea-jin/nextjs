require("dotenv").config();

const express = require("express"); // expressをつかう
const app = express(); // instance?
const PORT = 4000;

const authRoute = require("./routers/auth");

// api express get method
// app.get("/", (req, res) => {
//   res.send("<h1>hello</h1>");
// });

// expressでjsonをうけとる
app.use(express.json());

// apiを呼び出す
app.use("/api/auth", authRoute);

// サーバー立ち上げ npm run dev
app.listen(PORT, () => console.log(`server is running on Port ${PORT}`));
