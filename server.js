require("dotenv").config(); // ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV SHOULD BE AT TOP


const express = require("express");
const userRoutes = require('./routes/userRoutes');

const parkingHistoryRoutes = require('./routes/parkingHistoryRoutes');
const parkingZoneRoutes = require('./routes/parkingZoneRoutes');

const app = express();

const verifyToken = require('./middlewares/authMiddleware');
// Middleware
app.use(express.json()); // parse json bodies in the request object

// Redirect requests to endpoint starting with /posts to postRoutes.js
app.use("/", require('./routes/authRoute'))
app.use("/posts", require("./routes/postRoutes"))

app.use('/users',verifyToken.verifyToken, userRoutes);

app.use('/parking-history', parkingHistoryRoutes);
app.use('/parking-zones', parkingZoneRoutes);
// Global Error Handler. IMPORTANT function params MUST start with err
app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: "Something went wrong",
  });
});

// Listen on pc port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
