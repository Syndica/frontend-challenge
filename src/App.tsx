import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";
import TaskStats from "./components/TaskStats";
import useTasks from "./hooks/useTasksHook.ts";

import type { Task } from "./types";

const App = () => {
  const { error, tasks, setTasks, loading, addTask, toggleTask, removeTask } = useTasks();

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Task count:", tasks.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [tasks]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <main id="container" className="max-w-xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="gap-4 items-center mb-8">
        <h1 className="nixie-one-regular text-center text-2xl font-bold">Matt's Super Awesome Task Manager</h1>
      </div>

      <TaskInput onAdd={addTask} />
      <TaskList
        tasks={tasks}
        onToggle={toggleTask}
        deleteTask={removeTask}
        setTasks={setTasks}
      />

      <TaskStats tasks={tasks} />
    </main>
  );
};

export default App;
