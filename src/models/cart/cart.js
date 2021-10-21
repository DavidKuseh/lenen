import db from '../../db/connection.js';

async function addToCart(user_id, book_id, quantity, cost, number_of_items) {
    try {
        const cartInfo = {
            user_id,
            book_id,
            quantity,
            cost,
            number_of_items
        }
        const ids = await db('cart').insert(cartInfo, 'id')
        const id = ids[0];
        const response = await getCartById(id);
        console.log(response)
        return response;
    } catch (error) {
        console.log(error);
    };
};

async function getCartById(id) {
    try {
        const cart = await db('cart')
            .select('*')
            .where({ id })
            .first()
        return cart;
    } catch (error) {
        console.log(error);
    };

};

export {
    addToCart,
    getCartById
};