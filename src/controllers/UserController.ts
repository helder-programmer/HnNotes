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
        const { password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 8);

        const data = { ...req.body, password: hashedPassword };

        const emailAlreadyExists = await this.repository.findByEmail(email);

        if (emailAlreadyExists) throw new UnauthorizedError('E-mail already exists!');

        const user = await this.repository.create(data);
        return res.status(200).json(user);
    }


    public async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await this.repository.findByEmail(email);

        if (!user) throw new UnauthorizedError('Invalid e-mail or password!');

        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (!isCorrectPassword) throw new UnauthorizedError('Invalid e-mail or password!');


        const token = generateToken(user);

        return res.status(200).json({ token, user });
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

    public async updatePassword(req: Request, res: Response) {
        const { oldPassword, newPassword } = req.body;
        const userToUpdate = req.user!;

        const isCorrectPassword = await bcrypt.compare(oldPassword, userToUpdate.password);

        if (!isCorrectPassword) throw new UnauthorizedError('Incorrect old password!');

        const hashedNewPassword = await bcrypt.hash(newPassword, 8);

        await this.repository.updatePassword({
            userToUpdate,
            newPassword: hashedNewPassword
        });

        return res.status(200).json({ message: 'User suceesfully updated!' });
    }
}