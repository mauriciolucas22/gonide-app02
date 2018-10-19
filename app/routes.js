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
 * Posts
 */
routes.get('/posts', controllers.postController.index);
routes.get('/post/:id', controllers.postController.show);
routes.post('/post', controllers.postController.create);
routes.delete('/post/:id', controllers.postController.destroy);

/**
 * Comments
 */
routes.get('/comment/:id', controllers.commentController.show);
routes.post('/comment', controllers.commentController.create);

/**
 * Users
 */
// já tem o userId na seção então não precisa do /:id
routes.put('/users', controllers.userController.update);
routes.get('/users/me', controllers.userController.me);
routes.get('/feed', controllers.userController.feed);

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
