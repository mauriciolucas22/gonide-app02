const app = require('express')();
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const bodyParser = require('body-parser');

const Sentry = require('@sentry/node');

Sentry.init({ dsn: 'https://10f9d93276e94d4cb04d2e973254471a@sentry.io/1289296' });

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

const dbConfig = require('./config/database');

// Connection
// mongoose.connect('mongodb://user:password@localhost/twitter');
mongoose.connect(dbConfig.url);

// autoLoad
requireDir(dbConfig.modelsPath);

// Config app
app.use(bodyParser.json());

app.use('/api', require('./app/routes'));

// The error handler must be before any other error middleware
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use((err, req, res, next) => {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(`${res.sentry}\n`);
});

app.listen(3000);
