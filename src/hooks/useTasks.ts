import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { fetchAllTasks, addNewTask, toggleTaskStatus, deleteTask } from "../features/tasks/taskSlice";
import { useEffect, useCallback } from "react";

export function useTasks() {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.items);
  const loading = useSelector((state: RootState) => state.tasks.loading);
  const error = useSelector((state: RootState) => state.tasks.error);

    const add = useCallback((text: string) => dispatch(addNewTask(text)), [dispatch]);
  const toggle = useCallback((id: string) => dispatch(toggleTaskStatus(id)), [dispatch]);
  const remove = useCallback((id: string) => dispatch(deleteTask(id)), [dispatch]);

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(fetchAllTasks());
    }
  }, [dispatch, tasks.length]);

  return { tasks, loading, error, add, toggle, remove };
}