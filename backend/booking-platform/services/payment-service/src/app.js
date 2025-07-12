const express = require('express');
const paymentRoutes = require('./routes/payment.routes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/payments', paymentRoutes);

app.get('/', (_, res) => res.send('Payment Service Running'));

module.exports = app; 