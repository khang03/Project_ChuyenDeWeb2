const express = require('express');
const postController = require('../controllers/PostController.js');
const MiddlewareImg = require('../middleware/middlewareImg.js')
const postRouter = express.Router();

postRouter.get("/", postController.index);
postRouter.get("/user/:id", postController.getAllPostByIdUser);
postRouter.get("/:id", postController.show);
// postRouter.get("/like", likeController.like);

// Sử dụng middleware img trong route posts
postRouter.post('/store',MiddlewareImg,postController.store);
postRouter.put('/update/:id',MiddlewareImg,postController.update);
postRouter.delete('/delete/:id',postController.destroy)
module.exports = postRouter;    
