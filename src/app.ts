import express, { Express } from 'express';
import cors from 'cors';

import { usersRouter } from './routes/users';
import { errorMiddleware } from './middlewares/error';
import { notesRouter } from './routes/notes';


class App {
    public express: Express;
    constructor() {
        this.express = express();
        this.middlewares()
        this.routes();
        this.errorsHandlers();

    }


    public middlewares() {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(cors());
    }


    public routes() {
        this.express.use('/users', usersRouter);
        this.express.use('/notes', notesRouter);
    }

    public errorsHandlers() {
        this.express.use(errorMiddleware);
    }

}


export default new App().express;

