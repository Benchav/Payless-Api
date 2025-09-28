// src/middleware/auth.middleware.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'mi_clave_local_super_segura_123';

function authMiddleware(req, res, next) {
  const authHeader = (req.header('authorization') || '').trim();
  if (!authHeader) {
    return res.status(401).json({ message: 'Token no enviado' });
  }

  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : authHeader;

  if (!token) {
    return res.status(401).json({ message: 'Token no enviado' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = {
      id: payload.sub,
      username: payload.username,
      role: payload.role,
    };
    next();
  } catch (err) {
    console.error('Auth error:', err);
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado' });
    }
    return res.status(401).json({ message: 'Token inválido' });
  }
}

module.exports = authMiddleware;