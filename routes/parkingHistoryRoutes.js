const express = require('express');
const router = express.Router();
const checkAdmin = require('../middlewares/checkAdmin');
const parkingHistoryController = require('../controllers/parkingHistoryController');


router.route('/add').post( parkingHistoryController.createEntry);
router.route('/end').post( parkingHistoryController.endEntry);
router.route('/getAll').get(checkAdmin, parkingHistoryController.getAllEntries);

router.route('/history').get(parkingHistoryController.getEntryByCarId);
module.exports = router;