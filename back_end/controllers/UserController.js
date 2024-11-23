// import UserModel
const { where, Sequelize } = require("sequelize");
const dbModel = require("../models");
const bcrypt = require("bcryptjs"); // Thư viện để mã hóa mật khẩu
class UserController {
  // [GET] Lây danh sách người dùng
  index(req, res) {
    dbModel.User.findAll()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  }

  // [GET] Lấy người dùng cụ thể theo id
  // Giả sử bạn đang sử dụng Sequelize ORM để tương tác với database
  //-------------------------------------------------------------------------------------------------------

  show(req, res) {
    const { username } = req.params; // Lấy username từ params URL

    // Tìm người dùng theo username
    dbModel.User.findAll({
      where: { username }, // Điều kiện tìm kiếm theo username
    })
      .then((user) => {
        if (user) {
          // Nếu tìm thấy người dùng, trả về dữ liệu
          res.json(user);
        } else {
          // Nếu không tìm thấy người dùng, trả về lỗi 404
          res.status(404).json({ error: "User not found" });
        }
      })
      .catch((err) => {
        // Xử lý lỗi nếu có trong quá trình tìm kiếm
        res
          .status(500)
          .json({
            error: "An error occurred while fetching the user",
            details: err,
          });
      });
  }
  //-------------------------------------------------------------------------------------------------------

  getUserById(req, res) {
    const { id } = req.params; // Lấy username từ params URL

    // Tìm người dùng theo username
    dbModel.User.findByPk(id)
      .then((user) => {
        if (user) {
          // Nếu tìm thấy người dùng, trả về dữ liệu
          res.json(user);
        } else {
          // Nếu không tìm thấy người dùng, trả về lỗi 404
          res.status(404).json({ error: "User not found" });
        }
      })
      .catch((err) => {
        // Xử lý lỗi nếu có trong quá trình tìm kiếm
        res
          .status(500)
          .json({
            error: "An error occurred while fetching the user",
            details: err,
          });
      });
  }

  async ChangPass(req, res) {
    const { id: userId } = req.params; // Match the route parameter
    const { old_password, new_password } = req.body; // Extract old and new passwords
  
    try {
      // Log for debugging
      console.log("User ID:", userId);
  
      // Find the user by ID
      const user = await dbModel.User.findOne({ where: { id: userId } });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Check old password
      const isPasswordValid = await bcrypt.compare(old_password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Old password is incorrect" });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(new_password, 10);
  
      // Update the user's password
      await user.update({ password: hashedPassword });
  
      // Success response
      return res.json({ message: "Password changed successfully" });
    } catch (err) {
      // Handle unexpected errors
      console.error("Error changing password:", err);
      return res.status(500).json({ error: "An error occurred", details: err.message });
    }
  }
  //-------------------------------------------------------------------------------------------------------

  //[GET] lay user theo id
  showById(req, res) {
    const { id } = req.params; // Lấy username từ params URL

    // Tìm người dùng theo username
    dbModel.User.findAll({
      where: { id }, // Điều kiện tìm kiếm theo username
    })
      .then((user) => {
        if (user) {
          // Nếu tìm thấy người dùng, trả về dữ liệu
          res.json(user);
        } else {
          // Nếu không tìm thấy người dùng, trả về lỗi 404
          res.status(404).json({ error: "User not found" });
        }
      })
      .catch((err) => {
        // Xử lý lỗi nếu có trong quá trình tìm kiếm
        res
          .status(500)
          .json({
            error: "An error occurred while fetching the user",
            details: err,
          });
      });
  }

  // [POST] xử lý thêm người dùng
  async register(req, res) {
    const { username, password, name, bio, avatar, email } = req.body;

    try {
      // Kiểm tra xem tên người dùng có tồn tại trong cơ sở dữ liệu chưa
      const existingUser = await dbModel.User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ message: "Tên người dùng đã tồn tại" });
      }

      // Mã hóa mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds là 10

      // Lưu người dùng mới vào cơ sở dữ liệu
      const newUser = await dbModel.User.create({
        username: username,
        password: hashedPassword, // Lưu mật khẩu đã mã hóa
        name: name,
        bio: bio,
        avatar: avatar,
        email: email,
        role: 1,
      });

      // Trả về thông báo đăng ký thành công
      res
        .status(201)
        .json({
          message: "Tạo tài khoản thành công",
          userId: newUser.id,
          username: newUser.username,
        });
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      res.status(500).json({ error: "Lỗi hệ thống" });
    }
  }
  // async authenticateToken(req, res) {
  //   try{
  //     const userId = req.user.userId

  //     const user = await db.User.findOne({
  //       where: { id: userId },
  //       attributes: ['id', 'username', 'email', 'name', 'avatar'], // Chọn các cột bạn cần
  //     });
  //     if (!user) {
  //       return res.status(404).json({ message: 'Người dùng không tồn tại' });
  //     }

  //     // Trả về thông tin người dùng
  //     res.status(200).json(user);
  //   }catch (err) {
  //     console.error(err);
  //     res.status(500).json({ message: 'Lỗi hệ thống' });
  //   }
  // }

  // [PUT] sửa đổi thông tin người dùng
  update(req, res) {
    const { id } = req.params;
    const { username, name, bio } = req.body;

    dbModel.User.update(
      {
        username: username,
        name: name,
        bio: bio,
      },
      { where: { id } }
    )
      .then((result) => {
        if (result[0] === 0) {
          return res.status(404).json({ error: "Comment not found" });
        }
        res.status(200).json({ message: "Comment updated successfully" });
      })
      .catch((err) =>
        res
          .status(500)
          .json({ error: "Failed to update comment", details: err })
      );
  }

  // [DELETE] xóa người dùng
  async destroy(req, res) {
    const { id } = req.params;
    const t = await dbModel.sequelize.transaction();
    try {
      await dbModel.Image.destroy({
        where: {
          post_id: {
            [Sequelize.Op.in]: dbModel.sequelize.literal(
              `(SELECT id FROM posts WHERE user_id = ${id})`
            ),
          },
        },
        transaction: t,
      });

      // 2. Xóa tất cả các bài viết của user
      await dbModel.Post.destroy({
        where: { user_id: id },
        transaction: t, // Thực hiện trong cùng một giao dịch
      });

      await dbModel.User.destroy({
        where: { id: id },
        transaction: t,
      });
      await t.commit();

      // const user = await dbModel.User.findByPk(id)

      // const post = await dbModel.Post.destroy({where: {user_id: id}})
      // await user.destroy()
    } catch (error) {
      console.error("Lỗi khi xóa user:", error);
      res.status(500).json({ message: "Có lỗi xảy ra khi xóa user" });
    }
  }
}

module.exports = new UserController();
