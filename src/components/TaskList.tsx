import type { Task } from "../types";
import Spinner from "./Spinner";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  deleting: string | null
}

const TaskList = ({ tasks, onToggle, onDelete, deleting }: TaskListProps) => {
  if (tasks.length === 0) {
    return <p className="text-gray-500 italic">No tasks found.</p>;
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex justify-between items-center gap-2 p-2 border border-gray-400 rounded shadow-sm bg-white hover:bg-gray-50 transition"
        >
          <div>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              className="accent-indigo-600 mr-2 cursor-pointer"
            />
            <span
              className={`transition-all duration-200 ${
                task.completed ? "line-through text-gray-400 italic" : ""
              }`}
            >
              {task.text}
            </span>
          </div>

          <button
            className="btn-danger"
            onClick={() => onDelete(task.id)}
            disabled={deleting === task.id}
          >
             {deleting === task.id ? <Spinner /> : "Delete"}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
