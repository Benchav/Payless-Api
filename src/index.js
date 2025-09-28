// src/index.js  <-- entry para Vercel
const app = require('./app');

// Si exportas la app (express) Vercel la envuelve correctamente.
module.exports = app;