const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/dbConfig');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'username_unique', // Define a unique constraint name
        msg: 'Username must be unique',
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'email_unique', // Define a unique constraint name
        msg: 'Email must be unique',
      },
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'customer'),
      defaultValue: 'customer',
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Default to false at signup
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true, 
  }
);

module.exports = User;
