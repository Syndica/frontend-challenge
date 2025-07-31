import { mockTasks } from "../mocks/mockTasks";
import type { Task } from "../types";

let tasks = [...mockTasks];

export const fetchTasks = (): Promise<Task[]> =>
  new Promise((resolve) => setTimeout(() => resolve([...tasks]), 500));

export const addTask = (text: string): Promise<Task> =>
  new Promise((resolve) => {
    const newTask = { id: crypto.randomUUID(), text, completed: false };
    tasks.push(newTask);
    setTimeout(() => resolve(newTask), 1000);
  });

export const toggleTask = (id: string): Promise<Task> =>
  new Promise((resolve) => {
    const task = tasks.find((t) => t.id === id);
    if (task) task.completed = !task.completed;
    setTimeout(() => resolve({ ...task! }), 1000);
  });

export const removeTask = (id: string): Promise<Task[]> =>
  new Promise((resolve) => {
    tasks = tasks.filter((task) => task.id !== id);
    setTimeout(() => resolve([...tasks]), 1000);
  });
