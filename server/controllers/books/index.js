const Books = require('../../models/books');

const addBookListing = async (req, res) => {
    try {
        await Books.addNewBook(req.body);
        res.redirect('/api/books/create');
    } catch (error) {
        res.status(500).json({error: error.message});
    };
};

const getAdminPage = async (req, res) => {
    try {
        const books = await Books.getBooks();
        res.render('create',  { title: 'Admin Page', books: books });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getBookListing = async (req, res) => {
    const id = req.params.id;
    try {
        const book = await Books.getBookById(id);
        if(book) {
            res.render('book-detail', { book: book, title: book.title })
        };
    } catch (error) {
        res.status(500).json({error: error.message});
    };
};

const getAllBooks = async (req, res) => {
    try {
        const books = await Books.getBooks();
        if(books) {
        res.render('books', { books : books , title: 'Home'})
        };
    } catch (error) {
        res.status(500).json({error: error.message});
    };
};

const getEditBookPage = async (req, res) => {
    const id = req.params.id;
    try {
        const book = await Books.getBookById(id)
        res.render('book-edit', { title: 'Update book', book: book});
    } catch (error) {
        res.status(500).json({error: error.message});
    };
};

const editBookListing = async (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    try {
        await Books.editBook(id, changes);
        await Books.getBookById(id)
            res.redirect('/api/books/create')
    } catch (error) {
        res.status(500).json({error: error.message});
    };
};

const deleteBookListing = async (req, res) => {
    const id = req.params.id;
    try {
        const book = await Books.deleteBook(id);
        if(book) {
            res.redirect('/api/books/create');
        };
    } catch (error) {
        res.status(500).json({error: error.message});
    };
};

module.exports = {
    addBookListing,
    getAdminPage,
    getBookListing,
    getAllBooks,
    getEditBookPage,
    editBookListing,
    deleteBookListing
};