'use strict';
const fs = require("fs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const Courses = JSON.parse(fs.readFileSync("./data/courses.json", "utf-8"))
    const data = Courses.map((course) => {
        return {
          ...course,
          createdAt: new Date(),
          updatedAt: new Date(),
      };
    });
    await queryInterface.bulkInsert("Courses", data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Courses", null, {});
  }
};
