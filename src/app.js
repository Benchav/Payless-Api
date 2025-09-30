// src/app.js
const express = require('express');
const cors = require('cors');

const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const locationsRoutes = require('./routes/locations.routes');
const authRoutes = require('./routes/auth.routes');
const authMiddleware = require('./middleware/auth.middleware');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

// --- Security & common middleware ---
app.use(helmet());
app.use(compression());

// CORS: restringe en producción con env CORS_ORIGIN
// CORS: abierto en desarrollo, restringido en producción
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',')
  : ['*']; // permite todos los orígenes temporalmente

app.use(cors({
  origin: (origin, callback) => {
    callback(null, true); // deja pasar cualquier origen mientras pruebas
  },
  credentials: true
}));



// limitar tamaño del body para evitar payloads enormes
app.use(express.json({ limit: '10kb' }));

// Logging: morgan en formato combinado. En prod puedes cambiar a pino/winston.
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Rate limiting global
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false
});
app.use(globalLimiter);

// Rate limit estricto para endpoints sensibles
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Too many authentication attempts, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});

// --- Swagger config ---
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Payless Shoes API',
      version: '1.0.0',
      description: 'API de ejemplo para Payless Shoes'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Pega tu token aquí. Puedes incluirlo como `Bearer <token>` o solo el `<token>`.'
        }
      },
      schemas: {
        Shoe: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            brand: { type: 'string' },
            size: { type: 'integer' },
            price: { type: 'number', format: 'float' },
            stock: { type: 'integer' },
            createdAt: { type: 'string', format: 'date-time' }
          },
          required: ['id', 'name', 'size', 'createdAt']
        },
        NewShoe: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            brand: { type: 'string' },
            size: { type: 'integer' },
            price: { type: 'number', format: 'float' },
            stock: { type: 'integer' }
          },
          required: ['name', 'size']
        }
      }
    },
    security: [{ bearerAuth: [] }],
    servers: [{ url: process.env.SERVER_URL || 'http://localhost:3000' }]
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/auth/login', authLimiter);
app.use('/auth/register', authLimiter);
app.use('/auth', authRoutes);

// Rutas protegidas con JWT
app.use('/api', authMiddleware, locationsRoutes);

// Health check
app.get('/', (req, res) => res.send('Payless Shoes API is running'));

// Error handler básico
app.use((err, req, res, next) => {
  console.error(err);
  if (res.headersSent) return next(err);
  const status = err.status || 500;
  const message = process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message;
  res.status(status).json({ message });
});

module.exports = app;