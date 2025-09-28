// src/server.js (para uso local / npm start)
require('dotenv').config(); // carga .env local
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Payless Shoes API listening at http://localhost:${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
});