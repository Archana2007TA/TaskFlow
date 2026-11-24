import { CheckCircle2, Clock, ListTodo } from 'lucide-react';
import { TaskStats } from '../utils/taskHelpers';

interface StatsOverviewProps {
  stats: TaskStats;
}

/**
 * Displays task summary cards (Total, Pending, Completed) and overall progress bar.
 */
export function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <section aria-label="Task summary" className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Total Tasks Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-shadow duration-150 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Total Tasks
            </span>
            <ListTodo
              className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400"
              aria-hidden="true"
            />
          </div>
          <p className="mt-2 font-display text-3xl font-bold tracking-tight tabular-nums text-slate-900 dark:text-white">
            {stats.total}
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Across all categories
          </p>
        </div>

        {/* Pending Tasks Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-shadow duration-150 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Pending Tasks
            </span>
            <Clock
              className="h-4.5 w-4.5 text-amber-600 dark:text-amber-400"
              aria-hidden="true"
            />
          </div>
          <p className="mt-2 font-display text-3xl font-bold tracking-tight tabular-nums text-slate-900 dark:text-white">
            {stats.pending}
          </p>
          <p className="mt-1 text-xs text-slate-500 tabular-nums dark:text-slate-400">
            {stats.highPriorityPending}{' '}
            {stats.highPriorityPending === 1 ? 'high-priority' : 'high-priority'} remaining
          </p>
        </div>

        {/* Completed Tasks Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-shadow duration-150 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Completed Tasks
            </span>
            <CheckCircle2
              className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400"
              aria-hidden="true"
            />
          </div>
          <p className="mt-2 font-display text-3xl font-bold tracking-tight tabular-nums text-slate-900 dark:text-white">
            {stats.completed}
          </p>
          <p className="mt-1 text-xs text-slate-500 tabular-nums dark:text-slate-400">
            {stats.completionRate}% overall completion
          </p>
        </div>
      </div>

      {/* Completion Progress Bar */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-sm font-semibold text-slate-900 dark:text-white">
              Completion Progress
            </h2>
          </div>
          <p className="font-mono text-xs font-medium tabular-nums text-slate-600 dark:text-slate-300">
            {stats.completed} of {stats.total} tasks completed · {stats.completionRate}%
          </p>
        </div>

        <div
          className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
          role="progressbar"
          aria-valuenow={stats.completionRate}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Task completion progress"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transition-all duration-300 ease-out"
            style={{ width: `${stats.completionRate}%` }}
          />
        </div>
      </div>
    </section>
  );
}
