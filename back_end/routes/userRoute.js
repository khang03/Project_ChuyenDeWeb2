const express = require("express");
const userController = require("../controllers/UserController.js");
// const AuthController = require("../controllers/AuthController.js");
const MiddlewareUserLogin = require('../middleware/middlewareUserLogin.js')

const userRouter = express.Router();

userRouter.get("/", userController.index);
userRouter.post("/ChangPass/:id", userController.ChangPass);
userRouter.get("/search/:username", userController.show);

userRouter.get("/:id", userController.showById);
// userRouter.post("/", userController.register);
// userRouter.get("/:username", userController.show);
userRouter.get("/userId/:id", userController.getUserById);
    userRouter.post("/store", userController.register);
    userRouter.put("/:id", userController.update);
// userRouter.get("/", MiddlewareUserLogin, userController.authenticateToken);
module.exports = userRouter;
