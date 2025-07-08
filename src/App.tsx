import { useEffect, useState, useRef } from 'react';
import TaskList from './components/TaskList';
import TaskInput from './components/TaskInput';
import TaskStats from './components/TaskStats';
import { fetchTasks, addTask, toggleTask, removeTask } from './lib/fakeApi';
import type { Task } from './types';

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // keep track of task count via ref
  const taskCountRef = useRef(tasks.length);

  useEffect(() => {
    console.log('Fetching data...');
    fetchTasks()
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load tasks');
        setLoading(false);
      });
    // add empty deps for onMount only
  }, []);

  // update task count ref when tasks update
  useEffect(() => {
    taskCountRef.current = tasks.length;
  }, [tasks]);

  useEffect(() => {
    const interval = setInterval(() => {
      // log task count ref current
      console.log('Task count:', taskCountRef.current);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleAdd = async (text: string) => {
    // save current asks
    const currentTasks = tasks;
    // create placeholder id
    const id = crypto.randomUUID();
    // create new task to add to state
    const newTask = { id, text, completed: false };

    // update tasks state optimistically
    setTasks((prevTasks) => [...prevTasks, newTask]);

    // connect to api
    addTask(text)
      .then((taskFromApi: Task) => {
        // update the new task id to match the server state
        setTasks((prevTasks) => {
          const newTasks = prevTasks.map((task) => {
            if (task.id === id) {
              return { ...task, id: taskFromApi.id };
            }
            return task;
          });
          return newTasks;
        });
      })
      .catch((error: unknown) => {
        console.log(error);
        // revert tasks state on api error
        setTasks(currentTasks);
      });
  };

  const handleRemove = async (id: string) => {
    // save current tasks
    const currentTasks = tasks;

    // update tasks optimistically
    setTasks((prevTasks) =>
      [...prevTasks].filter((task: Task) => task.id !== id)
    );

    // connect to api
    removeTask(id)
      .then()
      .catch((error: unknown) => {
        console.log(error);
        // revert tasks state on api error
        setTasks(currentTasks);
      });
  };

  const handleToggle = (id: string) => {
    // save current tasks
    const currentTasks = tasks;

    // update tasks optimistically
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );

    // connect to api
    toggleTask(id)
      .then()
      .catch((error: unknown) => {
        console.log(error);
        // revert tasks state on api error
        setTasks(currentTasks);
      });
  };

  if (loading) return <div className='p-4'>Loading...</div>;
  if (error) return <div className='p-4 text-red-600'>{error}</div>;

  return (
    <main className='max-w-xl mx-auto p-6 bg-gray-50 min-h-screen'>
      <h1 className='text-2xl font-bold mb-4'>Syndica Todo App</h1>

      <TaskInput onAdd={handleAdd} />
      {/* pass onRemove with handleRemove to TaskList */}
      <TaskList tasks={tasks} onToggle={handleToggle} onRemove={handleRemove} />
      <TaskStats tasks={tasks} />
    </main>
  );
};

export default App;
