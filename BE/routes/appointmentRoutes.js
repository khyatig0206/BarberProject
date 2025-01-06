const express = require('express');
const { book , allappointments , reject , confirm} = require('../controllers/appointmentController'); // Import both signup and confirm controllers
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/book', authenticate, book );
router.get('/allbookings',allappointments);
router.post('/reject',reject);
router.post('/confirm',confirm);



module.exports = router;
