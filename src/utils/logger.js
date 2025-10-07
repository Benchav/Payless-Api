// src/utils/logger.js
const pino = require('pino');

const isProd = process.env.NODE_ENV === 'production';

const pretty = pino.transport && !isProd ? pino.transport({
  target: 'pino-pretty',
  options: { colorize: true, translateTime: 'SYS:standard', ignore: 'pid,hostname' }
}) : undefined;

const logger = pino(
  {
    level: process.env.LOG_LEVEL || (isProd ? 'info' : 'debug'),
    base: { service: 'payless-api' },
    timestamp: pino.stdTimeFunctions.isoTime
  },
  pretty ? pretty : undefined
);

module.exports = logger;