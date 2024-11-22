const express = require('express');
const messageController = require('../controllers/MessageController.js');
const messageRouter = express.Router();

messageRouter.post('/', messageController.sendMessage)
messageRouter.get('/all', messageController.getMessage)



module.exports = messageRouter;