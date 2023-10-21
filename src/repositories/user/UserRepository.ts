import { prismaClient } from "../../database";
import { IUserRepository } from "../types/IUserRepository";
import { ICreateUserDTO } from "./dtos/ICreateUserDTO";
import { IFindByEmailDTO } from "./dtos/IFindByEmailDTO";
import { IFindByIdDTO } from "./dtos/IFindByIdDTO";


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
}