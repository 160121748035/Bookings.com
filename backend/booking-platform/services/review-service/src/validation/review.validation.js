const { z } = require('zod');

const reviewValidation = {
  createReview: z.object({
    hotelId: z.number().int().positive('Hotel ID is required'),
    userId: z.number().int().positive('User ID is required'),
    rating: z.number().min(1).max(5, 'Rating must be between 1 and 5'),
    comment: z.string().min(1, 'Comment is required').max(1000, 'Comment too long')
  }),

  updateReview: z.object({
    rating: z.number().min(1).max(5, 'Rating must be between 1 and 5').optional(),
    comment: z.string().min(1, 'Comment is required').max(1000, 'Comment too long').optional()
  })
};

module.exports = { reviewValidation }; 