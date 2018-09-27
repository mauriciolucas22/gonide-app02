const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
  async create(req, res, next) {
    try {
      // user que quer seguir
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(400).send({ error: 'User does not exist' });
      }

      // está seguindo
      if (user.followers.indexOf(req.userId) !== -1) {
        return res.status(400).json({ error: `You're already followring ${user.username}` });
      }

      // add follow
      user.followers.push(req.userId);
      await user.save();

      const me = await User.findById(req.userId);
      me.following.push(user.id);
      await me.save();

      return res.json(me);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {} catch (err) {
      return next(err);
    }
  },
};
