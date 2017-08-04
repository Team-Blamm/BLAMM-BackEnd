'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'products',
      'isActive',
      {
        type: Sequelize.BOOLEAN,
        default: true,
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'products',
      'isActive'
    )
  }
};
