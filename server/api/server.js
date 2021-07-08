require('dotenv').config();

const express = require("express");

const server = express();

const authRouter = require("../routes/users");

server.use(express.json());

server.use("/api/auth", authRouter);

server.get( "/", (req, res, next) => {
    res.send("<p>Landing page</p>")
});

module.exports = server;