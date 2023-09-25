const express = require('express');
const router = express.Router();

const parkingHistoryController = require('../controllers/parkingHistoryController');


router.route('/').post( parkingHistoryController.createEntry).get(parkingHistoryController.getAllEntries);

router.route('/:id').get(parkingHistoryController.getEntryById).delete(parkingHistoryController.deleteEntry);
//.put(parkingHistoryController.updateParkingHistory).
module.exports = router;