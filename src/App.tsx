import { useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskInput from './components/TaskInput';
import TaskStats from './components/TaskStats';

import { useTasks } from './hooks/use-tasks';

const App = () => {
  const {
    tasks,
    taskCountRef,
    loading,
    error,
    addTask,
    removeTask,
    toggleTask,
  } = useTasks();

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Task count:', taskCountRef.current);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className='p-4'>Loading...</div>;
  if (error) return <div className='p-4 text-red-600'>{error}</div>;

  return (
    <main className='max-w-xl mx-auto p-6 bg-gray-50 min-h-screen'>
      <h1 className='text-2xl font-bold mb-4'>Syndica Todo App</h1>

      <TaskInput onAdd={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} onRemove={removeTask} />
      <TaskStats tasks={tasks} />
    </main>
  );
};

export default App;
