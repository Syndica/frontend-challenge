import { useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";
import TaskStats from "./components/TaskStats";
// import { fetchTasks, addTask, toggleTask, removeTask } from "./lib/fakeApi";
// import type { Task } from "./types";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import {
  fetchAllTasks,
  addNewTask,
  toggleTaskStatus,
  deleteTask,
} from "./features/tasks/taskSlice";

const App = () => {
  // const [tasks, setTasks] = useState<Task[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
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
    dispatch(toggleTaskStatus(id)).then((res) => {
      console.log('Toggle result:', res);
    })
  };

  const handleRemove = (id: string) => {
    dispatch(deleteTask(id));
  };

  // useEffect(() => {
  //   // console.log("Fetching data...");
  //   fetchTasks()
  //     .then((data) => {
  //       setTasks(data);
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       setError("Failed to load tasks");
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("Task count:", tasks.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [tasks]);

  // const handleAdd = async (text: string) => {
  //   const newTask = await addTask(text);
  //   // setTasks([newTask]);
  //   setTasks((currentTasks) => [...currentTasks, newTask]);
  // };

  // const handleRemove = async (id: string) => {
  //   console.log("Deleting");
  //   console.log("id: ", id);
  //   const newTasks = await removeTask(id);

  //   setTasks(newTasks);
  // };

  // const handleToggle = (id: string) => {
  //   toggleTask(id).then((toggledTask) => {
  //     setTasks((currentTasks) =>
  //       currentTasks.map((t) => (t.id === toggledTask.id ? toggledTask : t))
  //     );
  //   });
  // };

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
