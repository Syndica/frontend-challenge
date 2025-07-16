import { useEffect } from 'react';
import AppWrapper from './components/AppWrapper';
import Error from './components/Error';
import Loading from './components/Loading';
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

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <AppWrapper>
      <TaskInput onAdd={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} onRemove={removeTask} />
      <TaskStats tasks={tasks} />
    </AppWrapper>
  );
};

export default App;
