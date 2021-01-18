'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("questions", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: Sequelize.STRING,
        allownull: false,
      },
      description: {
        type: Sequelize.STRING,
        allownull: true,
      },
      image: {
        type: Sequelize.STRING,
        allownull: true,
      },
      gist: {
        type: Sequelize.STRING,
        allownull: true,
      },
      student_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "students",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      created_at: {
        type: Sequelize.STRING,
        allownull: false,
      },
      updated_at: {
        type: Sequelize.STRING,
        allownull: false,
      }

    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("questions");
    
  }
};
