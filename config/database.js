const path = require('path');

module.exports = {
  url: process.env.DATABASE_URL,

  // path: de onde o index.js é executado
  modelsPath: path.resolve('app', 'models'),
};
