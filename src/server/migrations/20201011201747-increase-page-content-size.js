'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Pages", "content");
    await queryInterface.addColumn(
      "Pages",
      "content",
      Sequelize.STRING(1000000)
  );
  },

  down: async (queryInterface, Sequelize) => {
  }
};
