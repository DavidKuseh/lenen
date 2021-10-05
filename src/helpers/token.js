import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/secrets.js";

export default function generateToken(user){
    const payload = {
        subject: user.id,
        role: user.role
    };
    const options = {
        expiresIn: "30d"
    };
    return jwt.sign(payload, jwtSecret, options)
};