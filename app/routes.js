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

/**
 * Tweets
 */
routes.post('/tweets', controllers.tweetController.create);
routes.delete('/tweets/:id', controllers.tweetController.destroy);

module.exports = routes;
