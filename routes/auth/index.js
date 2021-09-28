const router = require("express").Router();

const { register, getRegisterPage ,login, logout, findUsers, getLoginPage, getProfile } = require("../../controllers/auth");

const { validateData } = require('../../middleware/validateData');
const { validateUser } = require('../../middleware/validateUser');
const { validateToken } = require('../../middleware/validateToken');

router.post("/register", validateData, validateUser, register);

router.get("/register", getRegisterPage);

router.get("/login", getLoginPage)

router.post("/login", validateData, validateUser, login);

router.get("/logout", logout);

router.get("/profile", validateToken, getProfile);

router.get("/users", findUsers);

module.exports = router; 