const app = require('express')();
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const bodyParser = require('body-parser');

const dbConfig = require('./config/database');

// Connection
// mongoose.connect('mongodb://user:password@localhost/twitter');
mongoose.connect(dbConfig.url);

// autoLoad
requireDir(dbConfig.modelsPath);

// Config app
app.use(bodyParser.json());

app.post('/create', async (req, res) => {
  const User = mongoose.model('User');

  await User.create(req.body);

  return res.send('OK');
});

// console.log(User);

app.listen(3000);
