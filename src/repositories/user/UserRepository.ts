import { prismaClient } from "../../database";
import { IUserRepository } from "../types/IUserRepository";
import { ICreateUserDTO } from "./dtos/ICreateUserDTO";
import { IFindByEmailDTO } from "./dtos/IFindByEmailDTO";
import { IFindByIdDTO } from "./dtos/IFindByIdDTO";
import { IUpdatePasswordDTO } from "./dtos/IUpdatePasswordDTO";
import { IUpdateUserDTO } from "./dtos/IUpdateUserDTO";


export class UserRepository implements IUserRepository {
    public async create({ name, email, password }: ICreateUserDTO) {
        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                password
            }
        });

        return user;
    }

    public async findByEmail({ email }: IFindByEmailDTO) {
        const searchedUser = await prismaClient.user.findFirst({
            where: { email }
        });

        return searchedUser;
    }

    public async findById({ userId }: IFindByIdDTO) {
        const user = await prismaClient.user.findFirst({
            where: {
                userId
            }
        });

        return user;
    }

    public async update({ userToUpdate, name, email }: IUpdateUserDTO) {

        const objectToUpdate: any = {};


        if (name != userToUpdate.name) objectToUpdate.name = name;
        if (email != userToUpdate.email) objectToUpdate.email = email;


        const updatedUser = await prismaClient.user.update({
            data: objectToUpdate,
            where: {
                userId: userToUpdate.userId
            }
        });

        return updatedUser;
    }

    public async updatePassword({ userToUpdate, newPassword }: IUpdatePasswordDTO) {
        await prismaClient.user.update({
            data: {
                password: newPassword
            },
            where: {
                userId: userToUpdate.userId
            }
        });
    }
}