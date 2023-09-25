require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
});

module.exports = pool.promise();
/*
let sql = "SELECT * FROM `parking-app`.users;"
pool.execute(sql, (err,res) => {
    if(err) throw err;
    res.forEach((res) => {
        console.log(res.name);
    })
}) */

