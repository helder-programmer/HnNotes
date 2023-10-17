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

    public async create(req: Request, res: Response) {
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 8);

        const data = { ...req.body, password: hashedPassword };

        const user = await this.repository.create(data);
        return res.status(200).json(user);
    }


    public async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await this.repository.findByEmail({ email });

        if (!user) throw new UnauthorizedError('Invalid e-mail or password!');

        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (!isCorrectPassword) throw new UnauthorizedError('Invalid e-mail or password!');


        const token = generateToken(user);


        return res.status(200).json({ token, user });

    }




}