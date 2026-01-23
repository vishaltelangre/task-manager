import { useCallback, useEffect, useState } from "react";
import { Task } from "../types";
import { NewTaskData, taskApi, UpdateTaskData } from "../services/taskApi";

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await taskApi.getAllTasks();
      setTasks(data);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to fetch tasks";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = useCallback(async (taskData: NewTaskData) => {
    try {
      setError(null);

      const newTask = await taskApi.createTask(taskData);
      setTasks((prev) => [...prev, newTask]);

      return newTask;
    } catch (e) {
      setError("Failed to create task");
      throw e;
    }
  }, []);

  const updateTask = useCallback(
    async (id: number, updates: UpdateTaskData) => {
      const previousTasks = [...tasks];

      // Optimistic update - to update UI immediately!
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
      );

      try {
        setError(null);

        const updatedTask = await taskApi.updateTask(id, updates);
        setTasks((prev) =>
          prev.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task
          )
        );

        return updatedTask;
      } catch (e) {
        // Rollback optimistic updates on error
        setTasks(previousTasks);

        setError("Failed to update task");
        throw e;
      }
    },
    [tasks]
  );

  const deleteTask = useCallback(
    async (id: number) => {
      const previousTasks = [...tasks];

      setTasks((prev) => prev.filter((task) => task.id !== id));

      try {
        setError(null);

        await taskApi.deleteTask(id);
      } catch (e) {
        setTasks(previousTasks);

        setError("Failed to delete task");
        throw e;
      }
    },
    [tasks]
  );

  const toggleTask = useCallback(
    async (id: number) => {
      const task = tasks.find((task) => task.id === id);
      if (!task) return;

      await updateTask(id, { done: !task.done });
    },
    [tasks, updateTask]
  );

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    refetch: fetchTasks
  };
};

export default useTasks;
