const path = require('path');

module.exports = {
  url: 'mongodb://localhost/twitter',

  // path: de onde o index.js é executado
  modelsPath: path.resolve('app', 'models'),
};
