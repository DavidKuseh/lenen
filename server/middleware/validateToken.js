const jwt = require("jsonwebtoken");
const secret = require("../config/secrets");

module.exports = {
  validateToken: async function (req, res, next, err) {
    const token = req.headers.authorization
    if (!token) {
      return next({ status: 401, message: err.message })
    }
    jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
      if (err) {
        return next({ status: 401, message: err.message})
      }
      req.decodedJwt = decodedToken
      next()
    })
  }
};



