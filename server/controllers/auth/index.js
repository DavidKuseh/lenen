const bcrypt = require("bcryptjs");
const { generateToken } = require("../../helpers/token");
const Users = require('../../models/auth');

const createUser = async (req, res) => {
    const {password} = req.body;
    const hash = await bcrypt.hashSync(password, 10);
    req.body.password = hash;

    try {
        const user = await Users.addNewUser(req.body);
        delete user.password; 
        res.status(201).json({user})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const findUserById = async (req, res) => {
    try {
        const token = generateToken(req.user);
        const user = req.user;
        delete user.password;
        res.status(200).json({ user, token})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    createUser,
    findUserById
};