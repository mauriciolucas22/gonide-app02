const mongoose = require('mongoose');

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

mongoose.model('User', UserSchema);
