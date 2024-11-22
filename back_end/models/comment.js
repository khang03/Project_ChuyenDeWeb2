"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.Post, {
        foreignKey: 'post_id',
        as: 'onePost'
      })

      Comment.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'oneUser'
      })
    }
  }
  Comment.init(
    {
      comment_content: DataTypes.TEXT,

      post_id:{
        type:DataTypes.INTEGER,
        references: {
          model: 'posts',
          key: 'post_id'
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'user_id'
        }
      }
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
