require('dotenv').config(); 
const Razorpay = require('razorpay');
const User = require('../models/User')
const createOrder = require('../config/razorpay')
const Appointment = require('../models/Appointment')
const Payment = require('../models/Payment')

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

exports.initPayment = async (req, res) => {
    const { appointment_id } = req.body;
    const { userId } = req.user
  if (!userId || !appointment_id) {
    return res.status(400).json({ error: 'User ID and Appointment ID are required.' });
  }

  try {
    // Validate appointment
    const appointment = await Appointment.findByPk(appointment_id);
    if (!appointment || appointment.user_id !== userId) {
      return res.status(404).json({ error: 'Invalid appointment.' });
    }

    // Create Razorpay order
    const amount = 500; // Default amount
    const razorpayOrder = await createOrder(amount);

    // Save payment record
    const payment = await Payment.create({
      user_id: userId,
      appointment_id,
      amount,
      payment_status: 'pending',
      transaction_id: razorpayOrder.id, // Razorpay order ID
    });

    // Send response
    res.status(201).json({
      message: 'Payment initiated successfully.',
      orderId: razorpayOrder.id,
      paymentId: payment.id,
      amount,
      currency: 'INR',
    });
  } catch (error) {
    console.error('Error initiating payment:', error);
    res.status(500).json({ error: 'Failed to initiate payment.' });
  }
};


exports.updatePaymentStatus = async (req, res) => {
    const { payment_id, appointment_id, razorpay_payment_id } = req.body;
  
    console.log("Request body:", req.body);
  
    if (!payment_id || !appointment_id || !razorpay_payment_id) {
      return res.status(400).json({ message: 'Payment ID, Appointment ID, and Razorpay Payment ID are required' });
    }
  
    try {
      const payment = await Payment.findByPk(payment_id);
      if (!payment) {
        return res.status(404).json({ message: 'Payment not found' });
      }
      const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);
      const paymentMethod = paymentDetails.method; // Payment method (e.g., upi, netbanking, card)
      const appointment = await Appointment.findByPk(appointment_id);
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
  
      payment.payment_status = 'completed';
      payment.payment_method = paymentMethod;
      await payment.save();
  
      appointment.status = 'completed';
      await appointment.save();
  
      return res.status(200).json({ message: 'Payment and Appointment status updated successfully' });
    } catch (error) {
      console.error('Error updating payment status:', error);
      return res.status(500).json({ message: 'An error occurred while updating payment and appointment statuses' });
    }
  };
  

exports.failPaymentStatus = async(req,res) =>{
    const { payment_id } = req.body; // Expecting payment_id in the request body

  if (!payment_id) {
    return res.status(400).json({ message: 'Payment ID is required' });
  }

  try {
    // Find the Payment record by payment_id
    const payment = await Payment.findByPk(payment_id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    // Update the payment status to 'failed'
    payment.payment_status = 'failed';
    await payment.save();

    // Send success response
    return res.status(200).json({ message: 'Payment status updated to failed successfully' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while updating payment status' });
  }
};



exports.myPayments = async (req, res) => {
    const { userId } = req.user;
  
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
  
    try {
      const payments = await Payment.findAll({
        where: { user_id: userId },
        include: [
          {
            model: Appointment,
            as: 'Appointment',
            attributes: ['id', 'appointment_date'], // Include only required fields
          },
        ],
      });
  
      if (!payments || payments.length === 0) {
        return res.status(404).json({ message: 'No payments found for this user' });
      }
  
      return res.status(200).json({ payments });
    } catch (error) {
      console.error('Error fetching payments:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  


  exports.allPayments = async (req, res) => {
    try {
      const payments = await Payment.findAll({
        include: [
          {
            model: User,
            as: 'User',
            attributes: ['id', 'username', 'email'],
          },
          {
            model: Appointment,  // Add the Appointment model to include the appointment details
            as: 'Appointment',
            attributes: ['id', 'appointment_date'],  // Select the fields you need
          },
        ],
      });
  
      if (!payments || payments.length === 0) {
        return res.status(404).json({ message: 'No payments found' });
      }
  
      return res.status(200).json({ payments });
    } catch (error) {
      console.error('Error fetching payments:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  