import { useMemo, useState } from 'react';
import { ConfirmModal } from './components/ConfirmModal';
import { EmptyState } from './components/EmptyState';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { StatsOverview } from './components/StatsOverview';
import { TaskCard } from './components/TaskCard';
import { TaskModal } from './components/TaskModal';
import { TaskToolbar } from './components/TaskToolbar';
import { ToastContainer } from './components/ToastContainer';
import { useTasks } from './hooks/useTasks';
import { useTheme } from './hooks/useTheme';
import { useToast } from './hooks/useToast';
import {
  Task,
  TaskCategoryFilter,
  TaskFormData,
  TaskPriorityFilter,
  TaskSortOption,
  TaskStatusFilter,
} from './types/task';
import {
  calculateTaskStats,
  filterAndSortTasks,
} from './utils/taskHelpers';

type ConfirmState =
  | { type: 'delete-single'; task: Task }
  | { type: 'clear-completed'; count: number }
  | null;

export default function App() {
  const {
    tasks,
    addTask,
    updateTask,
    toggleTaskCompletion,
    deleteTask,
    clearCompletedTasks,
    loadSampleTasks,
  } = useTasks();
  const { isDark, toggleTheme } = useTheme();
  const { toasts, showToast, dismissToast } = useToast();

  // Navigation & filter states
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatusFilter>('All');
  const [categoryFilter, setCategoryFilter] =
    useState<TaskCategoryFilter>('All');
  const [priorityFilter, setPriorityFilter] =
    useState<TaskPriorityFilter>('All');
  const [sortBy, setSortBy] = useState<TaskSortOption>('dueDateAsc');

  // Modal states
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [confirmState, setConfirmState] = useState<ConfirmState>(null);

  const stats = useMemo(() => calculateTaskStats(tasks), [tasks]);

  const filteredTasks = useMemo(
    () =>
      filterAndSortTasks(tasks, {
        searchQuery,
        statusFilter,
        categoryFilter,
        priorityFilter,
        sortBy,
      }),
    [tasks, searchQuery, statusFilter, categoryFilter, priorityFilter, sortBy]
  );

  // Separate pending and completed tasks for clear visual organization
  const pendingTasks = useMemo(
    () => filteredTasks.filter((task) => !task.completed),
    [filteredTasks]
  );
  const completedTasks = useMemo(
    () => filteredTasks.filter((task) => task.completed),
    [filteredTasks]
  );

  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleOpenEditModal = (task: Task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleTaskFormSubmit = (formData: TaskFormData) => {
    if (editingTask) {
      updateTask(editingTask.id, formData);
      showToast('Task updated', 'success', formData.title);
    } else {
      addTask(formData);
      showToast('Task added', 'success', formData.title);
    }
    setIsTaskModalOpen(false);
    setEditingTask(null);
  };

  const handleToggleComplete = (task: Task) => {
    const nextCompleted = toggleTaskCompletion(task.id);
    showToast(
      nextCompleted ? 'Task completed' : 'Task marked pending',
      nextCompleted ? 'success' : 'info',
      task.title
    );
  };

  const handleRequestDelete = (task: Task) => {
    setConfirmState({ type: 'delete-single', task });
  };

  const handleRequestClearCompleted = () => {
    if (stats.completed === 0) return;
    setConfirmState({ type: 'clear-completed', count: stats.completed });
  };

  const handleConfirmAction = () => {
    if (!confirmState) return;

    if (confirmState.type === 'delete-single') {
      deleteTask(confirmState.task.id);
      showToast('Task deleted', 'warning', confirmState.task.title);
    } else if (confirmState.type === 'clear-completed') {
      const removed = clearCompletedTasks();
      showToast(
        `Cleared ${removed} completed ${removed === 1 ? 'task' : 'tasks'}`,
        'info'
      );
    }
    setConfirmState(null);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setCategoryFilter('All');
    setPriorityFilter('All');
  };

  const handleLoadSamples = () => {
    loadSampleTasks();
    handleResetFilters();
    showToast('Sample tasks loaded', 'info');
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    statusFilter !== 'All' ||
    categoryFilter !== 'All' ||
    priorityFilter !== 'All';

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
        stats={stats}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onAddTask={handleOpenCreateModal}
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />

        <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
          <StatsOverview stats={stats} />

          <TaskToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            priorityFilter={priorityFilter}
            onPriorityChange={setPriorityFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            completedCount={stats.completed}
            onClearCompleted={handleRequestClearCompleted}
          />

          {/* Active Filter Context Summary */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-slate-500 dark:text-slate-400">
              <span>
                Showing <strong className="font-mono tabular-nums text-slate-800 dark:text-slate-200">{filteredTasks.length}</strong>{' '}
                {filteredTasks.length === 1 ? 'task' : 'tasks'}
                {categoryFilter !== 'All' ? ` in ${categoryFilter}` : ''}
                {priorityFilter !== 'All' ? ` · ${priorityFilter} priority` : ''}
              </span>
              <button
                type="button"
                onClick={handleResetFilters}
                className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Task Lists (Pending & Completed Separated) */}
          {filteredTasks.length === 0 ? (
            <EmptyState
              hasAnyTasks={tasks.length > 0}
              onAddTask={handleOpenCreateModal}
              onResetFilters={handleResetFilters}
              onLoadSamples={handleLoadSamples}
            />
          ) : (
            <div className="space-y-8">
              {/* Pending Tasks Section */}
              {(statusFilter === 'All' || statusFilter === 'Pending') && (
                <section aria-label="Pending tasks" className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <h2 className="font-display text-base font-bold text-slate-900 dark:text-white">
                      Pending Tasks{' '}
                      <span className="ml-1.5 font-mono text-xs font-semibold tabular-nums text-slate-500 dark:text-slate-400">
                        ({pendingTasks.length})
                      </span>
                    </h2>
                  </div>

                  {pendingTasks.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 px-5 py-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-400">
                      All matching tasks are completed.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {pendingTasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onToggleComplete={handleToggleComplete}
                          onEdit={handleOpenEditModal}
                          onDelete={handleRequestDelete}
                        />
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Completed Tasks Section */}
              {(statusFilter === 'All' || statusFilter === 'Completed') &&
                completedTasks.length > 0 && (
                  <section aria-label="Completed tasks" className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                      <h2 className="font-display text-base font-bold text-slate-900 dark:text-white">
                        Completed Tasks{' '}
                        <span className="ml-1.5 font-mono text-xs font-semibold tabular-nums text-slate-500 dark:text-slate-400">
                          ({completedTasks.length})
                        </span>
                      </h2>
                    </div>

                    <div className="space-y-3">
                      {completedTasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onToggleComplete={handleToggleComplete}
                          onEdit={handleOpenEditModal}
                          onDelete={handleRequestDelete}
                        />
                      ))}
                    </div>
                  </section>
                )}
            </div>
          )}
        </main>
      </div>

      {/* Create / Edit Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        editingTask={editingTask}
        onClose={() => {
          setIsTaskModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleTaskFormSubmit}
      />

      {/* Delete / Clear Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmState !== null}
        title={
          confirmState?.type === 'clear-completed'
            ? 'Clear all completed tasks?'
            : 'Delete this task?'
        }
        message={
          confirmState?.type === 'clear-completed'
            ? `This will permanently remove ${confirmState.count} completed ${
                confirmState.count === 1 ? 'task' : 'tasks'
              } from your list.`
            : confirmState?.type === 'delete-single'
            ? `Are you sure you want to delete "${confirmState.task.title}"? This action cannot be undone.`
            : ''
        }
        confirmLabel={
          confirmState?.type === 'clear-completed'
            ? 'Clear Completed'
            : 'Delete Task'
        }
        onConfirm={handleConfirmAction}
        onCancel={() => setConfirmState(null)}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
