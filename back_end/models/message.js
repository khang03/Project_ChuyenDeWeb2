"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Message.belongsTo(models.User, {
        foreignKey: 'sender_id',
        as: 'oneSender'
      })

      Message.belongsTo(models.User, {
        foreignKey: 'receiver_id',
        as: 'oneReceiver'
      })


    }
  }
  Message.init(
    {
      sender_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        }
      },
      receiver_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        }
      },
      message_content: DataTypes.TEXT,
      message_img: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
