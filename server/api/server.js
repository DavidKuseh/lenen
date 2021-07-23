require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

server.set('view engine', 'ejs');

const authRouter = require('../routes/auth');
const bookRouter = require('../routes/books');

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/books', bookRouter);


server.get( '/', (req, res, next) => {
    res.render('index');
});

module.exports = server;