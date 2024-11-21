const express = require('express');
const notificationController = require('../controllers/NotificationController.js');
const notificationRouter = express.Router();



// notificationRouter.get("/:id", notificationController.getNotification)
notificationRouter.get("/:userId", notificationController.getNotification)
notificationRouter.post("/", notificationController.storeNotification)
notificationRouter.get("/", notificationController.getNotificationByRoleAdmin)

module.exports = notificationRouter;