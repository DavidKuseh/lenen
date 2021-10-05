import bcrypt from "bcryptjs";
import { getBy } from '../models/auth/auth.js';

export default async function validateUser(req, res, next) {
    const { email, password } = req.body;
    const user = email !== undefined ? await getBy({ email }) : undefined;

    if (email && password && req.path === "/register") {
        (user === undefined) ? next() : res.status(403).json({ message: "User already exists" });
    } else if (email && password && req.path === "/login") {
        req.user = user;
        (user && bcrypt.compareSync(password, user.password)) ? next() : res.status(401).json({ message: "wrong password" });
    } else {
        res.status(400).json({ message: "missing fields" });
    }
}