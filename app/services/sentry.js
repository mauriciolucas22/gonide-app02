const Sentry = require('@sentry/node');
const sentryConfig = require('../../config/sentry');

module.exports = Sentry.init({ dsn: sentryConfig.dsn });
