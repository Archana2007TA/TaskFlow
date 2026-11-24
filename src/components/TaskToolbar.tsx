import { ArrowUpDown, Filter, Search, Trash2, X } from 'lucide-react';
import {
  TASK_PRIORITIES,
  TaskPriorityFilter,
  TaskSortOption,
  TaskStatusFilter,
} from '../types/task';

interface TaskToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: TaskStatusFilter;
  onStatusChange: (status: TaskStatusFilter) => void;
  priorityFilter: TaskPriorityFilter;
  onPriorityChange: (priority: TaskPriorityFilter) => void;
  sortBy: TaskSortOption;
  onSortChange: (sort: TaskSortOption) => void;
  completedCount: number;
  onClearCompleted: () => void;
}

const STATUS_TABS: TaskStatusFilter[] = ['All', 'Pending', 'Completed'];

/**
 * Search, filter, sorting, and bulk completed-task cleanup toolbar.
 */
export function TaskToolbar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  sortBy,
  onSortChange,
  completedCount,
  onClearCompleted,
}: TaskToolbarProps) {
  return (
    <section
      aria-label="Search and filter tasks"
      className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks by title, description, or category..."
            aria-label="Search tasks"
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pr-9 pl-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:bg-slate-800"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute top-1/2 right-2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200/70 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-200"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Status Segmented Tabs */}
        <div
          role="tablist"
          aria-label="Filter by completion status"
          className="flex shrink-0 items-center gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800"
        >
          {STATUS_TABS.map((tab) => {
            const isActive = statusFilter === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onStatusChange(tab)}
                className={`h-8 rounded-lg px-3.5 text-xs font-semibold transition-all duration-150 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-white text-indigo-700 shadow-xs dark:bg-slate-700 dark:text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Row: Priority Filter, Sort Order, Clear Completed */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Priority Select */}
          <div className="relative flex items-center">
            <Filter
              className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-slate-400"
              aria-hidden="true"
            />
            <select
              value={priorityFilter}
              onChange={(e) =>
                onPriorityChange(e.target.value as TaskPriorityFilter)
              }
              aria-label="Filter by priority"
              className="h-9 rounded-xl border border-slate-200 bg-white pr-8 pl-8 text-xs font-medium text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value="All">All Priorities</option>
              {TASK_PRIORITIES.map((priority) => (
                <option key={priority} value={priority}>
                  {priority} Priority
                </option>
              ))}
            </select>
          </div>

          {/* Sort Select */}
          <div className="relative flex items-center">
            <ArrowUpDown
              className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-slate-400"
              aria-hidden="true"
            />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as TaskSortOption)}
              aria-label="Sort tasks"
              className="h-9 rounded-xl border border-slate-200 bg-white pr-8 pl-8 text-xs font-medium text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value="dueDateAsc">Sort: Due Date (Earliest)</option>
              <option value="dueDateDesc">Sort: Due Date (Latest)</option>
              <option value="priorityDesc">Sort: Priority (High to Low)</option>
              <option value="priorityAsc">Sort: Priority (Low to High)</option>
              <option value="newest">Sort: Newest Created</option>
            </select>
          </div>
        </div>

        {completedCount > 0 && (
          <button
            type="button"
            onClick={onClearCompleted}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50/70 px-3 text-xs font-semibold text-rose-700 transition-colors hover:bg-rose-100 whitespace-nowrap dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:bg-rose-900/50"
          >
            <Trash2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>Clear Completed ({completedCount})</span>
          </button>
        )}
      </div>
    </section>
  );
}
