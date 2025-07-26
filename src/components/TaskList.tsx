import { useState, useCallback } from "react";
import TaskItem from "./TaskItem";
import type { Task } from "../types";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  deleteTask: (id: string) => void;
  setTasks: (tasks: Task[]) => void;
}

const TaskList = ({ tasks, onToggle, deleteTask, setTasks }: TaskListProps) => {
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);

  const handleDelete = useCallback((id: string) => {
    setDeletingTaskId(id);
    setTimeout(() => {
      deleteTask(id);
      setDeletingTaskId(null);
    }, 400); // 400 to mirror the CSS animation
  }, [deleteTask]);

  const moveTask = useCallback((fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    const updated = [...tasks];
    const [movedItem] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, movedItem);
    setTasks(updated);
  }, [tasks, setTasks]);

  if (tasks.length === 0) {
    return <p className="text-gray-500 italic">No tasks found.</p>;
  }

  return (
    <ul className="space-y-2 mb-4 nixie-one-regular" role="list" aria-label="Task list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          tasks={tasks}
          moveTask={moveTask}
          onToggle={onToggle}
          onDelete={handleDelete}
          isDeleting={deletingTaskId === task.id}
        />
      ))}
    </ul>
  );
};

export default TaskList;
