import type { Task } from '../types';

interface TaskStatsProps {
  tasks: Task[];
}

const TaskStats = ({ tasks }: TaskStatsProps) => {
  // no need for state or useEffect!
  // can't fool me!
  const completed = tasks.filter((t) => t.completed).length;
  const total = tasks.length;

  return (
    <div className='text-sm text-gray-600'>
      ✅ {completed} of {total} tasks complete
    </div>
  );
};

export default TaskStats;
