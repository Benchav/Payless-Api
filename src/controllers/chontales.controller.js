// src/controllers/chontales.controller.js
const service = require('../services/chontales.service');
const Shoe = require('../models/shoe.model');

async function getChontales(req, res, next) {
  try {
    const shoes = await service.findAll();
    res.json(shoes);
  } catch (err) { next(err); }
}

async function createChontales(req, res, next) {
  try {
    const shoeModel = new Shoe(req.body, { prefix: 'ch' });
    const newShoe = await service.create(shoeModel.toPlainObject());
    res.status(201).location(`/api/chontales/${newShoe.id}`).json(newShoe);
  } catch (err) { next(err); }
}

async function getChontalesById(req, res, next) {
  try {
    const item = await service.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) { next(err); }
}

async function updateChontales(req, res, next) {
  try {
    const updated = await service.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) { next(err); }
}

async function deleteChontales(req, res, next) {
  try {
    const ok = await service.remove(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Not found' });
    res.status(204).send();
  } catch (err) { next(err); }
}

module.exports = { getChontales, createChontales, getChontalesById, updateChontales, deleteChontales };
