const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

// Verifica password
UserSchema.methods = {
  compareHash(password) {
    return bcrypt.compare(password, this.password);
  },
};

mongoose.model('User', UserSchema);
