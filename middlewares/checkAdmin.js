const express = require('express');


const db = require('../config/db');

// Middleware to check if user is admin
const checkIfAdmin = async (req, res, next) => {
    try {
        // Assuming you have a way to identify the user (e.g., from a JWT or session)
        const idusers = req.userId;
        
        // Fetch the user from the database
        let [user,_] = await db.execute('SELECT is_admin FROM `parking-app`.users WHERE idusers = ?', [idusers]);
        user = user[0].is_admin;
        
        // If user doesn't exist or isn't an admin, throw an error
        if (user != 1) {
            return res.status(403).send({ message: 'Forbidden: You do not have admin privileges.' });
        }

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
module.exports = checkIfAdmin;