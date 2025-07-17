import { useEffect, useRef } from "react";
import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";
import TaskStats from "./components/TaskStats";
import Spinner from "./components/Spinner";
import { useTasks } from "./hooks/useTasks";
import type { Task } from "./types";

const App = () => {
  const { tasks, loading, error, add, toggle, remove, adding, deleting } =
    useTasks();
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <Spinner className="h-6 w-6 text-indigo-500" />
          <p className="text-sm text-gray-500">Loading your tasks...</p>
        </div>
      </div>
    );
  }
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

      <TaskInput onAdd={add} adding={adding} />
      <TaskList
        tasks={tasks}
        onToggle={toggle}
        onDelete={remove}
        deleting={deleting}
      />
      <TaskStats tasks={tasks} />
    </main>
  );
};

export default App;
