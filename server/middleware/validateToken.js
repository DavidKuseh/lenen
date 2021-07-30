const jwt = require("jsonwebtoken");
const secret = require("../config/secrets");

module.exports = (req, res, next) => {

    const token = req.headers.authorization
    if (!token) {
      return next({ status: 401, message: error.message })
    }
    jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
      if (err) {
        return next({ status: 401, message: err.message})
      }
      req.decodedJwt = decodedToken
      next()
    })
  };