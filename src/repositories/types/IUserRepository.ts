import { User } from "@prisma/client";
import { ICreateUserDTO } from "../user/dtos/ICreateUserDTO";
import { IFindByEmailDTO } from "../user/dtos/IFindByEmailDTO";

export interface IUserRepository {
    create(data: ICreateUserDTO): Promise<User>;
    findByEmail(data: IFindByEmailDTO): Promise<User | null>;

}