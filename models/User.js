const db = require('../config/db');
const bcrypt = require('bcryptjs');
class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    async save() {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

        const sql = "INSERT INTO `parking-app`.users (name, email, password) VALUES (?,?,?);"  ;
        const [newUser, _] = await db.execute(sql,[this.name, this.email, this.password]);
        
        const id = newUser.insertId
        return [this, id];
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
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        const sql = "UPDATE `parking-app`.users SET name = ?, email = ?, password = ? WHERE idusers = ?";
        return  await db.execute(sql, [name, email, password, id]);
    }

    static remove(id) {
        const sql = "DELETE FROM `parking-app`.users WHERE idusers = ?";
        
        return db.execute(sql, [id]);;
    }
}

module.exports = User;