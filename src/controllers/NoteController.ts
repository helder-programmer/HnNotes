import { Request, Response } from "express";
import { NotFoundError } from "../helpers/errors";
import { INoteRepository } from "../repositories/types/INoteRepository";

export class NoteController {
    constructor(
        private repository: INoteRepository
    ) {
        this.repository = repository;
    }

    public async create(req: Request, res: Response) {

        const note = await this.repository.create({
            userId: req.user!.userId,
            ...req.body
        });

        return res.status(200).json(note);
    }

    public async getAll(req: Request, res: Response) {
        const searchedNotes = await this.repository.findAll({ userId: req.user!.userId });
        return res.status(200).json(searchedNotes);
    }

    public async getOne(req: Request, res: Response) {
        const { noteId } = req.params;
        const userId = req.user!.userId;
        console.log(noteId);

        const searchedNote = await this.repository.findById({ noteId, userId });

        if (!searchedNote) throw new NotFoundError('Note not found!');

        return res.status(200).json(searchedNote);

    }
}