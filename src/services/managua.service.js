// src/services/managua.service.js
const db = require('../config/firebase');

const COLL_JINOTEPE = 'jinotepe';
const COLL_CHONTALES = 'chontales';
const COLL_MASAYA = 'masaya';

async function _getAllFromCollection(collectionName) {
  const snapshot = await db.collection(collectionName).get();
  return snapshot.docs.map(doc => doc.data());
}

async function getAllByCity() {
  // Ejecutar las 3 consultas en paralelo
  const [jinotepe, chontales, masaya] = await Promise.all([
    _getAllFromCollection(COLL_JINOTEPE),
    _getAllFromCollection(COLL_CHONTALES),
    _getAllFromCollection(COLL_MASAYA)
  ]);

  return { jinotepe, chontales, masaya };
}

module.exports = { getAllByCity };
