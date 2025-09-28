// src/controllers/auth.controller.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authService = require('../services/auth.service');

// Usa variables de entorno (si no existen, usa fallback dev)
const JWT_SECRET = process.env.JWT_SECRET || 'mi_clave_local_super_segura_123';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '2h';

async function register(req, res, next) {
  try {
    const { username, password, role } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username y password requeridos' });
    }

    // verificar existencia
    const existing = await authService.findByUsername(username);
    if (existing) return res.status(409).json({ message: 'Usuario ya existe' });

    const passwordHash = bcrypt.hashSync(password, 8);
    const created = await authService.createUser({ username, passwordHash, role });

    return res
      .status(201)
      .json({ id: created.id, username: created.username, role: created.role });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ message: 'Error en registro' });
  }
}

async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username y password requeridos' });
    }

    const user = await authService.findByUsername(username);
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

    const isValid = bcrypt.compareSync(password, user.passwordHash);
    if (!isValid) return res.status(401).json({ message: 'Credenciales inválidas' });

    const payload = { sub: user.id, username: user.username, role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return res.json({
      token,
      expiresIn: JWT_EXPIRES_IN,
      role: user.role,
      user: { id: user.id, username: user.username, role: user.role },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Error en login' });
  }
}

module.exports = { register, login };