// import Models
const dbModel = require("../models");
const { QueryTypes } = require('sequelize');

class MessageController {
  // [GET] lấy tin nhắn của Room (...)
  getMessageByRoom(req, res) {
       
      const {room} = req.query; // dữ liệu gửi theo (payload)
      dbModel.Message.findAll({where: {room}})
      .then(dbModel => {  return res.status(201).json( dbModel) })
      .catch(error => res.status(500).json({message: error.message}));
  }

  // [POST] xử lý gửi lưu tin nhắn
  async saveMessage(data) {

    try {
      const dataMessage = await dbModel.Message.create({
        sender_id: data.senderId,
        receiver_id: data.receiverId,
        room: data.room,
        message_content: data.messageContent,
        message_img: 'none.png',
        retracted: 1
      });
      return dataMessage; // Trả về tin nhắn đã lưu
    } catch (error) {
      console.error('Error saving message:', error);
      throw error;
    }
    
  }

  // [DELETE] thu hồi tin nhắn
  async deleteMessage({messageId}) {

    try {
      // Tìm tin nhắn trong cơ sở dữ liệu
      const message = await dbModel.Message.findOne({ where: { id: messageId } });
      // console.log(message);
      
      if (!message) {
          return { error: true, status: 404, message: "Tin nhắn không tồn tại!" };
      }

     

      // Cập nhật trạng thái tin nhắn
      await dbModel.Message.update(
          { retracted: 0 },
          { where: { id: messageId } }
      );

      // // Trả về thông tin cần thiết cho socket.js
      return { error: false, status: 200, message: "Thu hồi tin nhắn thành công!", data: { messageId } };
  } catch (error) {
      console.error(error);
      return { error: true, status: 500, message: "Có lỗi xảy ra!", errorDetail: error };
  }
  }

  // [GET] tìm kiếm tin nhắn
  async searchMessage(req,res) {
    const {q , room} = req.query; 
 
    // Chuyển đổi từ khóa thành BOOLEAN MODE
    const booleanKeyword = q
    .trim() // Loại bỏ khoảng trắng đầu và cuối
    .split(/\s+/) // Tách chuỗi bằng một hoặc nhiều khoảng trắng
    .filter(word => word.length > 0) // Loại bỏ chuỗi rỗng
    .map(word => `+${word}*`) // Thêm tiền tố '+' và '*'
    .join(" "); // Kết hợp thành chuỗi

    
    // Thực hiện truy vấn
    const messages = await dbModel.sequelize.query(
      `SELECT * FROM messages
       WHERE room = ? AND MATCH(message_content) AGAINST(? IN BOOLEAN MODE)`,
      { replacements: [room, booleanKeyword], type: QueryTypes.SELECT }
    );
    res.status(200).json(messages);  
  }
}
module.exports = new MessageController();
