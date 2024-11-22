const express = require("express");
const authController = require("../controllers/AuthController.js");
// const AuthController = require("../controllers/AuthController.js");

const authRouter = express.Router();

// authRouter.get("/", authController.getCommentPost);
authRouter.post("/", authController.login);
// authRouter.get("/users", authController.authenticateToken)
module.exports = authRouter;
