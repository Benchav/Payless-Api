// src/models/user.model.js
class User {
  constructor({ id = null, username, passwordHash, role = 'jinotepe', createdAt = null } = {}) {
    this.id = id || `u-${Date.now().toString(36)}`;
    this.username = username;
    this.passwordHash = passwordHash;
    this.role = role;
    this.createdAt = createdAt ? new Date(createdAt) : new Date();
  }

  toPlainObject() {
    return {
      id: this.id,
      username: this.username,
      passwordHash: this.passwordHash,
      role: this.role,
      createdAt: this.createdAt.toISOString()
    };
  }
}

module.exports = User;