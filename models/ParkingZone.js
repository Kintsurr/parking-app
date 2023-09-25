const db = require('../config/db');

class ParkingZone {
    constructor(name, address, hourly_rate) {
        this.name = name;
        this.address = address;
        this.hourly_rate = hourly_rate;
    }

    async save() {
        const sql = "INSERT INTO `parking-app`.parkingzones (name, address, hourly_rate) VALUES (?, ?, ?)";
        const [newZone,_] = await db.execute(sql, [this.name, this.address, this.hourly_rate]);
        return newZone;
    }
    static findAll() {
        const sql = "SELECT * FROM `parking-app`.parkingzones";
        
        return db.execute(sql);
    }

    static findById(zoneID) {
        const sql = "SELECT * FROM `parking-app`.parkingzones WHERE zoneID = ?";
         
        return db.execute(sql, [zoneID]);;
    }
   

    static async update(zoneID, name, address, hourly_rate) {
        const sql = "UPDATE `parking-app`.parkingzones SET name = ?, address = ?, hourly_rate = ? WHERE zoneID = ?";
        
        return await db.execute(sql, [name, address, hourly_rate, zoneID]);
    }

    static remove(zoneId) {
        const sql = "DELETE FROM `parking-app`.parkingzones WHERE zoneID = ?";
         
        return db.execute(sql, [zoneId]);
    }
}

module.exports = ParkingZone;
