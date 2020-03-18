const jwt = require('jsonwebtoken')

module.exports = {
  check (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      return payload;
    } catch (err) {
      return false;
    }
  },

  sign (payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TTL,
    })
  },

}
