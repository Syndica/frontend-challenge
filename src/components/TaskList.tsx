import type { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

const TaskList = ({ tasks, onToggle, onRemove }: TaskListProps) => {
  if (tasks.length === 0) {
    return <p className='text-gray-500 italic'>No tasks found.</p>;
  }

  return (
    <ul className='space-y-2 mb-4'>
      {tasks.map((task) => (
        <li
          key={task.id}
          className='flex justify-between items-center gap-2 p-2 border rounded shadow-sm bg-white hover:bg-gray-50 transition'
        >
          <label
            htmlFor={task.id}
            className={`${
              task.completed && 'line-through text-gray-400'
            } flex-grow cursor-pointer`}
          >
            <input
              type='checkbox'
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              id={task.id}
              className='accent-indigo-600 mr-2'
            />
            {task.text}
          </label>

          <button
            onClick={() => onRemove(task.id)}
            className='cursor-pointer ml-auto px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition'
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
