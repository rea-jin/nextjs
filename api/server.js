const express = require("express");
const app = express(); // instance?
const PORT = 4000;

// api express get method
// app.get("/", (req, res) => {
//   res.send("<h1>hello</h1>");
// });

// サーバー立ち上げ npm run dev
app.listen(PORT, () => console.log(`server is running on Port ${PORT}`));
