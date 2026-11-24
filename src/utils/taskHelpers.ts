import {
  Task,
  TaskCategory,
  TaskCategoryFilter,
  TaskPriority,
  TaskPriorityFilter,
  TaskSortOption,
  TaskStatusFilter,
} from '../types/task';

const PRIORITY_WEIGHT: Record<TaskPriority, number> = {
  High: 3,
  Medium: 2,
  Low: 1,
};

export interface TaskFilterParams {
  searchQuery: string;
  statusFilter: TaskStatusFilter;
  categoryFilter: TaskCategoryFilter;
  priorityFilter: TaskPriorityFilter;
  sortBy: TaskSortOption;
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  completionRate: number;
  highPriorityPending: number;
  categoryCounts: Record<TaskCategory, number>;
}

/**
 * Filters and sorts tasks according to search query, status, category, priority, and sort order.
 */
export function filterAndSortTasks(
  tasks: Task[],
  {
    searchQuery,
    statusFilter,
    categoryFilter,
    priorityFilter,
    sortBy,
  }: TaskFilterParams
): Task[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filtered = tasks.filter((task) => {
    if (statusFilter === 'Pending' && task.completed) return false;
    if (statusFilter === 'Completed' && !task.completed) return false;

    if (categoryFilter !== 'All' && task.category !== categoryFilter) {
      return false;
    }

    if (priorityFilter !== 'All' && task.priority !== priorityFilter) {
      return false;
    }

    if (normalizedQuery) {
      const matchesTitle = task.title.toLowerCase().includes(normalizedQuery);
      const matchesDescription = task.description
        .toLowerCase()
        .includes(normalizedQuery);
      const matchesCategory = task.category
        .toLowerCase()
        .includes(normalizedQuery);
      if (!matchesTitle && !matchesDescription && !matchesCategory) {
        return false;
      }
    }

    return true;
  });

  return [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'dueDateAsc': {
        if (!a.dueDate && !b.dueDate) return b.createdAt.localeCompare(a.createdAt);
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      }
      case 'dueDateDesc': {
        if (!a.dueDate && !b.dueDate) return b.createdAt.localeCompare(a.createdAt);
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return b.dueDate.localeCompare(a.dueDate);
      }
      case 'priorityDesc': {
        const diff = PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority];
        if (diff !== 0) return diff;
        return (a.dueDate || '9999-12-31').localeCompare(
          b.dueDate || '9999-12-31'
        );
      }
      case 'priorityAsc': {
        const diff = PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority];
        if (diff !== 0) return diff;
        return (a.dueDate || '9999-12-31').localeCompare(
          b.dueDate || '9999-12-31'
        );
      }
      case 'newest':
      default:
        return b.createdAt.localeCompare(a.createdAt);
    }
  });
}

/**
 * Computes summary counts and completion percentage for the dashboard.
 */
export function calculateTaskStats(tasks: Task[]): TaskStats {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  const highPriorityPending = tasks.filter(
    (t) => !t.completed && t.priority === 'High'
  ).length;

  const categoryCounts: Record<TaskCategory, number> = {
    Personal: 0,
    College: 0,
    Work: 0,
    Other: 0,
  };

  for (const task of tasks) {
    categoryCounts[task.category] = (categoryCounts[task.category] || 0) + 1;
  }

  return {
    total,
    completed,
    pending,
    completionRate,
    highPriorityPending,
    categoryCounts,
  };
}

/**
 * Returns today's local date in YYYY-MM-DD format.
 */
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export interface DueDateInfo {
  label: string;
  isOverdue: boolean;
  isToday: boolean;
}

/**
 * Formats a YYYY-MM-DD due date into a human-friendly label and deadline state.
 */
export function formatDueDateInfo(
  dueDate: string,
  completed: boolean
): DueDateInfo {
  if (!dueDate) {
    return {
      label: 'No due date',
      isOverdue: false,
      isToday: false,
    };
  }

  const todayStr = getTodayDateString();
  const [year, month, day] = dueDate.split('-').map(Number);

  if (!year || !month || !day) {
    return {
      label: dueDate,
      isOverdue: false,
      isToday: false,
    };
  }

  const parsedDate = new Date(year, month - 1, day);
  const formatted = parsedDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  if (dueDate === todayStr) {
    return {
      label: `Due Today (${formatted})`,
      isOverdue: false,
      isToday: !completed,
    };
  }

  const isOverdue = !completed && dueDate < todayStr;
  return {
    label: isOverdue ? `Overdue · ${formatted}` : `Due ${formatted}`,
    isOverdue,
    isToday: false,
  };
}
