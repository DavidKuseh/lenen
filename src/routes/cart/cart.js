import { Router as expressRouter } from 'express';

const router = expressRouter();

import { addBookToCart, getCartPage } from '../../controllers/cart/cart.js';

router.post('/', addBookToCart);

router.get('/', getCartPage);

export default router;
