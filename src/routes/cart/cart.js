import { Router as expressRouter } from 'express';

const router = expressRouter();

import { addBookToCart, getCartPage } from '../../controllers/cart/cart.js';

import { validateToken } from '../../middleware/validateToken.js';

router.post('/', validateToken, addBookToCart);

router.get('/', getCartPage);

export default router;
