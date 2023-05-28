const JWT = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const User = require("../models/user")


exports.register = async (req, res) => {
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
}
