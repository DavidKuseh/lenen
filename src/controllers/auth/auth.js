import bcrypt from 'bcryptjs';
import { LocalStorage } from 'node-localstorage';
import generateToken from '../../helpers/token.js';
import * as Users from '../../models/auth/auth.js';

global.localStorage = new LocalStorage('./src/scratch');

export const getRegisterPage = async (req, res) => {
    res.render('register', {title: 'Register'});
};

export const getLoginPage = async (req, res) => {
    res.render('login', {title: 'Login'});
};

export const register = async (req, res) => {
    const {password} = req.body;
    const hash = bcrypt.hashSync(password, 10);
    req.body.password = hash;

    try {
        const user = await Users.addNewUser(req.body);
        delete user.password; 
        res.redirect('/api/auth/login');
    } catch (error) {
        res.status(500).json({error: error.message});
    };
};

export const login = async (req, res) => {
    try {
        const token = generateToken(req.user);
        const user = req.user;
        delete user.password;
        localStorage.setItem('token', token);
        localStorage.setItem('userEmail', user.email);
        res.redirect('/');
    } catch (error) {
        res.status(500).json({error: error.message});
    };
};

export const logout = async (req, res) => {
    try {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        res.redirect('/');
    } catch (error) {
        res.status(500).json({error: error.message});
    };
};

export const getProfile = async (req, res) => {
    const { subject } = req.decoded;
    try {
        const profile = await Users.getUserById(subject);
        res.render('user-profile', { title: 'My Profile', profile: profile });
    } catch (error) {
        res.status(500).json({error: error.message});
    };
};

export const findUsers = async (req, res) => {
    try {
        const users = await Users.getUsers()
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error: error.message});
    };
};
