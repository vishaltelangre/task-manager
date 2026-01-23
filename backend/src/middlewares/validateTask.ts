import { Request, Response, NextFunction } from "express";
import { CreateTaskPayloadSchema, UpdateTaskPayloadSchema } from "../types";
import { getErrorMessage } from "../utils";

export const validateCreateTask = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = CreateTaskPayloadSchema.safeParse(req.body);

  if (!result.success) {
    return res
      .status(400)
      .json({ message: getErrorMessage(result.error.issues) });
  }

  next();
};

export const validateUpdateTask = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "At least one field must be provided for update"
    });
  }

  const result = UpdateTaskPayloadSchema.safeParse(req.body);

  if (!result.success) {
    return res
      .status(400)
      .json({ message: getErrorMessage(result.error.issues) });
  }

  next();
};
