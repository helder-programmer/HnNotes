import { User } from "@prisma/client";

export interface IUpdatePasswordDTO {
    userToUpdate: User;
    newPassword: string;
}