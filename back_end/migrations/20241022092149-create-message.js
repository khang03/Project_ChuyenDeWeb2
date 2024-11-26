'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sender_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      receiver_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      message_content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      message_img: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      room: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      retracted: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

     // Thêm Full-Text Index
    await queryInterface.sequelize.query(
      `ALTER TABLE Messages ADD FULLTEXT(message_content)`
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Messages');
  }
};