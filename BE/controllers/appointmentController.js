require('dotenv').config(); 
const AWS = require('../config/awsConfig');
const User = require('../models/User'); // Import the User model
const Appointment = require('../models/Appointment')
const Notification = require('../models/Notification')

const ses = new AWS.SES();




const sendEmail = async (to, subject, body) => {
    const params = {
      Source: process.env.SES_SENDER_EMAIL,  // Your verified SES email
      Destination: {
        ToAddresses: [to], // Recipient's email
      },
      Message: {
        Subject: {
          Data: subject,
        },
        Body: {
          Text: {
            Data: body,
          },
        },
      },
    };
  
    try {
      const data = await ses.sendEmail(params).promise();
      return data; // Return data on success
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
    }
  };
  
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
  
      // Prepare notification message
      const message = `Hello ${user.username}, your appointment is scheduled for ${appointment_date}.`;
  
      // Send notification to user
      await sendEmail(user.email, 'Appointment Confirmation', message);
  
      // Prepare message for the barber shop owner
      const barberShopOwnerEmail = process.env.BARBER_SHOP_OWNER_EMAIL; // Ensure you set this in .env file
      const ownerMessage = `New appointment booked: ${user.username} has scheduled an appointment for ${appointment_date}.`;
  
      // Send notification to the barber shop owner
      await sendEmail(barberShopOwnerEmail, 'New Appointment Booking', ownerMessage);
  
      // Save the notifications in the database (Notification model)
      await Notification.create({
        user_id: user.id,
        message,
        status: 'sent',
      });
  
      return res.status(201).json({
        message: 'Appointment booked successfully and notifications sent',
        appointment,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
  };