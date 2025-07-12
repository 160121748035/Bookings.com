const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const bookingController = {
  // Get all bookings
  getAllBookings: async (req, res) => {
    try {
      const bookings = await prisma.booking.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          hotel: {
            select: {
              id: true,
              name: true,
              location: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch bookings' });
    }
  },

  // Get booking by ID
  getBookingById: async (req, res) => {
    try {
      const { id } = req.params;
      const booking = await prisma.booking.findUnique({
        where: { id: parseInt(id) },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          hotel: {
            select: {
              id: true,
              name: true,
              location: true
            }
          }
        }
      });
      
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch booking' });
    }
  },

  // Create new booking
  createBooking: async (req, res) => {
    try {
      const booking = await prisma.booking.create({
        data: req.body,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          hotel: {
            select: {
              id: true,
              name: true,
              location: true
            }
          }
        }
      });
      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create booking' });
    }
  },

  // Update booking
  updateBooking: async (req, res) => {
    try {
      const { id } = req.params;
      const booking = await prisma.booking.update({
        where: { id: parseInt(id) },
        data: req.body,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          hotel: {
            select: {
              id: true,
              name: true,
              location: true
            }
          }
        }
      });
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update booking' });
    }
  },

  // Delete booking
  deleteBooking: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.booking.delete({
        where: { id: parseInt(id) }
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete booking' });
    }
  },

  // Get bookings by user
  getBookingsByUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const bookings = await prisma.booking.findMany({
        where: { userId: parseInt(userId) },
        include: {
          hotel: {
            select: {
              id: true,
              name: true,
              location: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });
      
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user bookings' });
    }
  },

  // Get bookings by hotel
  getBookingsByHotel: async (req, res) => {
    try {
      const { hotelId } = req.params;
      const bookings = await prisma.booking.findMany({
        where: { hotelId: parseInt(hotelId) },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });
      
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch hotel bookings' });
    }
  },

  // Cancel booking
  cancelBooking: async (req, res) => {
    try {
      const { id } = req.params;
      const booking = await prisma.booking.update({
        where: { id: parseInt(id) },
        data: { status: 'cancelled' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          hotel: {
            select: {
              id: true,
              name: true,
              location: true
            }
          }
        }
      });
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: 'Failed to cancel booking' });
    }
  }
};

module.exports = bookingController; 