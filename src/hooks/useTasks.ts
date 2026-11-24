import { useCallback, useEffect, useState } from 'react';
import { Task, TaskFormData } from '../types/task';
import {
  createSampleTasks,
  loadTasksFromStorage,
  saveTasksToStorage,
} from '../utils/storage';

/**
 * Generates a unique task ID using crypto.randomUUID when available.
 */
function generateTaskId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Custom hook encapsulating all task CRUD state and LocalStorage synchronization.
 */
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasksFromStorage());

  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  const addTask = useCallback((formData: TaskFormData): Task => {
    const now = new Date().toISOString();
    const newTask: Task = {
      id: generateTaskId(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      dueDate: formData.dueDate,
      priority: formData.priority,
      category: formData.category,
      completed: false,
      createdAt: now,
      updatedAt: now,
    };

    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  }, []);

  const updateTask = useCallback(
    (taskId: string, formData: TaskFormData): Task | null => {
      let updatedTask: Task | null = null;
      const now = new Date().toISOString();

      setTasks((prev) =>
        prev.map((task) => {
          if (task.id !== taskId) return task;
          updatedTask = {
            ...task,
            title: formData.title.trim(),
            description: formData.description.trim(),
            dueDate: formData.dueDate,
            priority: formData.priority,
            category: formData.category,
            updatedAt: now,
          };
          return updatedTask;
        })
      );

      return updatedTask;
    },
    []
  );

  const toggleTaskCompletion = useCallback((taskId: string): boolean => {
    let nextCompletedState = false;
    const now = new Date().toISOString();

    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;
        nextCompletedState = !task.completed;
        return {
          ...task,
          completed: nextCompletedState,
          updatedAt: now,
        };
      })
    );

    return nextCompletedState;
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }, []);

  const clearCompletedTasks = useCallback((): number => {
    let removedCount = 0;
    setTasks((prev) => {
      const remaining = prev.filter((task) => !task.completed);
      removedCount = prev.length - remaining.length;
      return remaining;
    });
    return removedCount;
  }, []);

  const loadSampleTasks = useCallback(() => {
    setTasks(createSampleTasks());
  }, []);

  return {
    tasks,
    addTask,
    updateTask,
    toggleTaskCompletion,
    deleteTask,
    clearCompletedTasks,
    loadSampleTasks,
  };
}
