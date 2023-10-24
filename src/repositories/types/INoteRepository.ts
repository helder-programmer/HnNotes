import { Note } from "@prisma/client";
import { ICreateNoteDTO } from "../note/dtos/ICreateNoteDTO";
import { IFindAllDTO } from "../note/dtos/IFindAllDTO";

export interface INoteRepository {
    create(data: ICreateNoteDTO): Promise<Note>; 
    findAll(data: IFindAllDTO): Promise<Note[]>;
}