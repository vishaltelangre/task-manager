import { NextFunction, Response } from "express";
import * as TaskModel from "../models/taskModel";
import { AuthRequest } from "../types";

// GET /api/tasks - Get all tasks for authenticated user
export const getTasks = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!ensureIsAuthenticated(req, res)) return;

    const tasks = await TaskModel.getAllTasksByUserId(req.userId!);
    await new Promise((resolve) => setTimeout(resolve, 500));
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// GET /api/tasks/:id - Get a single task
export const getTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!ensureIsAuthenticated(req, res)) return;

    const { id } = req.params;
    const task = await TaskModel.getTaskById(Number(id), req.userId!);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};

// POST /api/tasks - Create a task
export const createTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!ensureIsAuthenticated(req, res)) return;

    const newTask = await TaskModel.createTask(req.body, req.userId!);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

// PUT /api/tasks/:id - Update a task
export const updateTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!ensureIsAuthenticated(req, res)) return;

    const { id } = req.params;
    const updatedTask = await TaskModel.updateTask(
      Number(id),
      req.userId!,
      req.body
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/tasks/:id = Delete a task
export const deleteTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!ensureIsAuthenticated(req, res)) return;

    const { id } = req.params;
    const deleted = await TaskModel.deleteTask(Number(id), req.userId!);

    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const ensureIsAuthenticated = (req: AuthRequest, res: Response) => {
  if (!req.userId) {
    res.status(401).json({ message: "Not authenticated" });
    return false;
  }

  return true;
};
