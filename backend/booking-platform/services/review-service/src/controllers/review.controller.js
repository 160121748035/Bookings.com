const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const reviewController = {
  // Get all reviews
  getAllReviews: async (req, res) => {
    try {
      const reviews = await prisma.review.findMany({
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
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  },

  // Get review by ID
  getReviewById: async (req, res) => {
    try {
      const { id } = req.params;
      const review = await prisma.review.findUnique({
        where: { id: parseInt(id) },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });
      
      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }
      
      res.json(review);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch review' });
    }
  },

  // Create new review
  createReview: async (req, res) => {
    try {
      const review = await prisma.review.create({
        data: req.body,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create review' });
    }
  },

  // Update review
  updateReview: async (req, res) => {
    try {
      const { id } = req.params;
      const review = await prisma.review.update({
        where: { id: parseInt(id) },
        data: req.body,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });
      res.json(review);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update review' });
    }
  },

  // Delete review
  deleteReview: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.review.delete({
        where: { id: parseInt(id) }
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete review' });
    }
  },

  // Get reviews by hotel
  getReviewsByHotel: async (req, res) => {
    try {
      const { hotelId } = req.params;
      const reviews = await prisma.review.findMany({
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
      
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch hotel reviews' });
    }
  },

  // Get reviews by user
  getReviewsByUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const reviews = await prisma.review.findMany({
        where: { userId: parseInt(userId) },
        orderBy: { createdAt: 'desc' }
      });
      
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user reviews' });
    }
  },

  // Get average rating for hotel
  getAverageRating: async (req, res) => {
    try {
      const { hotelId } = req.params;
      
      const result = await prisma.review.aggregate({
        where: { hotelId: parseInt(hotelId) },
        _avg: {
          rating: true
        },
        _count: {
          rating: true
        }
      });
      
      res.json({
        averageRating: result._avg.rating || 0,
        totalReviews: result._count.rating
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to calculate average rating' });
    }
  }
};

module.exports = reviewController; 