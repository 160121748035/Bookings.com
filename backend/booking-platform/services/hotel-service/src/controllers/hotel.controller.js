const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const hotelController = {
  // Get all hotels
  getAllHotels: async (req, res) => {
    try {
      const hotels = await prisma.hotel.findMany();
      res.json(hotels);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch hotels' });
    }
  },

  // Get hotel by ID
  getHotelById: async (req, res) => {
    try {
      const { id } = req.params;
      const hotel = await prisma.hotel.findUnique({
        where: { id: parseInt(id) }
      });
      
      if (!hotel) {
        return res.status(404).json({ error: 'Hotel not found' });
      }
      
      res.json(hotel);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch hotel' });
    }
  },

  // Create new hotel
  createHotel: async (req, res) => {
    try {
      const hotel = await prisma.hotel.create({
        data: req.body
      });
      res.status(201).json(hotel);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create hotel' });
    }
  },

  // Update hotel
  updateHotel: async (req, res) => {
    try {
      const { id } = req.params;
      const hotel = await prisma.hotel.update({
        where: { id: parseInt(id) },
        data: req.body
      });
      res.json(hotel);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update hotel' });
    }
  },

  // Delete hotel
  deleteHotel: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.hotel.delete({
        where: { id: parseInt(id) }
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete hotel' });
    }
  },

  // Search hotels
  searchHotels: async (req, res) => {
    try {
      const { location, checkIn, checkOut, guests } = req.query;
      
      const hotels = await prisma.hotel.findMany({
        where: {
          location: {
            contains: location || '',
            mode: 'insensitive'
          }
        }
      });
      
      res.json(hotels);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search hotels' });
    }
  }
};

module.exports = hotelController; 