const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.route('/register').post(authController.signup)
router.route('/logIn').post(authController.logIn)
module.exports = router;
