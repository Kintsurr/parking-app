const db = require('../config/db');

class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    async save() {
        const sql = "INSERT INTO `parking-app`.users (name, email, password) VALUES (?,?,?);"  ;
        const [newUser, _] = await db.execute(sql,[this.name, this.email, this.password]);

        return newUser;
    }

    static findAll() {
        const sql = "SELECT * FROM `parking-app`.users";

        return db.execute(sql);
    }

    static findById(id) {
        const sql = "SELECT * FROM `parking-app`.users WHERE idusers = ?"; 
        return db.execute(sql, [id]);
    }

   static async update(id, name, email, password) {
        const sql = "UPDATE `parking-app`.users SET name = ?, email = ?, password = ? WHERE idusers = ?";
        return  await db.execute(sql, [name, email, password, id]);
    }

    static remove(id) {
        const sql = "DELETE FROM `parking-app`.users WHERE idusers = ?";
        
        return db.execute(sql, [id]);;
    }
}

module.exports = User;