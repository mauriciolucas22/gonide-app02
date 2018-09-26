const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

// schema = tabela
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    retuired: true,
  },

  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  followers: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  }],

  following: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  }],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hooks
/**
 * pre => antes de salvar com create, save ...
 */
UserSchema.pre('save', async function hashPassword(next) {
  // se não for alterado
  if (!this.isModified('password')) next();

  this.password = await bcrypt.hash(this.password, 8);
});

UserSchema.methods = {
  // Verifica password
  compareHash(password) {
    return bcrypt.compare(password, this.password);
  },

  // gera token
  generateToken() {
    return jwt.sign({ id: this.id }, authConfig.secret, {
      expiresIn: 86400, // 1 dia
    });
  },
};

mongoose.model('User', UserSchema);
