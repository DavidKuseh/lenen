const router = require('express').Router();

const { addBookListing, getAdminPage, getBookListing, getAllBooks, editBookListing, deleteBookListing } = require('../../controllers/books');

router.post('/create', addBookListing);

router.get('/create', getAdminPage);

router.get('/:id', getBookListing);

router.get('/', getAllBooks);

router.put('/:id', editBookListing);

router.delete('/:id', deleteBookListing);

module.exports = router;
