const express = require("express");
const authController = require("../controllers/AuthController.js");
const authRouter = express.Router();
// const AuthController = require("../controllers/AuthController.js");

// authRouter.get("/", authController.getCommentPost);
authRouter.post("/", authController.login);
// authRouter.get("/users", authController.authenticateToken)

// Annguyen: api route -> quên mật khẩu
authRouter.post('/forgot-password', authController.sendOTP);

module.exports = authRouter;
