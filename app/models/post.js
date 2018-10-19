const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    maxLength: 280,
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },

  likes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],

  comments: [{ type: mongoose.Schema.ObjectId, ref: 'Comment' }],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model('Post', PostSchema);
