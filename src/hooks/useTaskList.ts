import { useEffect, useState, useCallback } from "react";
import { fetchTasks as fetchTasksAPI } from "../lib/fakeApi";
import type { Task } from "../types";

const LOCAL_STORAGE_KEY = "taskList";

export const useTaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(() => {
    setLoading(true);

    // Checks for saved tasks in localStorage...
    // If found set task to localStorage data.
    const local = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (local) {
      setTasks(JSON.parse(local));
      setLoading(false);
    } else {
      // If not found use fetch data from API and set localStorage data.
      fetchTasksAPI()
        .then((data) => {
          setTasks(data);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load tasks");
          setLoading(false);
        });
    }
  }, []);

  // Set new tasks as they're added.
  useEffect(() => {
    if (!loading)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks, loading]);

  // Load initial data.
  useEffect(() => {
    fetch();
  }, [fetch]);

  return { tasks, setTasks, loading, error, refetch: fetch };
};
