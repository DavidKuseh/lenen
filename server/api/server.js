require('dotenv').config();

const express = require('express');

const server = express();

const authRouter = require('../routes/auth');
const bookRouter = require('../routes/books');

const {validateData} = require('../middleware/validateData');
const {validateUser} = require('../middleware/validateUser');

server.use(express.json());

server.use('/api/auth', validateData, validateUser, authRouter);
server.use('/api/books', bookRouter);


server.get( '/', (req, res, next) => {
    res.send('<p>Landing page</p>')
});

module.exports = server;