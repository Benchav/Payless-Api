// src/services/jinotepe.service.js
const db = require('../config/firebase');

const collection = db.collection('granada');

async function findAll() {
  const snapshot = await collection.get();
  return snapshot.docs.map(doc => doc.data());
}

async function findById(id) {
  const doc = await collection.doc(id).get();
  return doc.exists ? doc.data() : null;
}

async function create(shoeObj) {
  await collection.doc(shoeObj.id).set(shoeObj);
  return shoeObj;
}

async function update(id, data) {
  const docRef = collection.doc(id);
  const doc = await docRef.get();
  if (!doc.exists) return null;

  await docRef.update(data);
  return { ...doc.data(), ...data };
}

async function remove(id) {
  const docRef = collection.doc(id);
  const doc = await docRef.get();
  if (!doc.exists) return false;

  await docRef.delete();
  return true;
}

module.exports = { findAll, findById, create, update, remove };