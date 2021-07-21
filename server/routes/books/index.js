const router = require('express').Router();

const { addBookListing, getBookListing, getAllBooks, editBookListing, deleteBookListing } = require('../../controllers/books');

router.post('/create', addBookListing);

router.get('/:id', getBookListing);

router.get('/', getAllBooks);

router.put('/:id', editBookListing);

router.delete('/:id', deleteBookListing);

module.exports = router;
