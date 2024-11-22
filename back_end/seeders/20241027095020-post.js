'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Posts', [
        {
          
            id: 1,
            content: 'content 1',
            user_id: 1,
            
            createdAt: new Date(),
            updatedAt: new Date()
          },
          
        
        
    ]);

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Posts', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
