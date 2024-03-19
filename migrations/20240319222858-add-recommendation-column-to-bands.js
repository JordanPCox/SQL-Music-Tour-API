'use strict';

const { query } = require('express');
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('bands', 'recommendation', {
      type: DataTypes.STRING
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('bands', 'recommendation', {
      type: DataTypes.STRING
    })
  }
};
