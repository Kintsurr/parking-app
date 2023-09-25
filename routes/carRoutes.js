const express = require('express');
const router = express.Router();

const carController = require('../controllers/carController');

router.route('/').post(carController.createCar).get(carController.getAllCars);

router.route('/:id').get( carController.getCarById).put(carController.updateCar);

// Delete a car
router.route('/:id').delete( carController.deleteCar);

module.exports = router;
