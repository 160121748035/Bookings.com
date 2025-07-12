const express = require('express');
const hotelRoutes = require('./routes/hotel.routes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/hotels', hotelRoutes);

app.get('/', (_, res) => res.send('Hotel Service Running'));

module.exports = app; 