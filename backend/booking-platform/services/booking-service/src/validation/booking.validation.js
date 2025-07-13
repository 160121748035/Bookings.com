const { z } = require('zod');

const bookingValidation = {
  createBooking: z.object({
    userId: z.number().int().positive('User ID is required'),
    hotelId: z.number().int().positive('Hotel ID is required'),
    checkIn: z.string().datetime('Check-in date must be a valid date'),
    checkOut: z.string().datetime('Check-out date must be a valid date'),
    guests: z.number().int().positive('Number of guests is required'),
    totalPrice: z.number().positive('Total price must be positive'),
    status: z.enum(['pending', 'confirmed', 'cancelled']).default('pending')
  }),

  updateBooking: z.object({
    checkIn: z.string().datetime('Check-in date must be a valid date').optional(),
    checkOut: z.string().datetime('Check-out date must be a valid date').optional(),
    guests: z.number().int().positive('Number of guests is required').optional(),
    totalPrice: z.number().positive('Total price must be positive').optional(),
    status: z.enum(['pending', 'confirmed', 'cancelled']).optional()
  })
};

module.exports = { bookingValidation }; 