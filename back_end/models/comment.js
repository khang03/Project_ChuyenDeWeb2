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
        as: '1_post'
      })

      Comment.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: '1_user'
      })
    }
  }
  Comment.init(
    {
      comment_content: DataTypes.TEXT,
      post_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
