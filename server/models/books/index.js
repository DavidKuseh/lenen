const db = require('../../db/connection');

async function addNewBook(title, author, description, year_published, category, ISBN, book_cover_path) {
    try {
        const data = {
            title,
            author,
            description,
            year_published,
            category,
            ISBN,
            book_cover_path
        };
        const ids = await db('books').insert(data, 'id');
        const id = ids[0];
        const response = await getBookById(id);
        return response;
    } catch (error) {
        console.log(error);
    };
};

async function getBookById(id) {
    try {
        const book = await db('books')
            .select('id', 'title', 'author', 'description', 'year_published', 'category', 'ISBN', 'book_cover_path')
            .where({ id })
            .first()
        return book;
    } catch (error) {
        console.log(error);
    };
};

async function getBy(filter) {
    try {
        const books = await db('books')
            .select('id', 'title', 'author', 'description', 'year_published', 'category', 'ISBN', 'book_cover_path')
            .where(filter)
            .first()
        return books;
    } catch (error) {
        console.log(error);
    };
};

async function getBooks() {
    const books = await db('books');
    try {
        return books;
    } catch (error) {
        console.log(error);
    };
};

async function searchBooks(query) {
    const books = db('books');
    try {
        if (query.q) {
            return books.whereRaw("CONCAT(title, author, description) ILIKE '%' || LOWER(?) || '%'", query.q)
        }
    } catch (error) {
        console.log(error);
    };
};

async function editBook(id, title, author, description, year_published, category, ISBN, book_cover_path) {
    try {
        const changes = {
            title, author, description, year_published, category, ISBN, book_cover_path
        };
        await db('books')
            .where({ id })
            .update(changes)
        return getBookById(id);
    } catch (error) {
        console.log(error);
    };
};

async function deleteBook(id) {
    try {
        const deleted = await db('books')
            .where({ id: id })
            .delete()
        return deleted;
    } catch (error) {
        console.log(error);
    };
};

module.exports = {
    addNewBook,
    getBookById,
    getBy,
    searchBooks,
    getBooks,
    editBook,
    deleteBook
};