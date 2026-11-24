import {
  AlertCircle,
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar,
  Check,
  Folder,
  MinusCircle,
  Pencil,
  Trash2,
} from 'lucide-react';
import { Task, TaskPriority } from '../types/task';
import { formatDueDateInfo } from '../utils/taskHelpers';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const PRIORITY_STYLES: Record<
  TaskPriority,
  { icon: typeof ArrowUpCircle; textClass: string; label: string }
> = {
  High: {
    icon: ArrowUpCircle,
    textClass: 'text-rose-600 dark:text-rose-400',
    label: 'High Priority',
  },
  Medium: {
    icon: MinusCircle,
    textClass: 'text-amber-600 dark:text-amber-400',
    label: 'Medium Priority',
  },
  Low: {
    icon: ArrowDownCircle,
    textClass: 'text-blue-600 dark:text-blue-400',
    label: 'Low Priority',
  },
};

/**
 * Individual task card with completion toggle, inline metadata, priority indicator,
 * and edit/delete actions.
 */
export function TaskCard({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}: TaskCardProps) {
  const priorityInfo = PRIORITY_STYLES[task.priority];
  const PriorityIcon = priorityInfo.icon;
  const dueInfo = formatDueDateInfo(task.dueDate, task.completed);

  return (
    <article
      className={`group rounded-2xl border p-4 shadow-xs transition-all duration-150 sm:p-5 ${
        task.completed
          ? 'border-slate-200/70 bg-slate-50/70 dark:border-slate-800/80 dark:bg-slate-900/50'
          : 'border-slate-200/90 bg-white hover:border-indigo-300/80 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-700/70'
      }`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Completion Checkbox (40px touch target) */}
        <button
          type="button"
          onClick={() => onToggleComplete(task)}
          aria-label={
            task.completed
              ? `Mark "${task.title}" as pending`
              : `Mark "${task.title}" as completed`
          }
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-indigo-600 dark:hover:bg-slate-800"
        >
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-md border transition-all duration-150 ${
              task.completed
                ? 'border-transparent bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xs'
                : 'border-slate-300 bg-white group-hover:border-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:group-hover:border-indigo-400'
            }`}
          >
            {task.completed && <Check className="h-3.5 w-3.5 stroke-[2.5]" />}
          </span>
        </button>

        {/* Task Details */}
        <div className="min-w-0 flex-1 pt-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3
              className={`font-display text-base font-semibold leading-snug transition-colors ${
                task.completed
                  ? 'text-slate-500 line-through dark:text-slate-400'
                  : 'text-slate-900 dark:text-white'
              }`}
            >
              {task.title}
            </h3>

            {/* Desktop Action Buttons */}
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={() => onEdit(task)}
                aria-label={`Edit "${task.title}"`}
                title="Edit task"
                className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-indigo-50 hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-indigo-600 dark:text-slate-400 dark:hover:bg-indigo-950/60 dark:hover:text-indigo-300"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onDelete(task)}
                aria-label={`Delete "${task.title}"`}
                title="Delete task"
                className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-rose-50 hover:text-rose-700 focus-visible:outline-2 focus-visible:outline-rose-600 dark:text-slate-400 dark:hover:bg-rose-950/60 dark:hover:text-rose-300"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {task.description && (
            <p
              className={`mt-1.5 text-sm leading-relaxed ${
                task.completed
                  ? 'text-slate-400 dark:text-slate-500'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {task.description}
            </p>
          )}

          {/* Clean Unboxed Metadata Row */}
          <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs">
            <span
              className={`inline-flex items-center gap-1.5 font-semibold ${priorityInfo.textClass}`}
            >
              <PriorityIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{priorityInfo.label}</span>
            </span>

            <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">
              ·
            </span>

            <span className="inline-flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-400">
              <Folder className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{task.category}</span>
            </span>

            <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">
              ·
            </span>

            <span
              className={`inline-flex items-center gap-1.5 font-mono tabular-nums ${
                dueInfo.isOverdue
                  ? 'font-semibold text-rose-600 dark:text-rose-400'
                  : dueInfo.isToday
                  ? 'font-semibold text-amber-600 dark:text-amber-400'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {dueInfo.isOverdue ? (
                <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              ) : (
                <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              )}
              <span>{dueInfo.label}</span>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
