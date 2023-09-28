// controllers/userController.js
const generateToken = require('../middlewares/authMiddleware')
const User = require('../models/User'); 


exports.getAllUsers = async (req, res) => {
    try {
        const [users, _] = await User.findAll();

        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching users.',
            error: error.message
        });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const [user,_] = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching user.',
            error: error.message
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, password } = req.body;
        const [user, _] = await User.update(userId, name, email, password);
        
        const token = generateToken.generateToken(userId);
        res.status(200).json({
            success: true,
            message: 'User updated successfully!',
            token: token,
            data: user,
            
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating user.',
            error: error.message
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const result = await User.remove(userId);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Zone not found!" });
        }
        res.status(200).json({
            success: true,
            message: 'User deleted successfully!'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting user.',
            error: error.message
        });
    }
};
