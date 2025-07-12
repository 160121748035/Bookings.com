const express = require('express');
const bookingRoutes = require('./routes/booking.routes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/bookings', bookingRoutes);

app.get('/', (_, res) => res.send('Booking Service Running'));

module.exports = app;
