const User = require('../models/User'); // Import the User model

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'role', 'verified'], // Fetch specific fields
    });

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully.',
      data: users,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching users.',
    });
  }
};
