// src/mocks/mockTasks.ts
import type { Task } from "../types";

export const mockTasks: Task[] = [
  { id: "1", text: "Fix the bug", completed: false },
  { id: "2", text: "Deploy to staging", completed: true },
];
