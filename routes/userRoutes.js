// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const checkAdmin = require('../middlewares/checkAdmin');

const router = express.Router();
const carRoutes = require('../routes/carRoutes');
const parkingZoneRoutes = require('../routes/parkingZoneRoutes');
const parkingHistoryRoutes = require('../routes/parkingHistoryRoutes');


router.param('id', (req, res, next, id) => {
    req.userId = id; // Attach :id parameter to the request object
    next();
  });

router.route('/:id').get( userController.getUserById);
router.route('/:id/update').put( userController.updateUser);
router.route('/:id/delete').delete( userController.deleteUser);
router.use('/:id/cars', carRoutes)
router.use(':id/parking-history', parkingHistoryRoutes);
router.use('/:id/parking-zones', checkAdmin, parkingZoneRoutes);
router.route('/:id/getAll').get(checkAdmin, userController.getAllUsers);

module.exports = router;