'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('users', {
      fields: ['email'],
      type: 'unique',
      name: 'unique_email_constraint' // optional: specify a custom name for the constraint
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('users', 'unique_email_constraint');
  }
};