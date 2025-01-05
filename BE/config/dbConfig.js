require('dotenv').config(); // Load environment variables
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,          // Database name
  process.env.DB_USER,          // Database user
  process.env.DB_PASSWORD,      // Database password
  {
    host: process.env.DB_HOST,  // Host
    dialect: process.env.DB_DIALECT, // Dialect
    logging: process.env.DB_LOGGING === 'true', // Logging (convert string to boolean)
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
