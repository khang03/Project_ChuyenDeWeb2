// import Models
const dbModel = require("../models");

class MessageController {
  // [GET] lấy tất cả các tin nhắn của người dùng
  getMessage(req, res) {
        dbModel.Message.findAll()
        .then((posts) => {
            res.json(posts);
          })
          .catch((error) => {
            res.status(500).json(error);
          });
       
  }

  // [POST] gửi tin nhắn
  async sendMessage(req, res) {
    try {
      const { message_content, message_img , sender_id, receiver_id} = req.body;
      // Kiểm tra nếu có thông tin không hợp lệ
      if (!sender_id || !receiver_id || !message_content) {
        return res.status(400).json({ error: "Thiếu thông tin cần thiết." });
      }

      // Lưu tin nhắn vào cơ sở dữ liệu
      const newMessage = await dbModel.Message.create({
        sender_id: sender_id,
        receiver_id: receiver_id,
        message_content: message_content,
        message_img: message_img,
      });

      res.status(201).json({ message: "Tin nhắn đã được gửi!", newMessage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Có lỗi xảy ra khi gửi tin nhắn." });
    }
  }

  // [DELETE] xóa tin nhắn
  deleteMessage() {}
}
module.exports = new MessageController();
