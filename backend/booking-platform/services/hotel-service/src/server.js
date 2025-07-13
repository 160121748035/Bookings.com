const app = require('./app');

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
  console.log(`Hotel service running on port ${PORT}`);
}); 