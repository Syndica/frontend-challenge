import { useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";
import TaskStats from "./components/TaskStats";
import { useTaskList, useAddTask, useToggleTask, useRemoveTask } from "./hooks";

const App = () => {
  const { tasks, setTasks, loading, error } = useTaskList(); // API Hooks
  const handleAdd = useAddTask(setTasks);
  const handleToggle = useToggleTask(tasks, setTasks);
  const handleRemove = useRemoveTask(tasks, setTasks);

  useEffect(() => {
    const interval = setInterval(() => {
      const incompleteTasks = tasks.filter((t) => !t.completed).length;
      console.log("Task count:", incompleteTasks);
    }, 3000);
    return () => clearInterval(interval);
  }, [tasks]); // Issue 2

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
// UI jank: network latency causing inconsistent and buggy ux.
// Implement remove task: implement remove task functionality
