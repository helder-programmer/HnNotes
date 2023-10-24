import { Request, Response } from "express";
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
        const serachedNotes = await this.repository.findAll({ userId: req.user!.userId });
        return res.status(200).json(serachedNotes);
    }
}