// src/services/chontales.service.js
const db = require('../config/firebase');

const COLLECTION = 'chontales';

async function findAll() {
  const snapshot = await db.collection(COLLECTION).get();
  return snapshot.docs.map(doc => doc.data());
}

async function findById(id) {
  const doc = await db.collection(COLLECTION).doc(id).get();
  return doc.exists ? doc.data() : null;
}

async function create(shoeObj) {
  const docRef = db.collection(COLLECTION).doc(shoeObj.id);
  await docRef.set(shoeObj);
  return shoeObj;
}

async function update(id, data) {
  const docRef = db.collection(COLLECTION).doc(id);
  const doc = await docRef.get();
  if (!doc.exists) return null;

  await docRef.update(data);
  return { ...doc.data(), ...data };
}

async function remove(id) {
  const docRef = db.collection(COLLECTION).doc(id);
  const doc = await docRef.get();
  if (!doc.exists) return false;

  await docRef.delete();
  return true;
}

module.exports = { findAll, findById, create, update, remove };