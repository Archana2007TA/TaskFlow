import {
  Briefcase,
  CheckCircle2,
  CheckSquare,
  Clock,
  Flag,
  GraduationCap,
  Layers,
  Tag,
  User,
  X,
} from 'lucide-react';
import {
  TASK_CATEGORIES,
  TASK_PRIORITIES,
  TaskCategory,
  TaskCategoryFilter,
  TaskPriorityFilter,
  TaskStatusFilter,
} from '../types/task';
import { TaskStats } from '../utils/taskHelpers';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  statusFilter: TaskStatusFilter;
  onStatusChange: (status: TaskStatusFilter) => void;
  categoryFilter: TaskCategoryFilter;
  onCategoryChange: (category: TaskCategoryFilter) => void;
  priorityFilter: TaskPriorityFilter;
  onPriorityChange: (priority: TaskPriorityFilter) => void;
  stats: TaskStats;
}

const CATEGORY_ICONS: Record<TaskCategory, typeof User> = {
  Personal: User,
  College: GraduationCap,
  Work: Briefcase,
  Other: Tag,
};

/**
 * Responsive navigation sidebar for desktop and slide-over drawer for mobile/tablet.
 */
export function Sidebar({
  isOpen,
  onClose,
  statusFilter,
  onStatusChange,
  categoryFilter,
  onCategoryChange,
  priorityFilter,
  onPriorityChange,
  stats,
}: SidebarProps) {
  const handleStatusSelect = (status: TaskStatusFilter) => {
    onStatusChange(status);
    onClose();
  };

  const handleCategorySelect = (category: TaskCategoryFilter) => {
    onCategoryChange(category);
    onClose();
  };

  const handlePrioritySelect = (priority: TaskPriorityFilter) => {
    onPriorityChange(priority);
    onClose();
  };

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between bg-white px-4 py-6 dark:bg-slate-900">
      <div className="space-y-8">
        {/* Brand Header */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white shadow-sm">
              <CheckSquare className="h-5 w-5" aria-hidden="true" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap dark:text-white">
              TaskFlow
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 lg:hidden dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Status Views */}
        <nav aria-label="Task views" className="space-y-1.5">
          <p className="px-3 pb-1 text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
            Views
          </p>

          <button
            type="button"
            onClick={() => handleStatusSelect('All')}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-150 whitespace-nowrap ${
              statusFilter === 'All'
                ? 'bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 text-indigo-700 dark:from-blue-500/20 dark:to-purple-500/20 dark:text-indigo-300'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Layers className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>All Tasks</span>
            </span>
            <span className="font-mono text-xs tabular-nums opacity-80">
              {stats.total}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleStatusSelect('Pending')}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-150 whitespace-nowrap ${
              statusFilter === 'Pending'
                ? 'bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 text-indigo-700 dark:from-blue-500/20 dark:to-purple-500/20 dark:text-indigo-300'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Pending</span>
            </span>
            <span className="font-mono text-xs tabular-nums opacity-80">
              {stats.pending}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleStatusSelect('Completed')}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-150 whitespace-nowrap ${
              statusFilter === 'Completed'
                ? 'bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 text-indigo-700 dark:from-blue-500/20 dark:to-purple-500/20 dark:text-indigo-300'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Completed</span>
            </span>
            <span className="font-mono text-xs tabular-nums opacity-80">
              {stats.completed}
            </span>
          </button>
        </nav>

        {/* Categories Navigation */}
        <nav aria-label="Task categories" className="space-y-1.5">
          <p className="px-3 pb-1 text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
            Categories
          </p>

          <button
            type="button"
            onClick={() => handleCategorySelect('All')}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-150 whitespace-nowrap ${
              categoryFilter === 'All'
                ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white'
            }`}
          >
            <span>All Categories</span>
            <span className="font-mono text-xs tabular-nums opacity-75">
              {stats.total}
            </span>
          </button>

          {TASK_CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICONS[category];
            const isActive = categoryFilter === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => handleCategorySelect(category)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-150 whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{category}</span>
                </span>
                <span className="font-mono text-xs tabular-nums opacity-75">
                  {stats.categoryCounts[category]}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Priority Quick Filters */}
        <nav aria-label="Task priorities" className="space-y-1.5">
          <p className="px-3 pb-1 text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
            Priority
          </p>

          <button
            type="button"
            onClick={() => handlePrioritySelect('All')}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-150 whitespace-nowrap ${
              priorityFilter === 'All'
                ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white'
            }`}
          >
            <span>Any Priority</span>
          </button>

          {TASK_PRIORITIES.map((priority) => {
            const isActive = priorityFilter === priority;
            const iconTone =
              priority === 'High'
                ? 'text-rose-600 dark:text-rose-400'
                : priority === 'Medium'
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-blue-600 dark:text-blue-400';

            return (
              <button
                key={priority}
                type="button"
                onClick={() => handlePrioritySelect(priority)}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-150 whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white'
                }`}
              >
                <Flag
                  className={`h-4 w-4 shrink-0 ${iconTone}`}
                  aria-hidden="true"
                />
                <span>{priority} Priority</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer Summary */}
      <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
        <div className="px-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Daily Progress</span>
            <span className="font-mono font-medium tabular-nums text-slate-700 dark:text-slate-200">
              {stats.completionRate}%
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transition-all duration-300"
              style={{ width: `${stats.completionRate}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden w-[264px] shrink-0 border-r border-slate-200/80 lg:block dark:border-slate-800">
        <div className="sticky top-0 h-screen overflow-y-auto">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile & Tablet Slide-Over Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="relative z-10 h-full w-72 max-w-[85vw] border-r border-slate-200 shadow-xl dark:border-slate-800">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
