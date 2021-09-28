require('dotenv').config();

import express, { static, json, urlencoded } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import methodOverride from 'method-override';
import authRouter from '../routes/auth';
import bookRouter from '../routes/books';
import { getBooks } from '../models/books';
import { checkUser } from '../middleware/validateToken';

const server = express();

server.use(static("public"));
server.set('view engine', 'ejs');
server.use(json());
server.use(helmet());
server.use(cors());
server.use(urlencoded({ extended: true }))
server.use(methodOverride('_method', {
    methods: ['POST']
}));

server.get('*', checkUser);
server.get( '/', async (req, res) => {
    const books = await getBooks();
    res.render('index', { title: 'Home', books: books });
});
server.use('/api/auth', authRouter);
server.use('/api/books', bookRouter);
export default server;
