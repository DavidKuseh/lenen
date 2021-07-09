const router = require("express").Router();

const { createUser, findUserById, findUsers } = require("../../controllers/auth");

router.post("/register", createUser);

router.post("/login", findUserById);

router.get("/users", findUsers)

module.exports = router;