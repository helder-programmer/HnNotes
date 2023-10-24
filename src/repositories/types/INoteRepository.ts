import { Note } from "@prisma/client";
import { ICreateNoteDTO } from "../note/dtos/ICreateNoteDTO";
import { IFindAllDTO } from "../note/dtos/IFindAllDTO";
import { IFindByIdDTO } from "../note/dtos/IFindByIdDTO";

export interface INoteRepository {
    create(data: ICreateNoteDTO): Promise<Note>; 
    findAll(data: IFindAllDTO): Promise<Note[]>;
    findById(data: IFindByIdDTO): Promise<Note | null>;
}