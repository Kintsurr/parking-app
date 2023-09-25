const ParkingHistory = require('../models/ParkingHistory');

exports.createEntry = async (req, res) => {
    try {
        let { carID, zoneID, startTime, endTime, totalCost } = req.body;
        let entry =await ParkingHistory.create(carID, zoneID, startTime, endTime, totalCost);
        
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

exports.getEntryById = async (req, res) => {
    try {
        const entryId = req.params.id;
        const [entry,_] = await ParkingHistory.findById(entryId);
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