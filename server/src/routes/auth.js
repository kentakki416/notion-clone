'use strict'
const router = require("express").Router()
const {body} = require('express-validator')

require("dotenv").config();

const User = require("../models/user")
const validation = require("../handlers/validation")
const userController = require("../controllers/user") 


// ユーザー新規登録API
router.post("/register", 
  body("username").isLength({min:8}).withMessage("ユーザー名は８文字以上である必要がある"), 
  body("password").isLength({min:8}).withMessage("パスワードは８文字以上です"),
  body("confirmPassword").isLength({min:8}).withMessage("確認用パスワードは８文字以上です"),
  body("username").custom((value) => {
    return User.findOne({username: value}).then((user) => {
      if(user) {
        return Promise.reject("このユーザーはすでに存在しています")
      }
    })
  }),
  validation.validate,
  userController.register
)

// ログイン用API
router.post("/login", 
  body("username").isLength({ min: 8}).withMessage("ユーザー名は８文字以上である必要があります"),
  body("password").isLength({ min: 8}).withMessage("パスワードは８文字以上である必要があります"),
  validation.validate,
  userController.login
)


module.exports = router;
