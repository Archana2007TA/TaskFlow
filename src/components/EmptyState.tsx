import { useState } from 'react';
import { ClipboardCheck, Plus, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  hasAnyTasks: boolean;
  onAddTask: () => void;
  onResetFilters: () => void;
  onLoadSamples: () => void;
}

/**
 * Empty state illustration and recovery actions when no tasks exist or match filters.
 */
export function EmptyState({
  hasAnyTasks,
  onAddTask,
  onResetFilters,
  onLoadSamples,
}: EmptyStateProps) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white px-6 py-12 text-center shadow-xs dark:border-slate-800 dark:bg-slate-900">
      <div className="aspect-[4/3] w-full max-w-[260px] overflow-hidden rounded-2xl border border-slate-200/70 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/60">
        {!imgFailed ? (
          <img
            src="/src/assets/images/empty_tasks_illustration_1795506728939.jpg"
            alt="Minimalist desk illustration showing an empty checklist and pen"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-indigo-600 dark:from-slate-800 dark:to-slate-900 dark:text-indigo-400">
            <ClipboardCheck className="h-12 w-12 stroke-[1.5]" />
            <span className="text-xs font-medium">Ready for your tasks</span>
          </div>
        )}
      </div>

      <h3 className="mt-6 font-display text-lg font-bold text-slate-900 dark:text-white">
        {hasAnyTasks ? 'No matching tasks found' : 'Your task list is clear'}
      </h3>

      <p className="mt-1.5 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        {hasAnyTasks
          ? 'Try clearing your search query or adjusting the active status, category, or priority filters.'
          : 'Stay organized by adding your first task with a priority, category, and due date.'}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {hasAnyTasks ? (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            <span>Reset Filters</span>
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={onAddTask}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-5 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:brightness-110"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              <span>Add Your First Task</span>
            </button>
            <button
              type="button"
              onClick={onLoadSamples}
              className="inline-flex h-10 items-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              Load Sample Tasks
            </button>
          </>
        )}
      </div>
    </div>
  );
}
