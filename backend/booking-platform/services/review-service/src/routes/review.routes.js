const express = require('express');
const reviewController = require('../controllers/review.controller');
const validateInput = require('../middleware/validateInput');
const { reviewValidation } = require('../validation/review.validation');

const router = express.Router();

// Get all reviews
router.get('/', reviewController.getAllReviews);

// Get review by ID
router.get('/:id', reviewController.getReviewById);

// Create new review
router.post('/', validateInput(reviewValidation.createReview), reviewController.createReview);

// Update review
router.put('/:id', validateInput(reviewValidation.updateReview), reviewController.updateReview);

// Delete review
router.delete('/:id', reviewController.deleteReview);

// Get reviews by hotel
router.get('/hotel/:hotelId', reviewController.getReviewsByHotel);

// Get reviews by user
router.get('/user/:userId', reviewController.getReviewsByUser);

// Get average rating for hotel
router.get('/hotel/:hotelId/average', reviewController.getAverageRating);

module.exports = router; 