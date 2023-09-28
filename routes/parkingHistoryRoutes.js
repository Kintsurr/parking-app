const express = require('express');
const router = express.Router();

const parkingHistoryController = require('../controllers/parkingHistoryController');


router.route('/add').post( parkingHistoryController.createEntry);
router.route('/getAll').get(parkingHistoryController.getAllEntries);

router.route('/:id').get(parkingHistoryController.getEntryById)//.delete(parkingHistoryController.deleteEntry);
//.put(parkingHistoryController.updateParkingHistory).
module.exports = router;