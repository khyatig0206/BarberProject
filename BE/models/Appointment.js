const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/dbConfig');

class Appointment extends Model {}

Appointment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    appointment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'completed', 'cancelled'),
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    modelName: 'Appointment',
    tableName: 'appointments',
    timestamps: true,
  }
);

// Define a function to set associations
Appointment.setAssociations = (models) => {
  Appointment.belongsTo(models.User, { foreignKey: 'user_id', as: 'User' });
};

module.exports = Appointment;
