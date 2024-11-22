
// import Model
const dbModel = require("../models");


class ImageController{

    //Render hình ra bài viết trang chủ
    index(req, res){
        dbModel.Image.findAll()
        .then((images) => res.json(images))
      .catch((err) => res.status(500).json(err));
    }
}
module.exports = new ImageController();
