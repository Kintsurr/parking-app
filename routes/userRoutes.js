// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

//router.route('/register').post( userController.createUser);
//router.route('/').get( userController.getAllUsers);
router.route('/:id').get( userController.getUserById);
router.route('/:id/update').put( userController.updateUser);
router.route('/:id/delete').delete( userController.deleteUser);

module.exports = router;