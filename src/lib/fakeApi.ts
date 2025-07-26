import type { Task } from "../types";

let tasks: Task[] = [
  { id: "1", text: "Fix the bug", completed: false },
  { id: "2", text: "Deploy to staging", completed: true },
];

export const fetchTasks = (): Promise<Task[]> =>
  new Promise((resolve) => setTimeout(() => resolve([...tasks]), 500));

export const addTask = (text: string): Promise<Task> =>
  new Promise((resolve) => {
    const newTask = { id: crypto.randomUUID(), text, completed: false };
    tasks.push(newTask);
    resolve(newTask);
  });

export const toggleTask = (id: string): Promise<Task> =>
  new Promise((resolve) => {
    const task = tasks.find((t) => t.id === id);
    if (task) task.completed = !task.completed;
    resolve({ ...task! });
  });

export const removeTask = (id: string): Promise<Task[]> =>
  new Promise((resolve) => {
    tasks = tasks.filter((task) => task.id !== id);
    resolve([...tasks]);
  });
