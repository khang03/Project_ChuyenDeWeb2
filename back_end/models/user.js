"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //Post Reference
      User.hasMany(models.Post, {
        foreignKey: "user_id",
        as: "manyPost"
      })
      // Notification Reference
      User.hasMany(models.Notification, {
        foreignKey: "user_id",
        as: "manyNotification"
      })
      // Like Reference
      User.hasMany(models.Like, {
        foreignKey: "user_id",
        as: "manyLike"
      })
      // Comment Reference
      User.hasMany(models.Comment, {
        foreignKey: "user_id",
        as: "manyComment"
      })
      // Message Referencce
      User.hasMany(models.Message , {
        foreignKey: 'sender_id',
        as: 'manySender'
      })

      User.hasMany(models.Message , {
        foreignKey: 'receiver_id',
        as: 'manyReceiver'
      })
      // FriendShip Reference
      User.hasMany(models.Friendship , {
        foreignKey: 'userid_1',
        as: 'manyUser1'
      })

      User.hasMany(models.Friendship , {
        foreignKey: 'userid_2',
        as: 'manyUser2'
      })

      


    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      username: {type:DataTypes.STRING,unique:true},
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING,
      bio: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
