const bcrypt = require("bcryptjs");
const { generateToken } = require("../../helpers/token");
const Users = require('../../models/auth');

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const register = async (req, res) => {
    const {password} = req.body;
    const hash = await bcrypt.hashSync(password, 10);
    req.body.password = hash;

    try {
        const user = await Users.addNewUser(req.body);
        delete user.password; 
        res.status(201).json({ user })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getRegisterPage = async (req, res) => {
    res.render('register', {title: 'Register'})
};

const getLoginPage = async (req, res) => {
    res.render('login', {title: 'Login'})
};

const login = async (req, res) => {
    try {
        const token = generateToken(req.user);
        const user = req.user;
        delete user.password;
        localStorage.setItem('token', token);
        localStorage.setItem('userEmail', user.email);
        res.redirect('/')
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const logout = async (req, res) => {
    try {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
        res.redirect('/')
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const findUsers = async (req, res) => {
    try {
        const users = await Users.getUsers()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error: error.message});
    };
};

module.exports = {
    register,
    getRegisterPage,
    getLoginPage,
    login,
    logout,
    findUsers
};