// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

const validateBody = require('../middleware/validate.body');
const { registerSchema, loginSchema } = require('../models/user.schema');

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Registrar usuario (dev) con role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username: { type: string }
 *               password: { type: string }
 *               role: { type: string, enum: [ "managua","jinotepe","chontales","masaya","admin" ] }
 *     responses:
 *       201:
 *         description: Usuario creado
 */

router.post('/register', validateBody(registerSchema), authController.register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login - obtener JWT y role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Devuelve token JWT y role
 */
router.post('/login', validateBody(loginSchema), authController.login);

module.exports = router;