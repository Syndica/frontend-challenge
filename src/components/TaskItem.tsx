import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import ToggleSwitch from "./ToggleSwitch";
import type { Task } from "../types";

const ItemType = "TASK";

interface DragItem {
  id: string;
}

interface TaskItemProps {
  task: Task;
  tasks: Task[];
  moveTask: (fromIndex: number, toIndex: number) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

const TaskItem = ({
  task,
  tasks,
  moveTask,
  onToggle,
  onDelete,
  isDeleting,
}: TaskItemProps) => {
  const ref = useRef<HTMLLIElement>(null);

  const [, drop] = useDrop<DragItem>({
    accept: ItemType,
    hover(item, monitor) {
      if (!ref.current) return;

      const dragIndex = tasks.findIndex((t) => t.id === item.id);
      const hoverIndex = tasks.findIndex((t) => t.id === task.id);
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveTask(dragIndex, hoverIndex);
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <li
      ref={ref}
      aria-label={`Task: ${task.text}`}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: "move" }}
      className={`flex justify-between items-center gap-2 p-2 border border-gray-400 rounded shadow-sm bg-white hover:bg-gray-50 transition
        ${isDeleting ? "fade-out" : "fade-in"}
      `}
    >
      <div className="flex items-center">
        <ToggleSwitch checked={task.completed} onChange={() => onToggle(task.id)} />
        <span className={task.completed ? "line-through text-gray-400" : ""}>
          {task.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        aria-label={`Delete task: ${task.text}`}
        className="cursor-pointer ml-auto px-2 py-1 text-xs text-red-100 bg-red-600 rounded hover:bg-red-600 transition"
      >
        Delete
      </button>
    </li>
  );
};

export default React.memo(TaskItem);
