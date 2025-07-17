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
    setTimeout(() => resolve(newTask), 1000);
  });

export const toggleTask = (id: string): Promise<Task> =>
  new Promise((resolve) => {
    const index = tasks.findIndex((t) => t.id === id);
    const updatedTask = {
        ...tasks[index],
        completed: !tasks[index].completed,
      };
      tasks[index] = updatedTask;
    setTimeout(() => resolve({ ...updatedTask! }), 1000);
  });

export const removeTask = (id: string): Promise<string> =>
  new Promise((resolve) => {
    tasks = tasks.filter((task) => task.id !== id);
    setTimeout(() => resolve(id), 1000);
  });
