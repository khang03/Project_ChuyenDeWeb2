const commentRouter = require("./commentRoute.js");
const postRoute = require("./postRoute.js");
const userRoute = require("./userRoute.js");
const imageRouter = require("./imageRouter.js");
const likeRouter = require("./likeRouter.js");
const authRouter = require("./authRouter.js");
const friendRouter = require("./friendRouter.js");
const dbModel = require("../models");
const notificationRouter = require("./notificationRoute.js");
const messageRouter = require("./messageRoute.js");
const MiddlewareUserLogin = require('../middleware/middlewareUserLogin.js')

const { authenticateToken } = require("../controllers/UserController.js");
// const authRouter = require('./authRouter.js')

// init Routes for all route
function Routes(app) {
  app.use("/posts", postRoute);
  app.use("/users", userRoute);
  app.use("/comments", commentRouter);
  app.use("/images", imageRouter);
  app.use("/likes", likeRouter);
  app.use("/login", authRouter)
  app.use("/friend", friendRouter)
  app.use("/chat", messageRouter)
  app.use("/notification", notificationRouter)
  app.post('/login', (res, req) => {
    if(req.session.userId){
      res.send(`ID người dùng hiện tại: ${req.session.userId}`);

    }else {
      res.send('Vui lòng đăng nhập');
  }
  })
  app.get('/', MiddlewareUserLogin, async (req, res) => {
    try {
      // Lấy userId từ token (đã được lưu vào req.user trong middleware)
      const userId = req.user.userId;
  
      // Truy vấn thông tin người dùng từ bảng users
      const user = await dbModel.User.findOne({
        where: { id: userId },
        attributes: ['id', 'username', 'email', 'name', 'avatar','bio'], // Chọn các cột bạn cần
      });
  
      if (!user) {
        return res.status(404).json({ message: 'Người dùng không tồn tại' });
      }
  
      // Trả về thông tin người dùng
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Lỗi hệ thống' });
    }
  })
  // app.get('/profile', MiddlewareUserLogin, async (req, res) => {
  //   try {
  //     // Lấy userId từ token (đã được lưu vào req.user trong middleware)
  //     const userId = req.user.userId;
  
  //     // Truy vấn thông tin người dùng từ bảng users
  //     const user = await dbModel.User.findOne({
  //       where: { id: userId },
  //       attributes: ['id', 'username', 'email', 'name', 'avatar','bio'], // Chọn các cột bạn cần
  //     });
  
  //     if (!user) {
  //       return res.status(404).json({ message: 'Người dùng không tồn tại' });
  //     }
  
  //     // Trả về thông tin người dùng
  //     res.status(200).json(user);
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).json({ message: 'Lỗi hệ thống' });
  //   }
  // })
  // app.use('/auth', authRouter)
}

module.exports = Routes;
