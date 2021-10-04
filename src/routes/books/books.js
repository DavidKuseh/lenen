import { Router as expressRouter } from 'express';
import multer, { diskStorage } from 'multer';

const router = expressRouter();

import { addBookListing, getAdminPage, getBookListing, getAllBooks, getEditBookPage, editBookListing, deleteBookListing, getSearchPage } from '../../controllers/books/books.js';

import { validateToken } from '../../middleware/validateToken.js';

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/data/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname)
  }
});

const upload = multer({ storage: storage })

router.post('/admin', validateToken, upload.single('book_cover_path'), addBookListing);

router.get('/admin', validateToken, getAdminPage);

router.get('/search', getSearchPage);

router.get('/:id', getBookListing);

router.get('/', getAllBooks);

router.put('/:id/edit', upload.single('book_cover_path'), editBookListing);

router.get('/:id/edit', getEditBookPage);

router.delete('/:id/delete', deleteBookListing);

export default router;
