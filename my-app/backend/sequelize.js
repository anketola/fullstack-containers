const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/messages_db', {
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
