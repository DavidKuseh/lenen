import { Router as expressRouter } from 'express';

const router = expressRouter();

import { addBookToCart } from '../../controllers/cart/cart.js';

import { validateToken } from '../../middleware/validateToken.js';

router.post('/', validateToken, addBookToCart);

export default router;
