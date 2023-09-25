const db = require('../config/db');

class Car {
    constructor(idusers, name, state_number, car_type) {
        this.idusers = idusers;
        this.name = name;
        this.state_number = state_number;
        this.car_type = car_type;
    }

    async save() {
        const sql = "INSERT INTO `parking-app`.cars (idusers, name, state_number, car_type) VALUES (?, ?, ?, ?)";
        const [newCar] = await db.execute(sql, [this.idusers, this.name, this.state_number, this.car_type]);
        return newCar;
    }

    static  findAll() {
        const sql = "SELECT * FROM `parking-app`.cars";
    
        return db.execute(sql);
    }

    static  findById(carId) {
        const sql = "SELECT * FROM `parking-app`.cars WHERE carID = ?";

        return db.execute(sql, [carId]);
    }

    static async update(carID, name,state_number,car_type) {
        const sql = "UPDATE `parking-app`.cars SET name = ?, state_number = ?, car_type = ? WHERE carID = ?";
        
        return await db.execute(sql, [name, state_number, car_type, carID]);
    }

    static remove(carId) {
        const sql = "DELETE FROM `parking-app`.cars WHERE carID = ?";
    
        return db.execute(sql, [carId]);
    }
}

module.exports = Car;