require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

server.set('view engine', 'ejs');

server.use(express.static("public"));

server.use(express.urlencoded({ extended: true }))

const authRouter = require('../routes/auth');
const bookRouter = require('../routes/books');

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/books', bookRouter);

server.get( '/', (req, res, next) => {
    res.redirect('/api/books');
});

module.exports = server;