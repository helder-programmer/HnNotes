import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../helpers/errors';




export const errorMiddleware = (
    error: Error & Partial<ApiError>,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = error.statusCode ?? 500;
    const message = error.message ? error.message : 'Internal server error!';
    console.log(error);
    return res.status(statusCode).json({ message });
}