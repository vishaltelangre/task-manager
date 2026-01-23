import { useState, useRef } from "react";
import { Priority, Task } from "../types";
import Button from "./ui/Button";
import Card from "./ui/Card";

type TaskFormProps = {
  onSubmit: (task: Pick<Task, "name" | "priority">) => void;
};
const TaskForm = ({ onSubmit }: TaskFormProps) => {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState<Priority | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (priority) {
      onSubmit({ name: taskName, priority });
    }

    setTaskName("");
    setPriority(null);

    inputRef.current?.focus();
  };

  return (
    <Card className="mb-6">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Add New Task</h2>
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <input
          className="flex-1 p-2 border-2 border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 dark:bg-gray-700 dark:text-white transition-colors"
          ref={inputRef}
          name="task-name"
          type="text"
          placeholder="Enter task here..."
          required
          value={taskName}
          onChange={(event) => setTaskName(event.target.value)}
        />
        <select
          className="p-2 border-2 border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 dark:bg-gray-700 dark:text-white transition-colors"
          name="priority"
          value={priority ?? ""}
          onChange={(event) => setPriority(event.target.value as Priority)}
        >
          <option value="">Select priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <Button variant="primary" type="submit">
          Add Task
        </Button>
      </form>
    </Card>
  );
};

export default TaskForm;
