const express = require('express');
const router = express.Router();

const parkingZoneController = require('../controllers/parkingZoneController');

// Create a new parking zone
router.route('/getAll').get(parkingZoneController.getAllZones);
router.route('/createNew').post( parkingZoneController.createZone)
router.route('/:id').get( parkingZoneController.getZoneById).put(parkingZoneController.updateZone).delete(parkingZoneController.deleteZone);
module.exports = router;