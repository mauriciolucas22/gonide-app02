module.exports = {
  async signup(req, res, next) {
    try {
      const { email, username } = req.body;

      console.log(email, username);

      return res.send();
    } catch (err) {
      return next(err);
    }
  },
};
