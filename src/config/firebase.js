// src/config/firebase.js
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

function tryLoadServiceAccountJson() {
  try {
    const p = path.join(__dirname, '../../serviceAccountKey.json');
    if (fs.existsSync(p)) {
      return require(p);
    }
    return null;
  } catch (err) {
    return null;
  }
}

// 1) Si existe serviceAccountKey.json usarlo (DEV)
// 2) Sino usar variables de entorno (PROD)
const serviceAccount = tryLoadServiceAccountJson();

if (serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log('Firebase: init using local serviceAccountKey.json (dev mode)');
} else {
  // fallback: usar env vars (production)
  function cleanPrivateKey(key) {
    if (!key || typeof key !== 'string') return null;
    key = key.trim().replace(/^"(.*)"$/s, '$1').replace(/^'(.*)'$/s, '$1');
    if (key.includes('\\n')) key = key.replace(/\\n/g, '\n');
    key = key.trim();
    if (!key.startsWith('-----BEGIN PRIVATE KEY-----')) return null;
    if (!key.includes('-----END PRIVATE KEY-----')) return null;
    return key;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const rawKey = process.env.FIREBASE_PRIVATE_KEY || '';
  const privateKey = cleanPrivateKey(rawKey);

  if (!projectId || !clientEmail || !privateKey) {
    console.error('Firebase: credenciales incompletas o private key inválida.');
    console.error('FIREBASE_PROJECT_ID present?', !!projectId);
    console.error('FIREBASE_CLIENT_EMAIL present?', !!clientEmail);
    console.error('FIREBASE_PRIVATE_KEY present (raw length):', rawKey ? rawKey.length : 0);
    throw new Error('Falta FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL o FIREBASE_PRIVATE_KEY está mal formateada.');
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey
    })
  });
  console.log('Firebase: init using env variables (production mode)');
}

const db = admin.firestore();
module.exports = db;