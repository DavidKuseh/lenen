const jwt = require("jsonwebtoken");
const secret = require("../config/secrets");

function generateToken(user){
    const payload = {
        subject: user.user_id,
        role: user.user_role
    };
    const options = {
        expiresIn: "30d"
    };
    return jwt.sign(payload, secret.jwtSecret, options)
}

module.exports = {generateToken};