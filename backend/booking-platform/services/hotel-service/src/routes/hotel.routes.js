const express = require('express');
const hotelController = require('../controllers/hotel.controller');
const validateInput = require('../middleware/validateInput');
const { hotelValidation } = require('../validation/hotel.validation');

const router = express.Router();

// Get all hotels
router.get('/', hotelController.getAllHotels);

// Get hotel by ID
router.get('/:id', hotelController.getHotelById);

// Create new hotel
router.post('/', validateInput(hotelValidation.createHotel), hotelController.createHotel);

// Update hotel
router.put('/:id', validateInput(hotelValidation.updateHotel), hotelController.updateHotel);

// Delete hotel
router.delete('/:id', hotelController.deleteHotel);

// Search hotels
router.get('/search', hotelController.searchHotels);

module.exports = router; 