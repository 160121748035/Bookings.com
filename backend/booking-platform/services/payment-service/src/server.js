const app = require('./app');

const PORT = process.env.PORT || 4003;

app.listen(PORT, () => {
  console.log(`Payment service running on port ${PORT}`);
}); 