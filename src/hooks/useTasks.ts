import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { fetchAllTasks, addNewTask, toggleTaskStatus, deleteTask } from "../features/tasks/taskSlice";
import { useCallback } from "react";

export function useTasks() {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.items);
  console.log(tasks)
  const loading = useSelector((state: RootState) => state.tasks.loading);
  const error = useSelector((state: RootState) => state.tasks.error);

  const fetch = useCallback(() => dispatch(fetchAllTasks()), [dispatch]);
  const add = (text: string) => dispatch(addNewTask(text));
  const toggle = (id: string) => dispatch(toggleTaskStatus(id));
  const remove = (id: string) => dispatch(deleteTask(id));

  return { tasks, loading, error, fetch, add, toggle, remove };
}