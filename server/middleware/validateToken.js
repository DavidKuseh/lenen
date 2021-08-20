const jwt = require("jsonwebtoken");
const secret = require("../config/secrets");
const User = require('../models/auth');

function validateToken(req, res, next) {
  const token = localStorage.getItem('token');

  if (token) {
    jwt.verify(token, secret.jwtSecret, (err, decoded) => {
      if (err) {
        res
          .status(401)
          .json({
            error: err,
            message: 'The token provided is not valid or has expired'
          });
      } else {
        req.decoded = decoded;
        next();
      };
    });
  } else {
    res
      .status(401)
      .json({ message: 'The token provided is not valid or has expired' });
  };
};

async function checkUser(req, res, next) {
  const token = localStorage.getItem('token');

  if (token) {
    jwt.verify(token, secret.jwtSecret, async (err, decoded) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.getUserById(decoded.subject);
        res.locals.user = user;
        next();
      }
    })
  } else {
    res.locals.user = null;
    next();
  };
};

module.exports = { validateToken, checkUser };



