import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";
import TaskStats from "./components/TaskStats";
import { fetchTasks, addTask, toggleTask, removeTask } from "./lib/fakeApi";
import type { Task } from "./types";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Fetching data...");
    fetchTasks()
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load tasks");
        setLoading(false);
      });
  }, []); // Issue 1

  useEffect(() => {
    const interval = setInterval(() => {
      const incompleteTasks = tasks.filter((t) => !t.completed).length;
      console.log("Task count:", incompleteTasks);
    }, 3000);
    return () => clearInterval(interval);
  }, [tasks]); // Issue 2

  const handleAdd = async (text: string) => {
    const newTask = await addTask(text);
    setTasks((currentTasks) => [...currentTasks, newTask]);
  }; // Issue 4

  const handleRemove = async (id: string) => {
    const prevTasks = tasks;
    setTasks((currentTasks) => currentTasks.filter((t) => t.id !== id));
    removeTask(id).catch(() => {
      console.error("Failed to delete task. Resetting tasks to previous");
      setTasks(prevTasks);
    });
  }; //  Issue 5

  const handleToggle = (id: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );

    setTimeout(() => {
      toggleTask(id).catch(() => {
        console.error("Failed to toggle completed. Resetting completed.");
        setTasks((currentTasks) =>
          currentTasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          )
        );
      });
    }, 300);
  }; // Issue 4

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <main className="bg-gray-50 mx-auto p-6 max-w-xl min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <img
          src="../public/mark.svg"
          alt="Syndica Logo"
          className="w-8 h-auto"
        />
        <h1 className="font-bold text-2xl">Syndica Task Manager</h1>
      </div>

      <TaskInput onAdd={handleAdd} />
      <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleRemove} />
      <TaskStats tasks={tasks} />
    </main>
  );
};

export default App;

// Infinite re-fetch loop: fetchTasks should only run once on initial load.
// Stale logs: task count in the logs never updates.
// Broken task stats: completed task count may appear incorrect after toggling.
// UI jank: network latency causing inconsitant and buggy ux.
// Implement remove task: implement remove task functionality
