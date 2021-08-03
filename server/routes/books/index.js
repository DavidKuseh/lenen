const router = require('express').Router();

const { addBookListing, getAdminPage, getBookListing, getAllBooks, getEditBookPage, editBookListing, deleteBookListing } = require('../../controllers/books');

router.post('/create', addBookListing);

router.get('/create', getAdminPage);

router.get('/:id', getBookListing);

router.get('/', getAllBooks);

router.put('/:id/edit', editBookListing);

router.get('/:id/edit', getEditBookPage);

router.delete('/:id/delete', deleteBookListing);

module.exports = router;
