'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.Post, {
        foreignKey: 'post_id',
        as: 'onePost'
      })
    }
  }
  Image.init({
    img_url: DataTypes.STRING,
    post_id:{
      type: DataTypes.INTEGER,
      references: {
        model: 'posts',
        key: 'post_id'
      }
    } 
    
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};