'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [
      {
        name: 'Tuấn',
        username: 'tuan03',
        email: 'tuanly@gmail.com',
        password: '123456',
        avatar: 'sdsas.png',
        bio: 'đây là tài khoản của tôi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tuấn2',
        username: 'tuan032',
        email: 'tuanly2@gmail.com',
        password: '123456',
        avatar: 'sdsas2.png',
        bio: 'đây là tài khoản của tôi2',
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ])
    
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Users',null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
