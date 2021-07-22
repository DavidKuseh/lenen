const router = require("express").Router();

const { createUser, findUserById } = require("../../controllers/auth");

const { validateData } = require('../../middleware/validateData');
const { validateUser } = require('../../middleware/validateUser');

router.post("/register", validateData, validateUser, createUser);

router.post("/login", validateData, validateUser, findUserById);

module.exports = router;