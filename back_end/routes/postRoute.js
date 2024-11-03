const express = require('express');
const postController = require('../controllers/PostController.js');
const MiddlewareImg = require('../middleware/middlewareImg.js')
const postRouter = express.Router();


postRouter.get('/', postController.index);
// Sử dụng middleware img trong route posts
postRouter.post('/store',MiddlewareImg,postController.store);


module.exports = postRouter;    