// server.jsではappを使っていたがrouterにする
const router = require("express").Router(); // 関数
const { PrismaClient } = require("@prisma/client"); // prismaをつかうため
const isAuthenticated = require("../middlewares/isAuthenticated");

// prisma client
const prisma = new PrismaClient();

router.get("/find", isAuthenticated, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
    });
    if (!user) {
      return res.status(404).json({
        error: "ユーザーが見つかりません",
        message: "ユーザーが見つかりません",
      });
    }
    res.status(200).json({
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
      message: "サーバーエラーです。",
    });
  }
});

module.exports = router;
