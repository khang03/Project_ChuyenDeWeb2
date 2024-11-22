const express = require("express");
const commentController = require("../controllers/CommentController.js");
const commentRouter = express.Router();

commentRouter.get("/", commentController.getCommentPost);
commentRouter.get("/:id", commentController.getCommentById)
commentRouter.delete("/:id", commentController.deleteCommentPost);
commentRouter.put("/:id", commentController.updateCommentPost);
commentRouter.post("/", commentController.storeCommentPost);
// commentRouter.push("/:id", commentController.updateCommentPost);

module.exports = commentRouter; 
