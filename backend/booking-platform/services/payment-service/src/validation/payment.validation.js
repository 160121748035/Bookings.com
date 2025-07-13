const { z } = require('zod');

const paymentValidation = {
  processPayment: z.object({
    amount: z.number().positive('Amount must be positive'),
    currency: z.string().min(3).max(3).default('usd'),
    paymentMethodId: z.string().min(1, 'Payment method ID is required'),
    bookingId: z.number().int().positive('Booking ID must be a positive integer'),
    userId: z.number().int().positive('User ID must be a positive integer')
  }),

  createPaymentIntent: z.object({
    amount: z.number().positive('Amount must be positive'),
    currency: z.string().min(3).max(3).default('usd')
  })
};

module.exports = { paymentValidation }; 