require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const methodOverride = require('method-override');

const Books = require('../models/books');

const server = express();

server.set('view engine', 'ejs');

server.use(express.static("public"));

server.use(express.urlencoded({ extended: true }))

const authRouter = require('../routes/auth');
const bookRouter = require('../routes/books');

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use(methodOverride('_method', {
    methods: ['POST']
}));

server.use('/api/auth', authRouter);
server.use('/api/books', bookRouter);

server.get( '/', async (req, res) => {
    const books = await Books.getBooks();
    res.render('index', { title: 'Home', books: books });
});

module.exports = server;