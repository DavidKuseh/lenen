const router = require('express').Router();
const multer = require('multer');

const { addBookListing, getAdminPage, getBookListing, getAllBooks, getEditBookPage, editBookListing, deleteBookListing, getSearchPage } = require('../../controllers/books');

const { validateToken } = require('../../middleware/validateToken');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../server/public/data/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() +  "_" + file.originalname)
    }
});

const upload = multer({ storage: storage })

router.post('/admin', validateToken, upload.single('book_cover_path'), addBookListing);

router.get('/admin', validateToken, getAdminPage);

router.get('/search', getSearchPage);

router.get('/:id', getBookListing);

router.get('/', getAllBooks);

router.put('/:id/edit', editBookListing);

router.get('/:id/edit', getEditBookPage);

router.delete('/:id/delete', deleteBookListing);

module.exports = router;
