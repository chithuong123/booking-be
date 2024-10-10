const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';

const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ message: 'No token provided.' });
  }

  // Cắt bỏ phần "Bearer " từ token
  console.log(token);

  token = token.replace('Bearer ', '');

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(500).send({ message: 'Failed to authenticate token.' });
    }
    // Lấy user ID từ payload của token
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;