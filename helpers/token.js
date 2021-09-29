import sign from "jsonwebtoken";
import { jwtSecret } from "../config/secrets.js";

function generateToken(user){
    const payload = {
        subject: user.id,
        role: user.role
    };
    const options = {
        expiresIn: "30d"
    };
    return sign(payload, jwtSecret, options)
}

export default {generateToken};