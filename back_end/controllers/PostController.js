// import Model
const dbModel = require('../models');



class PostController {

    // [GET] lấy danh sách bài viết
    index(req,res) {
      res.send('this GET index in post controller');      
    }

    // [GET] lấy danh sách bài viết cụ thể
    show(req,res) {

    }

    //[POST] xử lý tạo 1 bài viết mới
    async store(req,res) {
      // Biến dữ liệu
      const files = req.files;
      const {idUser, contentPost} = req.body;
 
      // kiểm tra giá trị đầu vào 
      if ( contentPost === '' && files.length === 0 )
      {
        return res.status(400).json({ message: 'Vui lòng nhập thông tin bài post'});
      }  
      
      const transaction = await dbModel.sequelize.transaction();
      
      try {
        
        // Tạo new post
        const newPost = await dbModel.Post.create({content:contentPost,user_id:idUser}, {transaction});
 
        // Tạo img-> has been post_id
        if (files.length > 0) {
          const imgRecord = files.map(file => {
            return {
              img_url: file.path,
              post_id: newPost.id
            }
          })
          const newImg = await dbModel.Image.bulkCreate(imgRecord, {transaction});
        }

        // end transaction
        await transaction.commit();
        
        // phản hồi
        res.status(201).json({
          message: 'Tạo bài post thành công !',
          newPost: newPost
        })
        
      } catch (error) {
        // phản hồi lỗi
        await transaction.rollback();
        console.error('Lỗi tạo post',error);
        res.status(500).json({message: 'Tạo bài post thất bại'});
      }
      
    }

    // [PUT] cập nhật bài viết
    update(req,res) {

    }

    // [DELETE] xóa bài viết
    delete() {

    }
}
module.exports = new PostController;