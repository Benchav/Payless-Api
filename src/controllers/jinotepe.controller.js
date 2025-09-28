// src/controllers/jinotepe.controller.js
const service = require('../services/jinotepe.service');
const Shoe = require('../models/shoe.model');

async function getJinotepe(req, res, next) {
  try {
    const items = await service.findAll();
    res.json(items);
  } catch (err) { next(err); }
}

async function createJinotepe(req, res, next) {
  try {
    const shoeModel = new Shoe(req.body, { prefix: 'jn' });
    const newShoe = await service.create(shoeModel.toPlainObject());
    res.status(201).location(`/api/jinotepe/${newShoe.id}`).json(newShoe);
  } catch (err) { next(err); }
}

async function getJinotepeById(req, res, next) {
  try {
    const item = await service.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) { next(err); }
}

async function updateJinotepe(req, res, next) {
  try {
    const updated = await service.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) { next(err); }
}

async function deleteJinotepe(req, res, next) {
  try {
    const ok = await service.remove(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Not found' });
    res.status(204).send();
  } catch (err) { next(err); }
}

module.exports = { getJinotepe, createJinotepe, getJinotepeById, updateJinotepe, deleteJinotepe };
