'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    // mã hóa password
    const saltRounds = 10;
    const hashedPassword1 = await bcrypt.hash('123', saltRounds);
    const hashedPassword2 = await bcrypt.hash('123', saltRounds);
    const hashedPassword3 = await bcrypt.hash('456', saltRounds);
    const hashedPassword4 = await bcrypt.hash('456', saltRounds);

    await queryInterface.bulkInsert('Users', [
      
      {
        name: 'Tuấn',
        username: 'tuan01',
        email: 'tuan@gmail.com',
        password: hashedPassword1,
        avatar: 'sdsas.png',
        bio: 'đây là tk của Tuấn',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Khang',
        username: 'khang02',
        email: 'khang@gmail.com',
        password: hashedPassword2,
        avatar: 'sdsas2.png',
        bio: 'đây là tài khoản của Khang',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nguyên',
        username: 'nguyen03',
        email: 'nguyen@gmail.com',
        password: hashedPassword3,
        avatar: 'sdsas2.png',
        bio: 'đây là tài khoản của Nguyên',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lan',
        username: 'lan04',
        email: 'lan@gmail.com',
        password: hashedPassword4,
        avatar: 'sdsas2.png',
        bio: 'đây là tài khoản của Lan',
        createdAt: new Date(),
        updatedAt: new Date()
      },
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
