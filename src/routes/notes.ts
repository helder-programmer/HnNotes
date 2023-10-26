import { Router } from "express";
import { NoteController } from "../controllers/NoteController";
import { authMiddleware } from "../middlewares/auth";
import { NoteRepository } from "../repositories/note/NoteRepository";

const notesRouter = Router();

const repository = new NoteRepository();
const controller = new NoteController(repository);


notesRouter.post('/', authMiddleware, (req, res) => controller.create(req, res));
notesRouter.get('/', authMiddleware, (req, res) => controller.getAll(req, res));
notesRouter.get('/:noteId', authMiddleware, (req, res) => controller.getOne(req, res));
notesRouter.put('/:noteId', authMiddleware, (req, res) => controller.update(req, res));
notesRouter.delete('/:noteId', authMiddleware, (req, res) => controller.remove(req, res));


export { notesRouter };