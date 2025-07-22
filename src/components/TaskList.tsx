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
          className="flex justify-between items-center gap-2 bg-white hover:bg-gray-50 shadow-sm p-2 border border-gray-400 rounded transition"
        >
          <div>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              className="mr-2 accent-indigo-600"
            />
            <span
              className={task.completed ? "line-through text-gray-400" : ""}
            >
              {task.text}
            </span>
          </div>

          <button
            className="bg-red-600 hover:bg-red-600 ml-auto px-2 py-1 rounded text-red-100 text-xs transition"
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
