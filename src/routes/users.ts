import { Router } from "express";

import { UserController } from "../controllers/UserController";
import { UserRepository } from "../repositories/user/UserRepository";
import { authMiddleware } from "../middlewares/auth";


const repository = new UserRepository();
const controller = new UserController(repository);

const usersRouter = Router();

usersRouter.post('/', (req, res) => controller.create(req, res));
usersRouter.post('/login', (req, res) => controller.login(req, res));
usersRouter.get('/me', authMiddleware, (req, res) => controller.recoverUserInformations(req, res));

export { usersRouter };