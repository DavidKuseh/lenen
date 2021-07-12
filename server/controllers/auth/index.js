const db = require("../../config");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../helpers/token");

async function createUser(req, res){
    const { user_email, user_password} = req.body;

    try {
        const user = await db.query("SELECT * FROM user_account WHERE user_email = $1", [user_email]);

        if(user.rows.length){
            return res.status(401).json("User already exists");
        };

        const hash = await bcrypt.hashSync(user_password, 10);

        const newUser = await db.query("INSERT INTO user_account (user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [user_email, hash]);
        const token = await generateToken(newUser);
        res.status(201).json({user, token})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

async function findUsers(req, res){
    try {
        const users = await db.query("SELECT * FROM user_account")
        res.status(200).json({users})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

async function findUserById(req, res){
    const { user_email, user_password } = req.body;

    try {
        const user = await db.query("SELECT * FROM user_account WHERE user_email = $1", [user_email]);

        if(!user.rows.length){
            return res.status(401).json("Invalid crendential")
        }

        const validPassword = await bcrypt.compareSync(user_password, user.rows[0].user_password)

        if(!validPassword){
            return res.status(401).json("Invalid credential");
        }
        const token = await generateToken(user);
        res.status(200).json({ user, email: user.user_email, token })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    createUser,
    findUserById,
    findUsers
};