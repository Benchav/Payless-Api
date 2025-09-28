// src/services/auth.service.js
const db = require('../config/firebase');
const User = require('../models/user.model');

const USERS_COLL = 'users';

async function findByUsername(username) {
  const snapshot = await db.collection(USERS_COLL).where('username', '==', username).limit(1).get();
  if (snapshot.empty) return null;
  return snapshot.docs[0].data();
}

async function findById(id) {
  const doc = await db.collection(USERS_COLL).doc(id).get();
  return doc.exists ? doc.data() : null;
}

async function createUser({ username, passwordHash, role }) {
  // crea un id único con el modelo
  const user = new User({ username, passwordHash, role });
  await db.collection(USERS_COLL).doc(user.id).set(user.toPlainObject());
  return user.toPlainObject();
}

module.exports = { findByUsername, findById, createUser };