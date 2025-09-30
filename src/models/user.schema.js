// src/models/user.schema.js
const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).max(200).required(),
  role: Joi.string().valid('managua','jinotepe','chontales','masaya','granada','admin').required()
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  expectedRole: Joi.string().valid('managua','jinotepe','chontales','masaya','granada','admin').optional()
});

module.exports = { registerSchema, loginSchema };