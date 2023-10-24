import dotenv from 'dotenv';
dotenv.config();

import { User } from "@prisma/client";
import app from "./app";

declare global {
    namespace Express {
        interface Request {
            user?: User | null;
        }
    }
}

app.listen(8000, '172.60.7.91', () => {
    console.log('Servidor Rodando');
});