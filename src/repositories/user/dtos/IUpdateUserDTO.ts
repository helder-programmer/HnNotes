import { User } from "@prisma/client";

export interface IUpdateUserDTO {
    userToUpdate: User;
    name: string;
    email: string;
}
