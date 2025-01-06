require('dotenv').config(); 
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Set your Razorpay test API credentials in .env
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (amount) => {
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      payment_capture: 1, // Auto-capture after successful payment
    });
    return order;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw new Error('Could not initiate payment');
  }
};

module.exports = createOrder;
