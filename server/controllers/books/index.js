const Books = require('../../models/books');

const addBookListing = async (req, res) => {
    try {
        const book_cover_path = req.file.path;
        const { title, 
            author, 
            description, 
            year_published, 
            category, 
            ISBN
        } = req.body;
        await Books.addNewBook(title, 
            author, 
            description, 
            year_published, 
            category, 
            ISBN,
            book_cover_path )
        res.redirect('/api/books/admin')
    }
    catch (error) {
        res.status(500).json({error: error.message});
    };
};

const getAdminPage = async (req, res) => {
    try {
        const { role } = req.decoded;
        if(role !== 'admin'){
            return res.send('not authorized')
        }
        const books = await Books.getBooks();
        res.render('admin',  { title: 'Admin Page', books: books });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getSearchPage = async (req, res) => {
    try {
        const { q } = req.query;
        const filteredBooks = await Books.searchBooks({ q });
        res.render('search-results', { title: 'Search Page', filteredBooks: filteredBooks, query: req.query});
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
            res.redirect('/api/books/admin')
    } catch (error) {
        res.status(500).json({error: error.message});
    };
};

const deleteBookListing = async (req, res) => {
    const id = req.params.id;
    try {
        const book = await Books.deleteBook(id);
        if(book) {
            res.redirect('/api/books/admin');
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
    deleteBookListing,
    getSearchPage
};