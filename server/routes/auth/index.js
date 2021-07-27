const router = require("express").Router();

const { createUser, getRegisterPage ,findUserById, findUsers, getLoginPage } = require("../../controllers/auth");

const { validateData } = require('../../middleware/validateData');
const { validateUser } = require('../../middleware/validateUser');

router.post("/register", validateData, validateUser, createUser);

router.get("/register", getRegisterPage);

router.get("/login", getLoginPage)

router.post("/login", validateData, validateUser, findUserById);

router.get("/users", findUsers);

module.exports = router;