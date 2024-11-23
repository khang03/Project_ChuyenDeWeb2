const express = require("express");
const friendController = require("../controllers/FriendController.js");
const friendRouter = express.Router();

friendRouter.get("/status", friendController.getStatus);
friendRouter.post("/add", friendController.sendAddFriend);
friendRouter.post("/delstatus", friendController.deleteAddRequest);
friendRouter.get("/getListFriend/:userId", friendController.getListFriend);

// friendRouter.delete("/delete/:id", friendController.deleteFriend);

module.exports = friendRouter;