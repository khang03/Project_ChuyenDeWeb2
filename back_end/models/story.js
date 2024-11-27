"use strict";
const { Model } = require("sequelize");
const dbModel = require("../models");
module.exports = (sequelize, DataTypes) => {
  
  class Story extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * Sử dụng alias (as:) để xác định được mối quan hệ của các bảng để lấy dữ liệu
     * nếu không dùng thì khi truy vấn sẽ không xác định được
     */
    static associate(models) {
      // define association here
      Story.belongsTo(models.User,{
        foreignKey: 'user_id',
        as: 'oneUser'
      })

    //   Story.hasMany(models.Like, {
    //     foreignKey: 'post_id',
    //     as: 'manyLike'
    //   })

    //   Story.hasMany(models.Image, {
    //     foreignKey: 'post_id',
    //     as: 'manyImage'
    //   })

    
      // Post.belongsTo(models.User, { foreignKey: 'user_id' });
      // Post.hasMany(models.Image, { foreignKey: 'post_id' });
      // Post.hasMany(models.Comment, { foreignKey: 'post_id' });
      // Post.hasMany(models.Like, { foreignKey: 'post_id' });
    }
  }
  Story.init(
    {
      content: DataTypes.STRING,
      user_id:{
        type:  DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Story",
    } 

  );

  return Story;

};