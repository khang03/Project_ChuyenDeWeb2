const express = require("express");
const imageController = require("../controllers/ImageController.js");
const imageRouter = express.Router();

imageRouter.get("/", imageController.index);
// postRouter.get("/like", likeController.like);

module.exports = imageRouter;