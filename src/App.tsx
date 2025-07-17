import { useEffect, useRef } from "react";
import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";
import TaskStats from "./components/TaskStats";
import { useTasks } from "./hooks/useTasks";
import type { Task } from "./types";

const App = () => {
  const { tasks, loading, error, add, toggle, remove } = useTasks();
  const tasksRef = useRef<Task[]>([]);

  useEffect(() => {
    tasksRef.current = tasks;
  }, [tasks]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Task count:", tasksRef.current.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <main className="max-w-xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex gap-4 items-center mb-8">
        <img
          src="../public/mark.svg"
          alt="Syndica Logo"
          className="w-8 h-auto"
        />
        <h1 className="text-2xl font-bold">Syndica Task Manager</h1>
      </div>

      <TaskInput onAdd={add} />
      <TaskList tasks={tasks} onToggle={toggle} onDelete={remove} />
      <TaskStats tasks={tasks} />
    </main>
  );
};

export default App;
