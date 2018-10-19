const mongoose = require('mongoose');

const User = mongoose.model('User');
const Post = mongoose.model('Post');

module.exports = {
  async me(req, res, next) {
    try {
      const user = await User.findById(req.userId);
      const postCount = await Post.find({ user: user.id }).count();

      return res.json({
        user,
        postCount,
        followersCount: user.followers.length,
        followingCount: user.following.length,
      });
    } catch (err) {
      return next(err);
    }
  },

  async feed(req, res, next) {
    try {
      const user = await User.findById(req.userId);
      const { following } = user;

      const posts = await Post
        .find({
          user: { $in: [user.id, ...following] },
        })
        .limit(50)
        .sort('-createdAt'); // ordena ao contrario

      return res.json(posts);
    } catch (err) {
      return next(err);
    }
  },

  async update(req, res, next) {
    try {
      const id = req.userId;

      const {
        name,
        username,
        password,
        confirmPassword,
      } = req.body;

      if (password && password !== confirmPassword) {
        return res.status(400).json({ error: 'Password doesn\'t math' });
      }

      // atualiza name and username
      const user = await User.findByIdAndUpdate(id, {
        name, username,
      }, {
        new: true, // retorna registro atualizado
      });

      // atualiza password passando pelo hook com bcrypt
      if (password) {
        user.password = password;
        await user.save();
      }

      return res.json(user);
    } catch (err) {
      return next(err);
    }
  },
};
