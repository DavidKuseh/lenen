import { Router as expressRouter } from 'express';

const router = expressRouter();

import { addBooksToCart, getCartPage } from '../../controllers/cart/cart.js';

router.post('/', addBooksToCart);

router.get('/', getCartPage);

export default router;
