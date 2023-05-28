const express = require('express');
const mongoose = require("mongoose")
const app = express();
const PORT = 8080;
require("dotenv").config();

app.use(express.json());
app.use("/api", require("./routes/auth"));

// DB接続
async function connect() {
  console.log("DBと接続中・・・")
  await mongoose.connect(
    process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: process.env.MONGODB_USER,
      pass: process.env.MONGODB_PASSWORD,
      dbName: "notion-clone"
    }
  )
}

// DB接続をポートの開放前に実行
connect().then(() => console.log("接続成功"), err => console.log(err))

app.listen(PORT, () => {
  console.log("ローカルサーバー起動中・・・")
})

console.log("確認用");
