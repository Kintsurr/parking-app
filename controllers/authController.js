const User = require('../models/User'); 
const bcrypt = require('bcryptjs');
const generateToken = require('../middlewares/authMiddleware')
const db = require('../config/db');
exports.signup = async (req, res, next) =>{
    try {
        let { name, email, password } = req.body;
        let user = new User(name, email, password);  
        let id;
        [user, id] = await user.save();

        const token = generateToken.generateToken(id);
        
        res.status(201).json({
            success: true,
            message: 'User created successfully!',
            token: token,
            location: `/users/${id}`,
            data: user,
        });
    } catch (error) {
        
        res.status(500).json({
            success: false,
            message: 'Error creating user.',
            error: error.message
        });
       
    }
}
exports.logIn =async (req, res, next) =>{
    try {
        const { email, password } = req.body;

        // Fetch user from database
        const [users,_] =await db.execute("SELECT * FROM `parking-app`.users WHERE email = ?", [email]);
        const user = users[0];

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect email or password'
            });
        }

        // Compare hashed password with provided password
        const passwordIsValid = bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect email or password'
            });
        }

        // Generate JWT for user
        const token = generateToken.generateToken(user.idusers);

        res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            data: user,
            token: token,
            location: `/users/${user.idusers}`
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error logging in',
            error: error.message
        });
    }
}