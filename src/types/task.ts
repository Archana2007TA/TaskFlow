export type TaskPriority = 'Low' | 'Medium' | 'High';

export type TaskCategory = 'Personal' | 'College' | 'Work' | 'Other';

export type TaskStatusFilter = 'All' | 'Pending' | 'Completed';

export type TaskPriorityFilter = 'All' | TaskPriority;

export type TaskCategoryFilter = 'All' | TaskCategory;

export type TaskSortOption =
  | 'dueDateAsc'
  | 'dueDateDesc'
  | 'priorityDesc'
  | 'priorityAsc'
  | 'newest';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string; // Stored as YYYY-MM-DD or empty string if unset
  priority: TaskPriority;
  category: TaskCategory;
  completed: boolean;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

export interface TaskFormData {
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  category: TaskCategory;
}

export type ToastVariant = 'success' | 'info' | 'warning' | 'error';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}

export const TASK_PRIORITIES: TaskPriority[] = ['High', 'Medium', 'Low'];

export const TASK_CATEGORIES: TaskCategory[] = [
  'Personal',
  'College',
  'Work',
  'Other',
];
