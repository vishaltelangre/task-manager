import express from "express";
import * as TasksController from "../controllers/tasksController";
import {
  validateCreateTask,
  validateUpdateTask
} from "../middlewares/validateTask";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

router.use(authenticate);

// GET /api/tasks
router.get("/", TasksController.getTasks);

// GET /api/tasks/:id
router.get("/:id", TasksController.getTask);

// POST /api/tasks
router.post("/", validateCreateTask, TasksController.createTask);

// PUT /api/tasks/:id
router.put("/:id", validateUpdateTask, TasksController.updateTask);

// DELETE /api/tasks/:id
router.delete("/:id", TasksController.deleteTask);

export default router;
