const app = require('express')();

app.get('/', (req, res) => {
  res.send('Jesus loves you!');
  res.end();
});

app.listen(3000);
