import { Note } from "@prisma/client";

export interface IUpdateNoteDTO {
    noteId: string;
    userId: string;
    title: string;
    content: string;
    oldNote: Note;
}