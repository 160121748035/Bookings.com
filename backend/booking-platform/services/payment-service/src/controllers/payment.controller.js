const { PrismaClient } = require('@prisma/client');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const prisma = new PrismaClient();

const paymentController = {
  // Process payment
  processPayment: async (req, res) => {
    try {
      const { amount, currency, paymentMethodId, bookingId, userId } = req.body;

      // Create payment intent with Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Convert to cents
        currency: currency || 'usd',
        payment_method: paymentMethodId,
        confirm: true,
        return_url: process.env.PAYMENT_RETURN_URL
      });

      // Save payment record to database
      const payment = await prisma.payment.create({
        data: {
          amount,
          currency,
          status: paymentIntent.status,
          stripePaymentIntentId: paymentIntent.id,
          bookingId,
          userId,
          paymentMethod: 'stripe'
        }
      });

      res.json({
        success: true,
        payment,
        clientSecret: paymentIntent.client_secret
      });
    } catch (error) {
      res.status(500).json({ error: 'Payment processing failed', details: error.message });
    }
  },

  // Get payment by ID
  getPaymentById: async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await prisma.payment.findUnique({
        where: { id: parseInt(id) }
      });
      
      if (!payment) {
        return res.status(404).json({ error: 'Payment not found' });
      }
      
      res.json(payment);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch payment' });
    }
  },

  // Get payments by user
  getPaymentsByUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const payments = await prisma.payment.findMany({
        where: { userId: parseInt(userId) },
        orderBy: { createdAt: 'desc' }
      });
      
      res.json(payments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user payments' });
    }
  },

  // Refund payment
  refundPayment: async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await prisma.payment.findUnique({
        where: { id: parseInt(id) }
      });

      if (!payment) {
        return res.status(404).json({ error: 'Payment not found' });
      }

      // Process refund with Stripe
      const refund = await stripe.refunds.create({
        payment_intent: payment.stripePaymentIntentId
      });

      // Update payment status
      await prisma.payment.update({
        where: { id: parseInt(id) },
        data: { status: 'refunded' }
      });

      res.json({ success: true, refund });
    } catch (error) {
      res.status(500).json({ error: 'Refund processing failed' });
    }
  },

  // Get payment status
  getPaymentStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await prisma.payment.findUnique({
        where: { id: parseInt(id) }
      });
      
      if (!payment) {
        return res.status(404).json({ error: 'Payment not found' });
      }
      
      res.json({ status: payment.status });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch payment status' });
    }
  },

  // Create payment intent
  createPaymentIntent: async (req, res) => {
    try {
      const { amount, currency } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: currency || 'usd'
      });

      res.json({
        clientSecret: paymentIntent.client_secret
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create payment intent' });
    }
  }
};

module.exports = paymentController; 