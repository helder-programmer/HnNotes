import { Request, Response, NextFunction } from "express";
import dotEnv from 'dotenv';
import jwt from 'jsonwebtoken';
import { UserRepository } from "../repositories/user/UserRepository";
dotEnv.config();

const secretKey = process.env.SECRET_KEY

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(' ')[1];
    const userRepository = new UserRepository();

    if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided!' });

    jwt.verify(token!, secretKey!, (err, decoded: any) => {
        if (err) return res.status(401).json({ message: 'Unauthorized: Invalid token!' });

        userRepository.findById({ userId: decoded.userId }).then(user => {
            req.user = user;
            next();
        });
    });
}