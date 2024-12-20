"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Notification.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "oneUser",
      });
      Notification.belongsTo(models.Post, {
        foreignKey: "post_id",
      });
    }
  }
  Notification.init(
    {
      message: DataTypes.TEXT,
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "posts",
          key: "id",
        },
      },
      user_id_send: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      role: {
        type: DataTypes.INTEGER,

      }
    },

    {
      sequelize,
      modelName: "Notification",
    }
  );
  return Notification;
};
