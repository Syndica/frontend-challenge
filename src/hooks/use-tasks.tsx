import { useState, useEffect, useRef } from 'react';
import { fetchTasks, addTask, toggleTask, removeTask } from '../lib/fakeApi';
import type { Task } from '../types';

const LOCAL_STORAGE_KEY = 'syndica.tasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const taskCountRef = useRef(tasks.length);
  const didInit = useRef(false);

  useEffect(() => {
    try {
      const localData = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY) || 'null'
      );

      if (Array.isArray(localData) && localData.length > 0) {
        setTasks(localData);
        setLoading(false);
        return;
      }
    } catch (e) {
      console.error('Failed to parse localStorage', e);
    }

    fetchTasks()
      .then((data) => {
        setTasks(data);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load tasks');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // skip onMount as it blows out the local storage
    if (!didInit.current) {
      didInit.current = true;
      return;
    }
    taskCountRef.current = tasks.length;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = async (text: string) => {
    const currentTasks = [...tasks];
    const id = crypto.randomUUID();
    const newTask = { id, text, completed: false };
    setTasks([...tasks, newTask]);

    try {
      const taskFromApi = await addTask(text);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, id: taskFromApi.id } : task
        )
      );
    } catch (err) {
      console.error(err);
      setTasks(currentTasks);
    }
  };

  const handleRemove = async (id: string) => {
    const currentTasks = [...tasks];
    setTasks((prevTasks) =>
      [...prevTasks].filter((task: Task) => task.id !== id)
    );

    try {
      await removeTask(id);
    } catch (err) {
      console.error(err);
      setTasks(currentTasks);
    }
  };

  const handleToggle = async (id: string) => {
    const currentTasks = [...tasks];
    setTasks((prevTasks) =>
      [...prevTasks].map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );

    try {
      await toggleTask(id);
    } catch (err) {
      console.error(err);
      setTasks(currentTasks);
    }
  };

  return {
    tasks,
    taskCountRef,
    loading,
    error,
    addTask: handleAdd,
    removeTask: handleRemove,
    toggleTask: handleToggle,
  };
};
