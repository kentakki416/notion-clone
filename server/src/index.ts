const express = require('express');
const mongoose = require("mongoose")
const CryptoJS = require("crypto-js")
const JWT = require("jsonwebtoken");
const {body} = require('express-validator')
const User = require("./models/user")
const app = express();
const PORT = 8080;
require("dotenv").config();

// ユーザー新規登録API
app.post("/register", 
  body("username").isLength({min:8}).withMessage("ユーザー名は８文字衣装である必要がある"), 
  body("password").isLength({min:8}).withMessage("パスワードは８文字以上です"),
  body("confirmPassword").isLength({min:8}).withMessage("確認用パスワードは８文字以上です"),
  async (req, res) => {
  // パスワードの取得
  const password = req.body.password

  try {
     // パスワードの暗号化
    req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);
    // ユーザー登録
    const user = await User.create(req.body)
    // JWTの発行
    const jwt = JWT.sign({ id: user._id}, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "24h",
    });
    return res.status(200).json({ user, jwt });
  } catch(error) {
    return res.status(500).json(error)
  }
})

// ユーザーログイン用API

// DB接続
try {
  mongoose.connect(
    process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: process.env.MONGODB_USER,
      pass: process.env.MONGODB_PASSWORD,
      dbName: "notion-clone"
    }
  )
  console.log("DBと接続中・・・")
} catch(error) {
  console.log(error);
}

app.listen(PORT, () => {
  console.log("ローカルサーバー起動中・・・")
})
