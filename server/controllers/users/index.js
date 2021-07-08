const db = require("../../config");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../helpers/token");

async function createUser(req, res){
    const { user_email, user_password, user_role } = req.body;
    const hash = bcrypt.hashSync(user_password, 14);
    req.body.user_password = hash;

    try {
        const user = await db.query("INSERT INTO user_account (user_email, user_password, user_role) VALUES ($1, $2, $3) RETURNING *", [user_email, hash, user_role]);
        const token = await generateToken(user);
        res.status(201).json({user, token})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {createUser};