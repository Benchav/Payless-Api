// src/controllers/managua.controller.js
const service = require('../services/managua.service');

async function getManagua(req, res, next) {
  try {
    const { jinotepe, chontales, masaya } = await service.getAllByCity();
    const total = (jinotepe?.length || 0) + (chontales?.length || 0) + (masaya?.length || 0);
    res.json({ jinotepe, chontales, masaya, total });
  } catch (err) {
    next(err);
  }
}

module.exports = { getManagua };