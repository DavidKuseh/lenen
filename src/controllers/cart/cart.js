import * as Cart from '../../models/cart/cart.js';
import * as Book from '../../models/books/books.js';

export const addBookToCart = async (req, res) => {
    try {
        const _book_id = req.params.book_id;

        const { subject } = req.decoded;

        const cartExists = await Cart.getCartById(subject);

        if(cartExists == null || cartExists.length == 0 || cartExists == []) {
            const bookDetails = await Book.getBookById(_book_id);
            const cost = bookDetails.price;

            var booksArray = [];
            booksArray.push(_book_id);

            await Cart.addToCart({
                user_id: req.decoded.subject, 
                book_ids: booksArray,
                cost,
                number_of_items: booksArray.length
            });
            res.redirect('/api/cart');
        } else {
            res.redirect('/')
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};

export const getCartPage = async (req, res) => {
    try {
        res.render('cart', { title: "Cart"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};