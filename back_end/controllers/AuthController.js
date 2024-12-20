const { where, Model } = require("sequelize");
const dbModel = require("../models");
const bcrypt = require("bcryptjs"); // Thư viện để mã hóa mật khẩu
const jwt = require("jsonwebtoken");
const config = require("../config/email");
require("dotenv").config(); // Đảm bảo dòng này xuất hiện trước khi sử dụng biến môi trường

class AuthController {
  //  async getUserLogin(req, res) {
  //     const { username, password } = req.body;
  //     try {
  //       //Tìm người dùng trong database
  //       const user = await dbModel.User.findOne({ where: { username } });
  //       if (user && bcrypt.compareSync(password, user.password)) {
  //         //Lưu id người dùng vào session
  //         req.session.userId = user.id;

  //         //Trả về thông báo thành công và Id người dùng
  //         res.send(`Đăng nhập thành công! ID người dùng của bạn là: ${user.id}`);
  //       } else {
  //         res.send("Tên đăng nhập hoặc mật khẩu không chính xác.");
  //       }
  //       console.log(user);

  //     } catch (err) {
  //       console.error(err);
  //       res.status(500).send("Lỗi hệ thống.");
  //     }
  //   }
  // [POST] register

  getCommentPost(req, res) {
    dbModel.Comment.findAll({ order: [["id", "DESC"]] })
      .then((comments) => res.json(comments))
      .catch((err) => res.status(500).json(err));
  }
  // Annguyen
  async sendOTP(req, res) {
    const { email } = req.body;
    const nodemailer = require("nodemailer");

    try {
      const user = await dbModel.User.findOne({ where: { email } }); // Sử dụng 'where' để lọc email

      // Không tìm thấy user trong db
      if (!user) {
        console.error(email + " is not found");

        return res.status(404).json({ message: "User not found" });
      }

      // Tạo OTP (ví dụ)
      const otp = Math.floor(100000 + Math.random() * 900000);
      console.warn(otp);

      // // Lưu OTP vào database hoặc session (tùy theo thiết kế của bạn)
      // user.otp = otp;
      // await user.save();

      // Gửi email
      const transporter = nodemailer.createTransport(config);

      const mailOptions = {
        from: "21211TT3593@mail.tdc.edu.vn",
        to: email,
        subject: "Reset password",
        text: `Your OTP is: ${otp}`,
      };

      await transporter.sendMail(mailOptions);

      console.warn("Gửi thành công otp");
      res.json({ message: "OTP sent successfully" });


    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error sending OTP" });
    }
  }
  async login(req, res) {
    const { username, password } = req.body;

    try {
      // Kiểm tra xem người dùng có tồn tại trong cơ sở dữ liệu không
      const user = await dbModel.User.findOne({ where: { username } });
      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }

      // Kiểm tra mật khẩu
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Mật khẩu không đúng" });
      }

      // Tạo JWT token
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET || "123456aA",
        { expiresIn: "1h" }
      );

      // Trả về thông tin người dùng và token
      res.status(200).json({
        message: "Đăng nhập thành công",
        token,
        userId: user.id,
        username: user.username,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Lỗi hệ thống" });
    }
  }
  async authenticateToken(req, res) {
    try {
      const userId = req.user.userId;

      const user = await db.User.findOne({
        where: { id: userId },
        attributes: ["id", "username", "email", "fullName", "avatar"], // Chọn các cột bạn cần
      });
      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }

      // Trả về thông tin người dùng
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Lỗi hệ thống" });
    }
  }
  // [POST] logout

  logout() {}
}
module.exports = new AuthController();
