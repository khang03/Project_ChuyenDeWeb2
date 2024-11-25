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
      sender_id: DataTypes.INTEGER,
      receiver_id: DataTypes.INTEGER,
      message_content: DataTypes.TEXT,
      message_img: DataTypes.STRING,
      room: DataTypes.STRING,
      retracted: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
