const express = require('express');
const { book , allappointments , reject , confirm , getAllNotifications,myappointments} = require('../controllers/appointmentController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/book', authenticate, book );
router.get('/myappointments', authenticate, myappointments );
router.get('/allbookings',allappointments);
router.post('/reject',reject);
router.post('/confirm',confirm);
router.get('/notifications', getAllNotifications);


module.exports = router;
