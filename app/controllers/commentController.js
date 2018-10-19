const mongoose = require('mongoose');

const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');
const User = mongoose.model('User');

module.exports = {
  async show(req, res, next) {
    try {
      const comment = await Comment.findById(req.params.id);

      if (!comment) {
        return res.status(400).json({ error: 'Comment not found!' });
      }

      return res.json({ comment });
    } catch (err) {
      return next(err);
    }
  },

  async create(req, res, next) {
    try {
      const post = await Post.findById(req.body.postId);

      if (!post) {
        return res.status(400).json({ error: 'post doesn\'t exists ' });
      }

      // procura usuario do post
      // const { followers } = await User.findById(post.user);

      // verifica se eu sigo
      // const check = followers.find(item => item === req.userId);

      const comment = await Comment.create({
        content: req.body.content,
      });

      post.comments.push(comment.id);

      await post.save();

      return res.json(comment);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      await Comment.findByIdAndRemove(req.params.id);

      return res.send();
    } catch (err) {
      return next(err);
    }
  },
};
