// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
//const carRoutes = require('../routes/carRoutes');
const router = express.Router();
const carRoutes = require('../routes/carRoutes');
//router.route('/register').post( userController.createUser);
//router.route('/').get( userController.getAllUsers);
//router.use('/:id/cars', carRoutes);
router.param('id', (req, res, next, id) => {
    req.userId = id; // Attach :id parameter to the request object
    next();
  });
  
router.route('/:id').get( userController.getUserById);
router.use('/:id/cars', carRoutes)
router.route('/:id/update').put( userController.updateUser);
router.route('/:id/delete').delete( userController.deleteUser);


module.exports = router;