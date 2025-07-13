const express = require('express');
const paymentController = require('../controllers/payment.controller');
const validateInput = require('../middleware/validateInput');
const { paymentValidation } = require('../validation/payment.validation');

const router = express.Router();

// Process payment
router.post('/process', validateInput(paymentValidation.processPayment), paymentController.processPayment);

// Get payment by ID
router.get('/:id', paymentController.getPaymentById);

// Get payments by user
router.get('/user/:userId', paymentController.getPaymentsByUser);

// Refund payment
router.post('/:id/refund', paymentController.refundPayment);

// Get payment status
router.get('/:id/status', paymentController.getPaymentStatus);

// Create payment intent
router.post('/create-intent', validateInput(paymentValidation.createPaymentIntent), paymentController.createPaymentIntent);

module.exports = router; 