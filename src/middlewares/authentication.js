const jwt = require('jsonwebtoken');
module.exports = authentication = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ message: 'No Token Found' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized Action.' });
    req.userId = decoded.id;

    next && next();
  });
};
