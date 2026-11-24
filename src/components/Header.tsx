import { Menu, Moon, Plus, Sun } from 'lucide-react';

interface HeaderProps {
  onOpenSidebar: () => void;
  onAddTask: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

/**
 * Workspace top bar with welcome heading, theme toggle, and Add Task primary action.
 */
export function Header({
  onOpenSidebar,
  onAddTask,
  isDark,
  onToggleTheme,
}: HeaderProps) {
  const formattedToday = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 px-4 py-3.5 backdrop-blur-md sm:px-6 lg:px-8 dark:border-slate-800 dark:bg-slate-900/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onOpenSidebar}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 lg:hidden dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="min-w-0">
            <h1 className="font-display truncate text-lg font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
              Welcome back to TaskFlow
            </h1>
            <p className="hidden truncate text-xs text-slate-500 sm:block dark:text-slate-400">
              {formattedToday}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors duration-150 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <Sun className="h-4.5 w-4.5 text-amber-400" />
            ) : (
              <Moon className="h-4.5 w-4.5 text-indigo-600" />
            )}
          </button>

          <button
            type="button"
            onClick={onAddTask}
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-[0.98] whitespace-nowrap"
          >
            <Plus className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Add Task</span>
          </button>
        </div>
      </div>
    </header>
  );
}
