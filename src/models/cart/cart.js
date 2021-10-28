import db from '../../db/connection.js';

async function addToCart({user_id, book_ids, quantity_array, cost, number_of_items}) {
    try {
        const cartInfo = {
            user_id,
            cost,
            book_ids,
            quantity_array,
            number_of_items
        }
        const ids = await db('cart').insert(cartInfo, 'id')
        const id = ids[0];
        const response = await getCartById(id);
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