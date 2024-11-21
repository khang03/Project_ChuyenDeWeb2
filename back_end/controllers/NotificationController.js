// import Models
const { where } = require("sequelize");
const dbModel = require("../models");
class NotificationController {
  // [GET] lấy danh sách thông báo của người dùng
  async getNotification(req, res) {
    const { userId } = req.params;
    try {
      // Cập nhật trạng thái đọc của thông báo
      const notification = await dbModel.Notification.findAll({
        where: { user_id: userId },
      });

      // if (!notification) {
      //   return res.status(404).json({ message: 'Notification not found' });
      // }

      // notification.read = true;
      // await notification.save();

      res.status(200).json({ notification });
    } catch (error) {
      console.error("Error updating notification:", error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async getNotificationByRoleAdmin(req, res) {
    try {
      // Cập nhật trạng thái đọc của thông báo
      const notification = await dbModel.Notification.findAll({
        where: { role: 1 },
      });

      // if (!notification) {
      //   return res.status(404).json({ message: 'Notification not found' });
      // }

      // notification.read = true;
      // await notification.save();

      res.status(200).json({ notification });
    } catch (error) {
      console.error("Error updating notification:", error);
      res.status(500).json({ message: "Server error" });
    }
  }

  //   async  getAllNotifications() {
  //     try {
  //       // Lấy tất cả thông báo từ bảng Notifications
  //       const notifications = await dbModel.Notification.findOne({where: {user_id: 22}});

  //       // Hiển thị kết quả
  //       console.log(notifications);
  //       return notifications;
  //     } catch (error) {
  //       console.error('Error fetching notifications:', error);
  //     }
  //   }

  async storeNotification(req, res) {
    const { message, role, user_id, post_id, user_id_send } = req.body;
    try {
      dbModel.Notification.create({
        // Tạo thông báo
        user_id: user_id,
        message: message,
        post_id: post_id,
        user_id_send: user_id_send,
        role: role,
      });
    } catch {
      console.log("lỗi tạo thông báo");
    }
  }
}
module.exports = new NotificationController();
