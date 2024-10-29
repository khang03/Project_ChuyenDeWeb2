'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Posts', [
      // {
      //   user_id: '1',
      //   content: 'haha',
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   user_id: '2',
      //   content: 'hehe',
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      {
        user_id: '1',
        content: 'Hello word!',
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ])
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
