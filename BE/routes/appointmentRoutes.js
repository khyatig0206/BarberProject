const express = require('express');
const { book } = require('../controllers/appointmentController'); // Import both signup and confirm controllers
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/book', authenticate, book );


module.exports = router;
