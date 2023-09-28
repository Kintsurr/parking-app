const db = require('../config/db');

class ParkingHistory {
    static create(carID, zoneID, startTime, endTime, totalCost) {
        const sql = "INSERT INTO `parking-app`.parkinghistory (carID, zoneID, startTime, endTime, totalCost) VALUES (?, ?, ?, ?, ?)";
    
        return db.execute(sql, [carID, zoneID, startTime, endTime, totalCost]);
    }

    static findAll() {
        const sql = "SELECT * FROM `parking-app`.parkinghistory";
        
        return db.execute(sql);
    }
    static findByCarAndZone(carID, zoneID) {
        const sql = "SELECT * FROM `parking-app`.parkinghistory WHERE carID = ? AND zoneID = ? AND endTime IS NULL";
        return db.execute(sql, [carID, zoneID]);
    }
    static findById(recordId) {
        
        const sql = "SELECT * FROM `parking-app`.parkinghistory WHERE carID = ?";
        return db.execute(sql, [recordId]);
    }

    static findByZoneId(zoneID) {
        const sql = "SELECT * FROM `parking-app`.parkinghistory WHERE zoneID = ?";
        
        return db.execute(sql, [zoneID]);
    }
    static getParkingZoneHourlyRate(zoneID){
        const sql = "SELECT hourly_rate FROM `parking-app`.parkingzones WHERE zoneID = ?";
        return db.execute(sql, [zoneID]);
    }
    static deductCostFromBalance(userID, cost) {
        
        const sql = "UPDATE `parking-app`.users SET virtual_balance = virtual_balance - ? WHERE idusers = ?";
        return db.execute(sql, [cost, userID]);
    }
    static async update(recordId, carID, zoneID, startTime, endTime, cost) {
        const sql = "UPDATE `parking-app`.parkinghistory SET carID = ?, zoneID = ?, startTime = ?, endTime = ?, totalCost = ? WHERE historyID = ?";
        
        return  await db.execute(sql, [carID, zoneID, startTime, endTime, cost, recordId])
    }

    static remove(recordId) {
        const sql = "DELETE FROM `parking-app`.parkinghistory WHERE historyID = ?";
       
        return db.execute(sql, [recordId]);;
    }
}

module.exports = ParkingHistory;