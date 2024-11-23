// import Model
const { where } = require("sequelize");
const dbModel = require("../models");

class LikeController {
  // [POST] xử lí like
  show(req, res) {
    dbModel.Like.findAll()
      .then((likes) => res.json(likes))
      .catch((err) => res.status(500).json(err));
  }

  //Thêm like
   addLike(req, res) {
    const { user_id, post_id } = req.body;

    // Kiểm tra xem người dùng đã like bài viết này chưa
    // const existingLike = await dbModel.Like.findOne({ where: { user_id, post_id } });

    // if (existingLike) {
    //   // Nếu đã like, thực hiện unlike
    //   await existingLike.destroy();
    //   return res.json({ message: 'Unliked' });
    // }

    dbModel.Like.create({ user_id, post_id })
      .then((likes) => res.json(likes))
      .catch((err) => res.status(500).json(err));
  }
  // [POST] xử lí unlike
  unlike(req, res) {
    const { user_id, post_id } = req.body;
    dbModel.Like.destroy({ where: { user_id, post_id } })
      .then((likes) => res.json(likes))
      .catch((err) => res.status(500).json(err));
  }

  async statusLike(req, res) {
    const { user_id, post_id } = req.params;
    const existingLike = await dbModel.Like.findOne({ where: { user_id, post_id } });

    if (existingLike) {
      return res.json({ liked: true });
    }

    return res.json({ liked: false});
  }
}
module.exports = new LikeController();
