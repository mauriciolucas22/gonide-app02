const app = require('express')();
const mongoose = require('mongoose');

const dbConfig = require('../config/database');

// mongoose.connect('mongodb://user:password@localhost/twitter');
mongoose.connect(dbConfig.url);

app.get('/', (req, res) => {
  res.send('Jesus loves you!');
  res.end();
});

app.listen(3000);
