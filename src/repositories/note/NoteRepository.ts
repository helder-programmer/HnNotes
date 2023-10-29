import { Note } from "@prisma/client";
import { prismaClient } from "../../database";
import { INoteRepository } from "../types/INoteRepository";
import { ICreateNoteDTO } from "./dtos/ICreateNoteDTO";
import { IFindAllDTO } from "./dtos/IFindAllDTO";
import { IFindByIdDTO } from "./dtos/IFindByIdDTO";
import { IUpdateNoteDTO } from "./dtos/IUpdateNoteDTO";

export class NoteRepository implements INoteRepository {
    public async create({ userId, title }: ICreateNoteDTO) {

        const note = await prismaClient.note.create({
            data: {
                title,
                content: 'New Note',
                userId
            }
        });

        return note;
    }

    public async findAll({ userId }: IFindAllDTO) {
        const searchedNotes = await prismaClient.note.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });

        return searchedNotes;
    }

    public async findById({ userId, noteId }: IFindByIdDTO) {
        const searchedNote = await prismaClient.note.findFirst({
            where: {
                noteId,
                userId
            }
        });

        return searchedNote;
    }

    public async update({ title, content, oldNote }: IUpdateNoteDTO) {
        const objectToUpdate: any = {};

        if (title != oldNote?.title) objectToUpdate.title = title;
        if (content != oldNote?.content) objectToUpdate.content = content;

        const updatedNote = await prismaClient.note.update({
            data: objectToUpdate,
            where: {
                noteId: oldNote.noteId
            }
        });


        return updatedNote;
    }

    public async remove(noteToRemove: Note) {
        await prismaClient.note.delete({
            where: {
                noteId: noteToRemove.noteId
            }
        });
    }

    public async findByTitle(title: string) {
        const searchedNotes = await prismaClient.note.findMany({
            where:{
                title: {
                    startsWith: title
                }
            },
            orderBy: {createdAt: 'desc'}
        });

        return searchedNotes;
    }
}