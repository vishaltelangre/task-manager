import { Task } from "../types";
import Badge from "./ui/Badge";
import Button from "./ui/Button";

type TaskItemProps = {
  task: Task;
  onToggle: (taskId: number) => void;
  onDelete: (taskId: number) => void;
};
const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  return (
    <div
      className={`flex justify-between items-center p-4 border-2 border-gray-300 dark:border-gray-600 rounded-md transition-colors ${task.done ? "opacity-40" : ""}`}
    >
      <div className="flex items-center gap-3 flex-1">
        <h3
          className={`text-base dark:text-white ${task.done ? "line-through" : ""}`}
        >
          {task.name}
        </h3>
        <Badge priority={task.priority} />
      </div>
      <div className="flex gap-2">
        <Button onClick={() => onToggle(task.id)}>Done</Button>
        <Button variant="danger" onClick={() => onDelete(task.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TaskItem;
