import { useCallback } from "react";
import { removeTask as removeTaskAPI } from "../lib/fakeApi";
import type { Task } from "../types";

export const useRemoveTask = (
  tasks: Task[],
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
) => {
  return useCallback(
    (id: string) => {
      const prevTasks = [...tasks];
      setTasks((currentTasks) => currentTasks.filter((t) => t.id !== id));
      removeTaskAPI(id).catch(() => {
        console.error("Remove failed. Reverting.");
        setTasks(prevTasks);
      });
    },
    [tasks, setTasks]
  );
};
