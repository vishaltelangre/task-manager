import { Task } from "../types/index.js";
import TaskItem from "./TaskItem.js";

type TaskListProps = {
  tasks: Task[];
  onToggle: (taskId: number) => void;
  onDelete: (taskId: number) => void;
};
const TaskList = ({ tasks, onToggle, onDelete }: TaskListProps) => (
  <div className="flex flex-col gap-3">
    {tasks.map((task) => (
      <TaskItem
        key={task.id}
        task={task}
        onToggle={onToggle}
        onDelete={onDelete}
      />
    ))}
  </div>
);

export default TaskList;
