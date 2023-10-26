import { Note } from "@prisma/client";
import { ICreateNoteDTO } from "../note/dtos/ICreateNoteDTO";
import { IFindAllDTO } from "../note/dtos/IFindAllDTO";
import { IFindByIdDTO } from "../note/dtos/IFindByIdDTO";
import { IUpdateNoteDTO } from "../note/dtos/IUpdateNoteDTO";

export interface INoteRepository {
    create(data: ICreateNoteDTO): Promise<Note>; 
    findAll(data: IFindAllDTO): Promise<Note[]>;
    findById(data: IFindByIdDTO): Promise<Note | null>;
    update(data: IUpdateNoteDTO): Promise<Note>;
    remove(noteToRemove: Note): Promise<void>;
    findByTitle(title: string): Promise<Note[]>;
}