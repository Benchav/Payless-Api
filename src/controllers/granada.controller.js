// src/controllers/jinotepe.controller.js
const service = require('../services/granada.service');
const Shoe = require('../models/shoe.model');

async function getGranada(req, res, next) {
  try {
    const items = await service.findAll();
    res.json(items);
  } catch (err) { next(err); }
}

async function createGranada(req, res, next) {
  try {
    const shoeModel = new Shoe(req.body, { prefix: 'gr' });
    const newShoe = await service.create(shoeModel.toPlainObject());
    res.status(201).location(`/api/granada/${newShoe.id}`).json(newShoe);
  } catch (err) { next(err); }
}

async function getGranadaById(req, res, next) {
  try {
    const item = await service.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) { next(err); }
}

async function updateGranada(req, res, next) {
  try {
    const updated = await service.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) { next(err); }
}

async function deleteGranada(req, res, next) {
  try {
    const ok = await service.remove(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Not found' });
    res.status(204).send();
  } catch (err) { next(err); }
}

module.exports = { getGranada, createGranada, getGranadaById, updateGranada, deleteGranada };
