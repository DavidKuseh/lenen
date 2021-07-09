require('dotenv').config();

const express = require("express");

const server = express();

const authRouter = require("../routes/auth");
const {validateData} = require("../middleware/validateData");

server.use(express.json());

server.use("/api/auth", validateData, authRouter);

server.get( "/", (req, res, next) => {
    res.send("<p>Landing page</p>")
});

module.exports = server;