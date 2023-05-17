const express = require('express');
const mongoose = require("mongoose")
const app = express();
const PORT = 8080;
require("dotenv").config();

// ユーザー新規登録API

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
