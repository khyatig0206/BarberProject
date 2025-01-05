require('dotenv').config(); 
const AWS = require('../config/awsConfig');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model
const axios = require("axios");
const Appointment = require('../models/Appointment')

exports.book = async (req, res) => {
    const { username } = req.user; 
    const { appointment_date } = req.body;

  if (!appointment_date) {
    return res.status(400).json({ message: 'Appointment date is required' });
  }

  try {
    // Find user by username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create the appointment
    const appointment = await Appointment.create({
      user_id: user.id,
      appointment_date,
    });

    return res.status(201).json({
      message: 'Appointment booked successfully',
      appointment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};