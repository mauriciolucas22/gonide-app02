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

/**
 * Users
 */
// já tem o userId na seção então não precisa do /:id
routes.put('/users', controllers.userController.update);
routes.get('/users/me', controllers.userController.me);

/**
 * Likes
 */
routes.post('/like/:id', controllers.likeController.toggle);

/**
 * Follows
 */
routes.post('/follow/:id', controllers.followController.create);
routes.delete('/unfollow/:id', controllers.followController.destroy);

module.exports = routes;
