import type { Task } from "../types";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskList = ({ tasks, onToggle, onDelete }: TaskListProps) => {
  if (tasks.length === 0) {
    return <p className="text-gray-500 italic">No tasks found.</p>;
  }

  return (
    <ul className="space-y-2 mb-4">
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
              className="accent-indigo-600 mr-2"
            />
            <span
              className={`transition-all duration-200 ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {task.text}
            </span>
          </div>

          <button
            className="ml-auto px-2 py-1 text-xs text-red-100 bg-red-600 rounded hover:bg-red-600 transition-transform duration-200 hover:scale-105"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
