import { useEffect, useState, useCallback } from "react";
import { fetchTasks as fetchTasksAPI } from "../lib/fakeApi";
import type { Task } from "../types";

export const useTaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(() => {
    setLoading(true);
    fetchTasksAPI()
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load tasks");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { tasks, setTasks, loading, error, refetch: fetch };
};
