const axios = require('axios');

const services = [
  { name: 'Auth Service', url: 'http://localhost:4000' },
  { name: 'Booking Service', url: 'http://localhost:4001' },
  { name: 'Hotel Service', url: 'http://localhost:4002' },
  { name: 'Payment Service', url: 'http://localhost:4003' },
  { name: 'Review Service', url: 'http://localhost:4004' }
];

async function testServices() {
  console.log('Testing all services...\n');
  
  for (const service of services) {
    try {
      const response = await axios.get(service.url, { timeout: 5000 });
      console.log(`✅ ${service.name}: ${response.data}`);
    } catch (error) {
      console.log(`❌ ${service.name}: ${error.message}`);
    }
  }
  
  console.log('\nTest completed!');
}

testServices(); 