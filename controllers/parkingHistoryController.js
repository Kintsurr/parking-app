const ParkingHistory = require('../models/ParkingHistory');
const db = require('../config/db');
exports.createEntry = async (req, res) => {
    try {
        let { carID, zoneID} = req.body;
        let startTime = new Date();
        let entry =await ParkingHistory.create(carID, zoneID, startTime, null, null);
        let idusers = req.userId;
        const query = 'SELECT * FROM `parking-app`.cars WHERE carID = ? AND idusers = ?';
        const [rows] = await db.execute(query, [carID, idusers]);

            if (rows.length === 0) {
                return res.status(403).json({ error: 'Access denied' });
            }
        res.status(200).json({
            success: true,
            data: entry,
            message: 'parking history created successfully!'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating parking history.',
            error: error.message
        });
    }
};
exports.endEntry = async (req, res) => {
    try {
        let { carID, zoneID } = req.body;
        let idusers = req.userId;
        let endTime = new Date();
        const query = 'SELECT * FROM `parking-app`.cars WHERE carID = ? AND idusers = ?';
        const [rows] = await db.execute(query, [carID, idusers]);

        if (rows.length === 0) {
            return res.status(403).json({ error: 'Access denied' });
        }
        
        const [existingEntry, _] = await ParkingHistory.findByCarAndZone(carID, zoneID);
        
        if (!existingEntry || !existingEntry.length) {
            return res.status(404).json({
                success: false,
                message: 'Parking entry not found.'
            });
        }
        
        // Fetch the hourly rate from parkingZone table
        const [hourlyRate,] = await ParkingHistory.getParkingZoneHourlyRate(zoneID);  

    
        let duration = (endTime - existingEntry[0].startTime) / (1000 * 60 * 60);  // in hours
        let totalCost = duration * hourlyRate[0].hourly_rate;

        await ParkingHistory.deductCostFromBalance(idusers ,totalCost);
        // Update parking history entry
        await ParkingHistory.update(existingEntry[0].historyID, carID, zoneID, existingEntry[0].startTime, endTime, totalCost);
        
        res.status(200).json({
            success: true,
            data: { endTime, totalCost },
            message: 'Parking ended successfully!'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error ending parking.',
            error: error.message
        });
    }
};
exports.getAllEntries = async (req, res) => {
    try {
        const [entries,_] = await ParkingHistory.findAll();
        res.status(200).json({
            success: true,
            data: entries
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching history.',
            error: error.message
        });
    }
};

exports.getEntryByCarId = async (req, res) => {
    try {
        const entryId = req.body;
        
        const [entry,_] = await ParkingHistory.findById(entryId.carID);
        if (!entry) {
            return res.status(404).json({ 
                success: false,
                message: 'history not found by id.' });
        }
        res.status(200).json({
            success: true,
            data: entry
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching history by id.',
            error: error.message
        });
    }
};

exports.deleteEntry = async (req, res) => {
    try {
        const entryId = req.params.id;
        const result = await ParkingHistory.remove(entryId);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Entry not found!" });
        }
        res.status(200).json({
            success: true,
            message: 'history deleted successfully!'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting history.',
            error: error.message
        });
    }
};