const jwt = require('jsonwebtoken');

function generateToken(id) {
    const payload = {
        userId: id
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
}

function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];  

    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }
}

module.exports = {
    generateToken,
    verifyToken
};