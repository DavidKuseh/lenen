const db = require("../../config");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../helpers/token");

async function createUser(req, res){
    const { email, password, role } = req.body;

    try {
        const user = await db.query("SELECT * FROM user_account WHERE email = $1", [email]);

        if(user.rows.length){
            return res.status(401).json("User already exists");
        };

        const hash = await bcrypt.hashSync(password, 10);

        const newUser = await db.query("INSERT INTO user_account (email, password, role) VALUES ($1, $2, $3) RETURNING *", [email, hash, role]);
        res.status(201).json({newUser})
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
    let { email, password } = req.body;
    
    try {
        const user = await db.query("SELECT * FROM user_account WHERE email = $1", [email]);

        if(!user.rows.length){
            return res.status(401).json("Invalid crendential")
        }
        
        const validPassword = await bcrypt.compareSync(password, user.rows[0].password)
        
        if(!validPassword){
            return res.status(401).json("Invalid credential");
        }
        const token = await generateToken(user);
        res.status(200).json({ user, email: user.email, token})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    createUser,
    findUserById,
    findUsers
};