'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Courses', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Courses', 'userId')
  }
}
