
const messageController = require('../controllers/MessageController');
// server/socket/socket.js
const setupSocket = (server) => {
    const io = require('socket.io')(server, {
      cors: {
        origin: '*', // Cấu hình CORS nếu cần thiết
        methods: ['GET', 'POST']
      }
    });
  
    // Xử lý kết nối của client
    io.on('connection', (socket) => {
      
  
      // Lắng nghe sự kiện 'join_room' từ client
      socket.on('join_room', ({roomId,userId}) => {
        socket.join(roomId);
        console.log(`User ${userId} joined room ${roomId}`);
      });
  
      // Lắng nghe sự kiện 'send_message' từ client
      socket.on('sendMessage',async ({room, senderId, receiverId, messageContent}) => {
        
        try {
          // Lưu tin nhắn vào data thông qua controller
          const newMessage = await messageController.saveMessage({
            room,senderId,receiverId,messageContent
          })
          // Phát tin nhắn tới tất cả các thành viên trong room
          io.to(room).emit('receiveMessage', newMessage);
        } catch (error) {
          console.log(error)
        }
        
      });
  
      // Lắng nghe sự kiện 'disconnect'
      socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
      });
    });
  };
  
  module.exports = setupSocket;
  
