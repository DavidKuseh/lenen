import jsonwebtoken from "jsonwebtoken";
import { jwtSecret } from "../config/secrets.js";
import { getUserById } from '../models/auth/auth.js';

export function validateToken(req, res, next) {
  const token = localStorage.getItem('token');

  if (token) {
    jsonwebtoken.verify(token, jwtSecret, (err, decoded) => {
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

export async function checkUser(req, res, next) {
  const token = localStorage.getItem('token');

  if (token) {
    jsonwebtoken.verify(token, jwtSecret, async (err, decoded) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await getUserById(decoded.subject);
        res.locals.user = user;
        next();
      }
    })
  } else {
    res.locals.user = null;
    next();
  };
};

export async function checkUserCart(req, res, next) {
  const cartItems = localStorage.getItem('cart');

  if (cartItems) {
      if (console.error()) {
        res.locals.cartInfo = null;
        next();
      } else {
        res.locals.cartInfo = JSON.parse(cartItems) ;
        next();
      }
  } else {
    res.locals.cartInfo = null;
    next();
  };
};

export default { validateToken, checkUser, checkUserCart };



