import { useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";
import TaskStats from "./components/TaskStats";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import {
  fetchAllTasks,
  addNewTask,
  toggleTaskStatus,
  deleteTask,
} from "./features/tasks/taskSlice";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: tasks,
    loading,
    error,
  } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch]);

  const handleAdd = (text: string) => {
    dispatch(addNewTask(text));
  };

  const handleToggle = (id: string) => {
    dispatch(toggleTaskStatus(id));
  };

  const handleRemove = (id: string) => {
    dispatch(deleteTask(id));
  };

  useEffect(() => {
    const interval = setInterval(() => {}, 3000);
    return () => clearInterval(interval);
  }, [tasks]);

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

      <TaskInput onAdd={handleAdd} />
      <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleRemove} />
      <TaskStats tasks={tasks} />
    </main>
  );
};

export default App;
