const Car = require('../models/Car');

// Create a new car
exports.createCar = async (req, res) => {
    try {
        const idusers = req.userId;
        
        let {name, state_number, car_type } = req.body;
        if(!idusers) {
            return res.status(400).json({
                success: false,
                message: "User ID is missing in the request URL."
            });
        }
        let car = new Car(name, state_number, car_type);
         car = await car.save(idusers);

         
         res.status(200).json({
            success: true,
            data: car,
            message: 'car created successfully!'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating car.',
            error: error.message,
        });
    }
};

// Get all cars
exports.getAllCars = async (req, res) => {
    try {
        const [cars,_] = await Car.findAll();
        res.status(200).json({
            success: true,
            data: cars
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching cars.',
            error: error.message
        });
    }
};

// Get a specific car by ID
exports.getCarById = async (req, res) => {
    try {
        const carId = req.params.id;
        const [car,_] = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ 
                success: false,
                message: 'car not found.' });
        }
        res.status(200).json({
            success: true,
            data: car
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching cars.',
            error: error.message
        });
    }
};

// Update a car
exports.updateCar = async (req, res) => {
    try {
        const carID = req.params.id;
    
        const { name, state_number, car_type } = req.body;
        const [car,_] =await Car.update(carID, name, state_number, car_type);
        if(!car){
            res.status(401).json({
                success: False,
                message: "This use isn't allowed to change the car"
            });
        }
        
        res.status(200).json({
            success: true,
            data: car,
            message: 'car updated successfully!'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating car.',
            error: error.message
        });
    }
};

// Delete a car
exports.deleteCar = async (req, res) => {
    try {
        const carId = req.params.id;
        const result = await Car.remove(carId);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Car not found!" });
        }
        res.status(200).json({
            success: true,
            message: 'car deleted successfully!'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting car.',
            error: error.message
        });
    }
};
