import { Priority, Task } from "../types";
import api from "./api";

export type NewTaskData = Pick<Task, "name" | "priority">;

export type UpdateTaskData = {
  name?: string;
  priority?: Priority;
  done?: boolean;
};

export const taskApi = {
  getAllTasks: async () => {
    const response = await api.get<Task[]>("/tasks");
    return response.data;
  },

  getTask: async (id: number) => {
    const response = await api.get<Task>(`/task/${id}`);
    return response.data;
  },

  createTask: async (taskData: NewTaskData) => {
    const response = await api.post<Task>("/tasks", taskData);
    return response.data;
  },

  updateTask: async (id: number, updatedTask: UpdateTaskData) => {
    const response = await api.put<Task>(`/tasks/${id}`, updatedTask);
    return response.data;
  },

  deleteTask: async (id: number) => {
    await api.delete(`/task/${id}`);
  }
};
