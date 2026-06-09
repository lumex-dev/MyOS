// src/routes/taskRouter.js

import { Router } from 'express';
import * as taskController from '../controllers/taskController.js';
import { jwtAuth } from '../controllers/authMiddleware.js';

const taskRouter = Router();

// Alle Routes brauchen jwtAuth! (Security)

// POST - Task erstellen
taskRouter.post('/', jwtAuth, taskController.createTask);

// GET - Alle Tasks mit Filtern
taskRouter.get('/', jwtAuth, taskController.getTasksByUserId);

// GET - Single Task
taskRouter.get('/:id', jwtAuth, taskController.getTaskById);

// PATCH - Task updaten
taskRouter.patch('/:id', jwtAuth, taskController.updateTask);

// PATCH - Task Tags updaten
taskRouter.patch('/:id/tags', jwtAuth, taskController.updateTaskTags);

// DELETE - Task löschen
taskRouter.delete('/:id', jwtAuth, taskController.deleteTask);

export default taskRouter;
