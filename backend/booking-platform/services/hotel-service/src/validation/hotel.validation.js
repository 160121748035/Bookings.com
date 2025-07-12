const { z } = require('zod');

const hotelValidation = {
  createHotel: z.object({
    name: z.string().min(1, 'Hotel name is required'),
    description: z.string().optional(),
    location: z.string().min(1, 'Location is required'),
    address: z.string().min(1, 'Address is required'),
    rating: z.number().min(0).max(5).optional(),
    pricePerNight: z.number().positive('Price must be positive'),
    amenities: z.array(z.string()).optional(),
    images: z.array(z.string().url()).optional(),
    contactInfo: z.object({
      phone: z.string().optional(),
      email: z.string().email().optional()
    }).optional()
  }),

  updateHotel: z.object({
    name: z.string().min(1, 'Hotel name is required').optional(),
    description: z.string().optional(),
    location: z.string().min(1, 'Location is required').optional(),
    address: z.string().min(1, 'Address is required').optional(),
    rating: z.number().min(0).max(5).optional(),
    pricePerNight: z.number().positive('Price must be positive').optional(),
    amenities: z.array(z.string()).optional(),
    images: z.array(z.string().url()).optional(),
    contactInfo: z.object({
      phone: z.string().optional(),
      email: z.string().email().optional()
    }).optional()
  })
};

module.exports = { hotelValidation }; 