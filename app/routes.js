const express = require('express');
const requireDir = require('require-dir');

const routes = express.Router();

// Middlewares
const authMiddleware = require('./middlewares/auth');

const controllers = requireDir('./controllers');

/**
 * Auth
 */
routes.post('/signup', controllers.authController.signup);
routes.post('/signin', controllers.authController.signin);

/**
 * Auth routes
 */
routes.use(authMiddleware);

routes.get('/test', (req, res) => res.send('OK'));

module.exports = routes;
