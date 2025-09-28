// src/models/shoe.model.js
const { randomUUID } = require('crypto');

class Shoe {
  /**
   * data: { id?, name, brand, size, price, stock, createdAt? }
   * options: { prefix?: 'jn'|'ch'|'ma' } // opcional
   */
  constructor(data = {}, options = {}) {
    const {
      id = null,
      name,
      brand = 'Payless',
      size,
      price = 0,
      stock = 0,
      createdAt = null
    } = data;
    const { prefix = null } = options;

    // Generar id si no viene
    let generatedId = id;
    if (!generatedId) {
      // use Node built-in crypto.randomUUID() (works in Node 14.17+/18+)
      const uuid = typeof randomUUID === 'function' ? randomUUID() : null;

      // Fallback: si por alguna razón randomUUID no existe, usa timestamp+random
      if (!uuid) {
        const fallback = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
        generatedId = prefix ? `${prefix}-${fallback}` : fallback;
      } else {
        generatedId = prefix ? `${prefix}-${uuid}` : uuid;
      }
    }

    this.id = generatedId;
    this.name = name;
    this.brand = brand;
    this.size = size;
    this.price = price;
    this.stock = stock;
    this.createdAt = createdAt ? new Date(createdAt) : new Date();
  }

  toPlainObject() {
    return {
      id: this.id,
      name: this.name,
      brand: this.brand,
      size: this.size,
      price: this.price,
      stock: this.stock,
      createdAt: this.createdAt.toISOString()
    };
  }

  isInStock() {
    return Number(this.stock) > 0;
  }
}

module.exports = Shoe;