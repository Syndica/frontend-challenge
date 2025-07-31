import { useCallback } from "react";
import { toggleTask as toggleTaskAPI } from "../lib/fakeApi";
import type { Task } from "../types";

export const useToggleTask = (
  tasks: Task[],
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
) => {
  return useCallback(
    (id: string) => {
      setTasks((currentTasks) =>
        currentTasks.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        )
      );

      setTimeout(() => {
        toggleTaskAPI(id).catch(() => {
          console.error("Toggle failed. Reverting.");
          setTasks((currentTasks) =>
            currentTasks.map((t) =>
              t.id === id ? { ...t, completed: !t.completed } : t
            )
          );
        });
      }, 300);
    },
    [tasks, setTasks]
  );
};
