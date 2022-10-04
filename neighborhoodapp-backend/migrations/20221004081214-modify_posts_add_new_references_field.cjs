'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'posts', // table name
      'categoryId', // new field name
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: 'categoryId',
      },
    );
  }
};
