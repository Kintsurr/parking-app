const express = require('express');
const accessControlMiddleware = require('../middlewares/accessControlMiddleware');
const checkAdmin = require('../middlewares/checkAdmin');
const carController = require('../controllers/carController');
const router = express.Router();


router.route('/add').post(carController.createCar) 
router.route('/getAll').get(checkAdmin, carController.getAllCars)

router.route('/:id/update').put(accessControlMiddleware,carController.updateCar);
router.route('/:id').delete(accessControlMiddleware, carController.deleteCar);
router.route('/:id').get(accessControlMiddleware, carController.getCarById)

module.exports = router;
