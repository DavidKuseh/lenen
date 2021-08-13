const router = require('express').Router();

const { addBookListing, getAdminPage, getBookListing, getAllBooks, getEditBookPage, editBookListing, deleteBookListing, getSearchPage } = require('../../controllers/books');

const { validateToken } = require('../../middleware/validateToken');

router.post('/admin', validateToken, addBookListing);

router.get('/admin', validateToken, getAdminPage);

router.get('/search', getSearchPage);

router.get('/:id', getBookListing);

router.get('/', getAllBooks);

router.put('/:id/edit', editBookListing);

router.get('/:id/edit', getEditBookPage);

router.delete('/:id/delete', deleteBookListing);

module.exports = router;
