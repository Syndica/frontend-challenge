import { memo } from "react";
import type { Task } from "../types";

interface TaskItemProps {
  task: Task;
  key: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

// Use memo() to improve performance for longer task list.
const TaskItem = memo(({ task, onToggle, onDelete, key }: TaskItemProps) => {
  return (
    <li
      key={key}
      className="flex justify-between items-center gap-2 bg-white hover:bg-gray-50 shadow-sm p-2 border border-gray-300 rounded transition"
    >
      <div>
        {/* Added a11y aria-label for screen readers */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="mr-2 accent-indigo-600"
          aria-label={`Mark task "${task.text}" as ${
            task.completed ? "incomplete" : "complete"
          }`}
        />
        <span className={task.completed ? "line-through text-gray-400" : ""}>
          {task.text}
        </span>
      </div>

      <button
        className="bg-red-600 hover:bg-red-700 ml-auto px-2 py-1 rounded font-bold text-[10px] text-red-100 transition-colors duration-200 cursor-pointer"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </li>
  );
});

export default TaskItem;
