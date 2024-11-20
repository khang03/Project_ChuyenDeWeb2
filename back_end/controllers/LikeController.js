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
  async addLike(req, res) {
    const { user_id, post_id } = req.body;

    // Kiểm tra xem người dùng đã like bài viết này chưa
    // const existingLike = await dbModel.Like.findOne({ where: { user_id, post_id } });

    // if (existingLike) {
    //   // Nếu đã like, thực hiện unlike
    //   await existingLike.destroy();
    //   return res.json({ message: 'Unliked' });
    // }

    try {
      dbModel.Like.create({ user_id, post_id })
        .then((likes) => res.json(likes))
        .catch((err) => res.status(500).json(err));

      // Lấy thông tin bài viết (để lấy owner của bài viết)
      const post = await dbModel.Post.findByPk(post_id);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      const postOwnerId = post.user_id; // Chủ bài viết

      //Kiểm tra nếu người dùng bình luận chính bài viết của mình sẽ không hiển thị thông báo và ngược lại
      if (postOwnerId !== user_id) {
        // Tạo thông báo cho người sở hữu bài viết
        const notification = await dbModel.Notification.create({
          user_id: postOwnerId, // Gửi thông báo cho người sở hữu bài viết
          message: `Đã thích bài viết của bạn. ${post.content} `,
          post_id: post_id, // Liên kết đến bài viết
          user_id_send: user_id,
        });
        res.status(200).json({
          message: "Comment added and notification sent",
          comment_content,
          notification,
        });
      }
    } catch {
      console.log("lỗi like");
    }
  }
  // [POST] xử lí unlike
  async unlike(req, res) {
    const { user_id, post_id } = req.body;
    dbModel.Like.destroy({ where: { user_id, post_id } })
      .then((likes) => res.json(likes))
      .catch((err) => res.status(500).json(err));


    // Lấy thông tin bài viết (để lấy owner của bài viết)
    const post = await dbModel.Post.findByPk(post_id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const postOwnerId = post.user_id; // Chủ bài viết
    
    dbModel.Notification.destroy({
      where: { user_id: postOwnerId, post_id: post_id, user_id_send: user_id },
    });
  }

  async statusLike(req, res) {
    const { user_id, post_id } = req.params;
    const existingLike = await dbModel.Like.findOne({
      where: { user_id, post_id },
    });

    if (existingLike) {
      return res.json({ liked: true });
    }

    return res.json({ liked: false });
  }
}
module.exports = new LikeController();
