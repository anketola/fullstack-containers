const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Wallmessage = sequelize.define('Wallmessage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'wallmessages',
  timestamps: false,
});

module.exports = Wallmessage;
