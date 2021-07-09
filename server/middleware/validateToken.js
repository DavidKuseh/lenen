const jwt = require("jsonwebtoken");
const secret = require("../config/secrets");

module.exports = function(req, res, error, next) {
    const token = req.header("jwt_token");

    if(!token){
        return res.status(403).json({error: error.message});
    };

    try {
        const verify = jwt.verify(token, secret.jwtSecret);

        req.user = verify.user;
        next();
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}