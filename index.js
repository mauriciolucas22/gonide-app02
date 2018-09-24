const app = require('express')();
const mongoose = require('mongoose');
const requireDir = require('require-dir');

const dbConfig = require('./config/database');

// mongoose.connect('mongodb://user:password@localhost/twitter');
mongoose.connect(dbConfig.url);

requireDir(dbConfig.modelsPath);

const User = mongoose.model('User');
User.create({
  name: 'Jesus',
  username: 'Cristo',
  email: 'jesus@jesus.com',
  password: '132',
});

// console.log(User);

app.listen(3000);
