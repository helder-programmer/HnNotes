import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { UserRepository } from "../repositories/user/UserRepository";


const repository = new UserRepository();
const controller = new UserController(repository);

const usersRouter = Router();

usersRouter.post('/', (req, res) => controller.create(req, res));
usersRouter.post('/login', (req, res) => controller.login(req, res));

export { usersRouter };