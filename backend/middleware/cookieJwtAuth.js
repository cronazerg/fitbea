const jwt = require('jsonwebtoken');

exports.cookieJwtAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    req.user = jwt.verify(token, process.env.SESSION_SECRET);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Unauthorized' });
  }
}