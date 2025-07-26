import { useEffect, useState } from "react";
import type { Task } from "../types";
import * as taskService from "../lib/fakeApi";

const TASKS_STORAGE_KEY = "my-app-tasks";

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(TASKS_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Task[];
        setTasks(parsed);
        setLoading(false);
      } catch {
        console.error("Failed to parse localStorage tasks");
        setError("Failed to load tasks from localStorage");
        setLoading(false);
      }
    } else {
      const fetchData = async () => {
        try {
          const data = await taskService.fetchTasks();
          setTasks(data);
          localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(data));
        } catch {
          setError("Failed to load tasks");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, loading]);

  const add = async (text: string) => {
    const newTask = await taskService.addTask(text);
    setTasks((item) => [...item, newTask]);
  };

  const toggle = async (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  

  const remove = async (id: string) => {
    await taskService.removeTask(id); // Just let the API simulate its deletion
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };
  
  return {
    error,
    tasks,
    setTasks,
    loading,
    addTask: add,
    toggleTask: toggle,
    removeTask: remove,
  };
};

export default useTasks;
