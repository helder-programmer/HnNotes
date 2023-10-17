import { User } from "@prisma/client";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.SECRET_KEY!;

export function generateToken(user: User) {
    
    const token = jwt.sign(
        { userId: user.userId },
        secretKey!,
        { expiresIn: '1h' }
    );

    return token;
}