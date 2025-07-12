const express = require('express');
const reviewRoutes = require('./routes/review.routes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/reviews', reviewRoutes);

app.get('/', (_, res) => res.send('Review Service Running'));

module.exports = app; 