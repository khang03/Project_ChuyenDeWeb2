"use strict";
const { Model } = require("sequelize");
const dbModel = require("../models");
module.exports = (sequelize, DataTypes) => {
  
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * Sử dụng alias (as:) để xác định được mối quan hệ của các bảng để lấy dữ liệu
     * nếu không dùng thì khi truy vấn sẽ không xác định được
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User,{
        foreignKey: 'user_id',
        as: 'oneUser'
      })

      Post.hasMany(models.Like, {
        foreignKey: 'post_id',
        as: 'manyLike'
      })

      Post.hasMany(models.Image, {
        foreignKey: 'post_id',
        as: 'manyImage'
      })

      Post.hasMany(models.Comment, {
        foreignKey: 'post_id',
        as: 'manyComment'
      })
      // Post.belongsTo(models.User, { foreignKey: 'user_id' });
      // Post.hasMany(models.Image, { foreignKey: 'post_id' });
      // Post.hasMany(models.Comment, { foreignKey: 'post_id' });
      // Post.hasMany(models.Like, { foreignKey: 'post_id' });
    }
  }
  Post.init(
    {
      content: DataTypes.TEXT,
      user_id:{
        type:  DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
    },
    {
      sequelize,
      modelName: "Post",
    } 

  );

  return Post;

};