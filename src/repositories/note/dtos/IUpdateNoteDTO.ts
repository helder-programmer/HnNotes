import { Note } from "@prisma/client";

export interface IUpdateNoteDTO {
    title: string;
    content: string;
    oldNote: Note;
}