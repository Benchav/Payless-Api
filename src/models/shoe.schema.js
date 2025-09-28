const Joi = require('joi');

const base = {
  name: Joi.string().min(1).max(200).required(),
  brand: Joi.string().min(1).max(100).optional().default('Payless'),
  size: Joi.number().integer().min(15).max(60).required(),
  price: Joi.number().precision(2).min(0).optional().default(0),
  stock: Joi.number().integer().min(0).optional().default(0)
};

const newShoeSchema = Joi.object(base);

const updateShoeSchema = Joi.object({
  name: Joi.string().min(1).max(200).optional(),
  brand: Joi.string().min(1).max(100).optional(),
  size: Joi.number().integer().min(15).max(60).optional(),
  price: Joi.number().precision(2).min(0).optional(),
  stock: Joi.number().integer().min(0).optional()
}).min(1);

module.exports = { newShoeSchema, updateShoeSchema };