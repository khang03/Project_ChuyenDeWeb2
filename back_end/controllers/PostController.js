
// import UserModel
const dbModel = require('../models'); 
class PostController {

    // [GET] lấy danh sách bài viết
    index(req, res) {
        
      dbModel.Post.findAll()
          .then(posts => res.json(posts))
          .catch(err => res.status(500).json(err));
  }

    // [GET] lấy danh sách bài viết cụ thể
    show(req,res) {
      const { id } = req.params;

        
        dbModel.Post.findAll(id)
            .then(post => {
                res.send(post);
                if (post) res.json(post);
                else res.status(404).json({ error: 'User not found' });
            })
            .catch(err => res.status(500).json(err));
    }

    //[POST] xử lý tạo 1 bài viết mới
    store(req,res) {

    }

    // [PUT] cập nhật bài viết
    update(req,res) {

    }

    // [DELETE] xóa bài viết
    delete() {

    }
}
module.exports = new PostController;