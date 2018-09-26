const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const authConfig = require('../../config/auth');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // não existe token
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // divide
  const parts = authHeader.split(' ');

  // não tem duas partes
  if (!parts.length === 2) {
    return res.status(401).json({ error: 'Token error' });
  }

  const [scheme, token] = parts;

  if (scheme !== 'Bearer') {
    return res.status(401).json({ error: 'Token malformatted' });
  }

  try {
    // jwt.verify(token, authConfig.secret, (err, decoded) => {});
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
