'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [
      
      {
        name: 'admin',
        username: 'admin',
        email: 'admin@gmail.com',
        password: '123456',
        avatar: 'sdsas2.png',
        bio: 'đây là tài khoản admin',
        role:1,
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
