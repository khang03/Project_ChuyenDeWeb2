'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Messages', [
      {
        sender_id: 1,
        receiver_id: 2,
        message_content: "hello Khang tớ là Tuấn",  
        message_img: "1.png",// Đảm bảo mã hóa mật khẩu trong thực tế
        room: '1_2',
        retracted: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sender_id: 2,
        receiver_id: 1,
        message_content: "chào cậu , Tớ là Khang gà đá",  
        message_img: "1.png",// Đảm bảo mã hóa mật khẩu trong thực tế
        room: '1_2',
        retracted: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
  ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
