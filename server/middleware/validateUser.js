const bcrypt = require("bcryptjs");
const Users = require('../models/auth');

module.exports = {
    validateUser: async function (req, res, next) {
        const {  email, password } = req.body;
        const user = email !== undefined ? await Users.getBy({ email }) : undefined;

        if ( email && password && req.path === "/register") {
            (user === undefined) ? next() : res.status(403).json({ message: "User already exists" });
        } else if (email && password && req.path === "/login") {
            req.user = user;
            (user && bcrypt.compareSync(password, user.password)) ? next() : res.status(401).json({ message: "wrong password"});
         } else {
             res.status(400).json({ message: "missing fields" })
         }
    }
}