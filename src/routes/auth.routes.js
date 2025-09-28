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
 *               expectedRole: { type: string, enum: [ "managua","jinotepe","chontales","masaya","admin" ], description: "Opcional. Rol del panel desde el que se intenta iniciar sesión. Si se pasa y no coincide con el rol del usuario (salvo managua/admin), se rechaza el login." }
 *     responses:
 *       200:
 *         description: Devuelve token JWT y role
 *       403:
 *         description: Usuario no autorizado para iniciar sesión en este panel
 */
router.post('/login', validateBody(loginSchema), authController.login);

module.exports = router;