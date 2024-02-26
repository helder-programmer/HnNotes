import { prismaClient } from "../../database";
import { IUserRepository } from "../types/IUserRepository";
import { ICreateUserDTO } from "./dtos/ICreateUserDTO";
import { IFindByIdDTO } from "./dtos/IFindByIdDTO";
import { IUpdateUserDTO } from "./dtos/IUpdateUserDTO";


export class UserRepository implements IUserRepository {
    public async create({ name, email, picture, googleId }: ICreateUserDTO) {
        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                picture,
                googleId
            }
        });

        return user;
    }

    public async findByEmail(email: string) {
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
}