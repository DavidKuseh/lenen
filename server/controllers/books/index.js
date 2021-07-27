const Books = require('../../models/books');

const addBookListing = async (req, res) => {
    try {
        const book = await Books.addNewBook(req.body);
        res.status(201).json({ book })
    } catch (error) {
        res.status(500).json({error: error.message});
    };
};

const getAdminPage = async (req, res) => {
    res.render('create',  { title: 'Admin Page' });
};

const getBookListing = async (req, res) => {
    const id = req.params.id;
    try {
        const book = await Books.getBookById(id);
        if(book) {
            res.status(200).json({ book });
        };
    } catch (error) {
        res.status(500).json({error: error.message});
    };
};

const getAllBooks = async (req, res) => {
    try {
        const books = await Books.getBooks();
        if(books) {
            res.status(200).json({ books });
        };
    } catch (error) {
        res.status(500).json({error: error.message});
    };
};

const editBookListing = async (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    try {
        await Books.editBook(id, changes);
        const updated = await Books.getBookById(id);
        return res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({error: error.message});
    };
};

const deleteBookListing = async (req, res) => {
    const id = req.params.id;
    try {
        const book = await Books.deleteBook(id);
        if(book) {
            res.status(200).json(`Book with id:${id} deleted`);
        };
    } catch (error) {
        res.status(500).json({error: error.message});
    };
}

module.exports = {
    addBookListing,
    getAdminPage,
    getBookListing,
    getAllBooks,
    editBookListing,
    deleteBookListing
}