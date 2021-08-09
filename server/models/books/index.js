const db = require('../../db/connection');

async function addNewBook(book) {
    try {
        const ids = await db('books').insert(book, 'id');
        const id = ids[0];
        const response = await getBookById(id);
        return response;
    } catch (error){
        console.log(error);
    };
};

async function getBookById(id) {
    try {
        const book = await db('books')
            .select('id', 'title' , 'author' ,'description', 'year_published', 'category', 'ISBN')
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
            .select('id', 'title' , 'author' ,'description', 'year_published', 'category', 'ISBN')
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

        if(query.title) {
            return books.whereRaw("LOWER(title) LIKE '%' || LOWER(?) || '%' ", query.title) 
        }

        if(query.author) {
            return books.whereRaw("LOWER(author) LIKE '%' || LOWER(?) || '%' ", query.author);
        }
        return books;
    } catch (error) {
        console.log(error);
    };
};

async function editBook(id, changes) {
    try {
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
            .where({ id: id})
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