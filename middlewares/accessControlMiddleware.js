const db = require('../config/db'); // Assuming you have a database connection

const accessControlMiddleware = async (req, res, next) => {
  const  carID= req.params.id; // Extract user ID from the URL
  const idusers = req.userId;   // Extract car ID from the URL

  // Query the database to check if the user owns the car
  const query = 'SELECT * FROM `parking-app`.cars WHERE carID = ? AND idusers = ?';
  try {
    const [rows] = await db.execute(query, [carID, idusers]);

    // If the query returns no rows, the user doesn't own the car
    if (rows.length === 0) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // User has access, proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = accessControlMiddleware;