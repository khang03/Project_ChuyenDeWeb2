const express = require("express");
const likeController = require("../controllers/LikeController.js");
const likeRouter = express.Router();

likeRouter.get("/", likeController.show);
likeRouter.post("/", likeController.addLike);
likeRouter.delete("/", likeController.unlike);
// postRouter.get("/like", likeController.like);

module.exports = likeRouter;