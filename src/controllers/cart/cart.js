import * as Cart from '../../models/cart/cart.js';
import * as Book from '../../models/books/books.js';

export const addBookToCart = async (req, res) => {
    try {
        const { quantity } = req.body;

        const { book_id } = req.params;

        const { user_id } = req.user;

        const cartExists = await Cart.getCartById(user_id);

        if (cartExists == null || cartExists.length == 0 || cartExists == []) {
            const bookDetails = await Book.getBookById(book_id);
            const cost = bookDetails.price * quantity;

            var booksArray = [];
            var quantityArray = [];
            booksArray.push(book_id);
            quantityArray = [quantity];

            const added = await Cart.addToCart({
                user_id: req.user.id,
                book_ids: booksArray,
                quantity_array: quantityArray,
                cost,
                number_of_items: booksArray.length
            });
            res.status(201).json({ 'success': added });
        } else {
            const user_cart = await Cart.getCartById(user_id);
            var countForIfBookAlreadyExists = 0;

            user_cart[0].book_ids.forEach(b_id => {
                if (`${b_id}` == `${book_id}`) {
                    countForIfBookAlreadyExists++;
                }
            })

            if (countForIfBookAlreadyExists > 0) {
                res.status(200).json({ 'message': 'book already exists in cart' })
            } else {
                try {
                    var booksArray = user_cart[0].book_ids;
                    var quantityArray = user_cart[0].quantity_array;

                    booksArray.push(book_id);
                    quantityArray.push(quantity);

                    const bookDetails = await Book.getBookById(book_id);
                    const newCost = bookDetails.price * quantity;

                    user_cart[0].book_ids = booksArray;
                    user_cart[0].quantity_array = quantityArray;
                    user_cart[0].number_of_items = user_cart[0].number_of_items + 1;
                    user_cart[0].cost = user_cart[0].cost + newCost;
                } catch (error) {
                    res.status(500).json({ error: error.message });
                }
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};

export const getCartPage = async (req, res) => {
    try {
        res.render('cart', { title: "Cart" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};