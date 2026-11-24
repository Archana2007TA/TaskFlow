import { Task } from '../types/task';

const TASKS_STORAGE_KEY = 'taskflow_tasks_v1';
const INITIALIZED_STORAGE_KEY = 'taskflow_initialized_v1';
const THEME_STORAGE_KEY = 'taskflow_theme_v1';

export type ThemeMode = 'light' | 'dark';

/**
 * Generates a YYYY-MM-DD string offset by a number of days from today.
 */
function getRelativeDateString(offsetDays: number): string {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Provides clean starter tasks for first-time visitors so the dashboard
 * demonstrates priorities, categories, and completion progress right away.
 */
export function createSampleTasks(): Task[] {
  const now = new Date().toISOString();
  return [
    {
      id: 'sample-1',
      title: 'Finalize Q4 product roadmap presentation',
      description:
        'Review engineering milestones, update delivery dates, and share slide deck with stakeholders.',
      dueDate: getRelativeDateString(1),
      priority: 'High',
      category: 'Work',
      completed: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'sample-2',
      title: 'Submit algorithms assignment #4',
      description:
        'Complete dynamic programming exercises and push solution repository before midnight.',
      dueDate: getRelativeDateString(0),
      priority: 'High',
      category: 'College',
      completed: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'sample-3',
      title: 'Plan weekend grocery and meal prep list',
      description:
        'Stock up on fresh vegetables, coffee beans, and ingredients for three quick lunches.',
      dueDate: getRelativeDateString(3),
      priority: 'Medium',
      category: 'Personal',
      completed: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'sample-4',
      title: 'Renew annual cloud domain registration',
      description:
        'Verify billing details and enable auto-renewal for personal portfolio domain.',
      dueDate: getRelativeDateString(-1),
      priority: 'Low',
      category: 'Other',
      completed: true,
      createdAt: now,
      updatedAt: now,
    },
  ];
}

/**
 * Loads tasks safely from LocalStorage. Seeds sample tasks only on first launch.
 */
export function loadTasksFromStorage(): Task[] {
  try {
    const rawTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    const isInitialized = localStorage.getItem(INITIALIZED_STORAGE_KEY) === 'true';

    if (rawTasks) {
      const parsed = JSON.parse(rawTasks);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }

    if (!isInitialized) {
      const sampleTasks = createSampleTasks();
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(sampleTasks));
      localStorage.setItem(INITIALIZED_STORAGE_KEY, 'true');
      return sampleTasks;
    }

    return [];
  } catch {
    return [];
  }
}

/**
 * Persists the current task list to LocalStorage.
 */
export function saveTasksToStorage(tasks: Task[]): void {
  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    localStorage.setItem(INITIALIZED_STORAGE_KEY, 'true');
  } catch {
    // Gracefully ignore storage quota or private browsing write errors
  }
}

/**
 * Reads the persisted theme or falls back to system preference.
 */
export function loadThemeFromStorage(): ThemeMode {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return 'dark';
    }
  } catch {
    // Default to light if LocalStorage is unavailable
  }
  return 'light';
}

/**
 * Persists the selected theme to LocalStorage.
 */
export function saveThemeToStorage(theme: ThemeMode): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Ignore storage errors
  }
}
