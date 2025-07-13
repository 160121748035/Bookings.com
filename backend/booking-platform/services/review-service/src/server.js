const app = require('./app');

const PORT = process.env.PORT || 4004;

app.listen(PORT, () => {
  console.log(`Review service running on port ${PORT}`);
}); 
 