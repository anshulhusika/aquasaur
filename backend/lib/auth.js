const jwt = require('jsonwebtoken');

function getUserFromToken(req) {
  try {
    const token = req.cookies.token;
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    return decoded;
  } catch (error) {
    return null;
  }
}

module.exports = { getUserFromToken };