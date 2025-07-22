import { useState, useEffect } from "react";
import type { Task } from "../types";

interface TaskStatsProps {
  tasks: Task[];
}

const TaskStats = ({ tasks }: TaskStatsProps) => {
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    const count = tasks.filter((t) => t.completed).length;
    setCompleted(count);
  }, [tasks]); // Issue 3

  const total = tasks.length;

  return (
    <div className="text-gray-600 text-sm">
      ✅ {completed} of {total} tasks complete
    </div>
  );
};

export default TaskStats;
