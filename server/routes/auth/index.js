const router = require("express").Router();

const { createUser, findUserById } = require("../../controllers/auth");

router.post("/register", createUser);

router.post("/login", findUserById);

module.exports = router;