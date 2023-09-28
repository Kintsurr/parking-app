const ParkingZone = require('../models/ParkingZone');

exports.createZone = async (req, res) => {
    try {
        let { name, address, hourly_rate } = req.body;
        let zone = new ParkingZone(name, address, hourly_rate);
        zone = await zone.save();
        
        res.status(200).json({
            success: true,
            data: zone,
            message: 'zone created successfully!'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating parking zone.',
            error: error.message
        });
    }
};

exports.getAllZones = async (req, res) => {
    try {
        const [zones, _] = await ParkingZone.findAll();
        res.status(200).json({
            success: true,
            data: zones
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching zones.',
            error: error.message
        });
    }
};

exports.getZoneById = async (req, res) => {
    try {
        const zoneId = req.params.id;
        const [zone,_] = await ParkingZone.findById(zoneId);
        if (!zone) {
            return res.status(404).json({ 
                success: false,
                message: 'Zone not found.' });
        }
        res.status(200).json({
            success: true,
            data: zone
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching zone.',
            error: error.message
        });
    }
};

exports.updateZone = async (req, res) => {
    try {
        const zoneID = req.params.id;
        const { name, address, hourly_rate } = req.body;
        const [zone, _] = await ParkingZone.update(zoneID,name, address, hourly_rate);

        res.status(200).json({
            success: true,
            data: zone,
            message: 'zone updated successfully!'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating zone.',
            error: error.message
        });
};
}
exports.deleteZone = async (req, res) => {
    try {
        const zoneId = req.params.id;
        const result = await ParkingZone.remove(zoneId);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Zone not found!" });
        }
        res.status(200).json({
            success: true,
            message: 'zone deleted successfully!'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting zone.',
            error: error.message
        });
    }
};
