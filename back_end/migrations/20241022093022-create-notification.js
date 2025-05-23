"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Notifications", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      message: {
        type: Sequelize.TEXT,
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      user_id_send: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      post_id: {
        allowNull: true,

        type: Sequelize.INTEGER,
      },
      role: {
        allowNull: false,

        type: Sequelize.INTEGER,
      },
      is_read: {
        allowNull: false,

        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Notifications");
  },
};
