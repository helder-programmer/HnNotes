import { Request, Response } from "express";
import { IUserRepository } from "../repositories/types/IUserRepository";
import bcrypt from 'bcrypt';
import { UnauthorizedError } from "../helpers/errors";
import { generateToken } from "../helpers/generateToken";

export class UserController {
    constructor(
        private repository: IUserRepository
    ) {
        this.repository = repository;
    }

    public async login(req: Request, res: Response) {
        const { email } = req.body;

        const existentUser = await this.repository.findByEmail(email);

        if (!existentUser) {
            const user = await this.repository.create({ email, ...req.body });
            const token = generateToken(user);
            return res.status(200).json({ token, user });
        }

        const token = generateToken(existentUser);

        return res.status(200).json({ token, user: existentUser });
    }


    public async recoverUserInformations(req: Request, res: Response) {
        return res.status(200).json(req.user);
    }


    public async update(req: Request, res: Response) {
        const { name, email } = req.body;
        const userToUpdate = req.user!;

        const updatedUser = await this.repository.update({ userToUpdate, name, email });

        return res.status(200).json(updatedUser);
    }
}