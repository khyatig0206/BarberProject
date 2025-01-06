const express = require('express');
const router = express.Router();
const {getAllUsers} = require('../controllers/userController');


router.get('/getusers', getAllUsers);

module.exports = router;
