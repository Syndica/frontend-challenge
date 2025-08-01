import { useCallback } from "react";
import { addTask as addTaskAPI } from "../lib/fakeApi";
import type { Task } from "../types";

export const useAddTask = (
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
) => {
  return useCallback(
    async (text: string) => {
      const newTask = await addTaskAPI(text);
      setTasks((prev) => [...prev, newTask]);
    },
    [setTasks]
  );
};
