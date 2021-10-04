import { Router as expressRouter } from 'express';

const router = expressRouter();

import { register, getRegisterPage, login, logout, findUsers, getLoginPage, getProfile } from "../../controllers/auth/auth.js";

import validateData from '../../middleware/validateData.js';
import validateUser from '../../middleware/validateUser.js';
import { validateToken } from '../../middleware/validateToken.js';

router.post("/register", validateData, validateUser, register);

router.get("/register", getRegisterPage);

router.get("/login", getLoginPage)

router.post("/login", validateData, validateUser, login);

router.get("/logout", logout);

router.get("/profile", validateToken, getProfile);

router.get("/users", findUsers);

export default router; 