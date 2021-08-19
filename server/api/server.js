require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const methodOverride = require('method-override');
const authRouter = require('../routes/auth');
const bookRouter = require('../routes/books');
const Books = require('../models/books');
const { checkUser } = require('../middleware/validateToken');

const server = express();

server.use(express.static("public"));
server.set('view engine', 'ejs');
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(express.urlencoded({ extended: true }))
server.use(methodOverride('_method', {
    methods: ['POST']
}));

server.get('*', checkUser);
server.get( '/', async (req, res) => {
    const books = await Books.getBooks();
    res.render('index', { title: 'Home', books: books });
});
server.use('/api/auth', authRouter);
server.use('/api/books', bookRouter);

module.exports = server;
