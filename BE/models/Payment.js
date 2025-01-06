const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/dbConfig');

class Payment extends Model {}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', 
        key: 'id',
      },
    },
    appointment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'appointments',
        key: 'id',
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 500.0,
    },
    payment_status: {
      type: DataTypes.ENUM('pending', 'completed', 'failed'),
      defaultValue: 'pending',
    },
    payment_method: {
      type: DataTypes.STRING,
    },
    transaction_id: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Payment',
    tableName: 'payments',
    timestamps: true,
  }
);


Payment.setAssociations = (models) => {
  Payment.belongsTo(models.User, { foreignKey: 'user_id', as: 'User' });
  Payment.belongsTo(models.Appointment, { foreignKey: 'appointment_id', as: 'Appointment' });
};

module.exports = Payment;
