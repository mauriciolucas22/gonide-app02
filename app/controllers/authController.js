const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
  async signup(req, res, next) {
    try {
      const { email, username } = req.body;

      // se existe username
      if (await User.findOne({ $or: [{ email }, { username }] })) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // cria user
      const user = await User.create(req.body);


      return res.json(user);
    } catch (err) {
      return next(err);
    }
  },
};
