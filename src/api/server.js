import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import methodOverride from 'method-override';
import authRouter from '../routes/auth/auth.js';
import bookRouter from '../routes/books/books.js';
import { getBooks } from '../models/books/books.js';
import { checkUser } from '../middleware/validateToken.js';

const server = express();

server.use(express.static('./src/public'));
server.set('view engine', 'ejs');
server.set('views', './src/views');
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(express.urlencoded({ extended: true }))
server.use(methodOverride('_method', {
    methods: ['POST']
}));

server.get('*', checkUser);
server.get('/', async (req, res) => {
    const books = await getBooks();
    res.render('index', { title: 'Home', books: books });
});
server.use('/api/auth', authRouter);
server.use('/api/books', bookRouter);

export default server;
