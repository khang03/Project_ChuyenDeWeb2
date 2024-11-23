//import Models
const { where } = require("sequelize");
const dbModel = require("../models");

class CommentController {
  // [GET] lấy danh sách bình luận của bài viết
  getCommentPost(req, res) {
    dbModel.Comment.findAll({ order: [["id", "DESC"]] })
      .then((comments) => res.json(comments))
      .catch((err) => res.status(500).json(err));
  }
  getCommentById(req, res) {
    const { id } = req.params;
    dbModel.Comment.findByPk(id, {
      order: [['id', 'DESC']]

    })
      .then((comments) => res.json(comments))
      .catch((err) => res.status(500).json(err));
  }

  // [POST] tạo bình mới cho bài viết
  // [POST] tạo bình mới cho bài viết
  async storeCommentPost(req, res) {
    // const {postId, user}
    // const {  } = req.params; // Giả sử bạn đang thêm bình luận cho một bài viết theo ID
    const { comment_content, post_id, user_id } = req.body;
    try {
      dbModel.Comment.create({
        comment_content: comment_content,
        post_id: post_id,
        user_id: user_id,
      });

      // Lấy thông tin bài viết (để lấy owner của bài viết)
      const post = await dbModel.Post.findByPk(post_id);

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      const postOwnerId = post.user_id; // Chủ bài viết
  
      //Kiểm tra nếu người dùng bình luận chính bài viết của mình sẽ không hiển thị thông báo và ngược lại
      if (postOwnerId !== user_id) {

        // Tạo thông báo cho người sở hữu bài viết
        const notification = await dbModel.Notification.create({
          user_id: postOwnerId, // Gửi thông báo cho người sở hữu bài viết
          message: `Đã bình luận về bài viết của bạn: ${comment_content}`,
          post_id: 10, // Liên kết đến bài viết
          user_id_send: user_id
        });
        res.status(200).json({ message: 'Comment added and notification sent', comment_content, notification });
      }


    } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  // [PUT] sửa bình luận cho bài viết

  updateCommentPost(req, res) {
    const { id } = req.params;
    const { commentContent } = req.body;

    // Kiểm tra nếu nội dung bình luận mới không có

    if (!commentContent) {
      return res.status(400).json({ error: "Comment content is required" });
    }

    dbModel.Comment.update(
      { comment_content: commentContent },
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

  // [DELETE] xóa bình luận cho bài viết

  deleteCommentPost(req, res) {
    const { id } = req.params;
    dbModel.Comment.destroy({
      where: { id },
    })
      .then((result) => {
        if (result) {
          return res
            .status(200)
            .json({ message: "Comment deleted successfully." });
        } else {
          return res.status(404).json({ error: "Comment not found." });
        }
      })
      .catch((err) =>
        res
          .status(500)
          .json({ error: "Failed to delete comment.", details: err })
      );
  }
}
module.exports = new CommentController();
