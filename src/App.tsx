import { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import { useWeek } from './hooks/useWeek';
import { Header } from './components/Header';
import { WeekNavigation } from './components/WeekNavigation';
import { ViewToggle } from './components/ViewToggle';
import { DayTabs } from './components/DayTabs';
import { FilterTabs } from './components/FilterTabs';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';
import { WeeklyTodoList } from './components/WeeklyTodoList';
import { EditModal } from './components/EditModal';
import { formatDateFull } from './utils/date';
import type { Todo, SortType } from './types';

export default function App() {
  const { today, weekDates, weekLabel, selectedDate, setSelectedDate, goToPrevWeek, goToNextWeek } =
    useWeek();

  const {
    todos,
    filter,
    setFilter,
    sort,
    setSort,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    stats,
    weekStats,
    weekTodos,
    weekTotal,
    weekCompleted,
  } = useTodos({ selectedDate, weekDates });

  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-lg mx-auto">
        <Header
          weekTotal={weekTotal}
          weekCompleted={weekCompleted}
          dayTotal={stats.total}
          dayCompleted={stats.completed}
          isToday={selectedDate === today}
        />

        <div className="bg-white shadow-sm pb-1">
          <WeekNavigation
            weekLabel={weekLabel}
            onPrevWeek={goToPrevWeek}
            onNextWeek={goToNextWeek}
          />

          <div className="px-3 pb-1">
            <ViewToggle viewMode={viewMode} onChangeMode={setViewMode} />
          </div>

          {viewMode === 'day' && (
            <DayTabs
              weekDates={weekDates}
              weekStats={weekStats}
              selectedDate={selectedDate}
              today={today}
              onSelectDate={setSelectedDate}
            />
          )}
        </div>

        <div className="px-4 pt-4 pb-12 space-y-3">
          {viewMode === 'day' ? (
            <>
              <div className="flex items-center gap-2">
                <p className="text-base font-bold text-gray-800">
                  {formatDateFull(selectedDate)}
                </p>
                {selectedDate === today && (
                  <span className="text-xs font-semibold text-white bg-blue-500 px-2 py-0.5 rounded-full">
                    오늘
                  </span>
                )}
              </div>

              <FilterTabs filter={filter} onFilterChange={setFilter} stats={stats} />

              <AddTodoForm onAdd={addTodo} />

              <div className="flex items-center justify-between px-1">
                <p className="text-sm text-gray-400">
                  {todos.length > 0 ? `${todos.length}개 항목` : ''}
                </p>
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value as SortType)}
                  className="text-sm text-gray-500 bg-transparent outline-none cursor-pointer font-medium"
                >
                  <option value="createdAt">최신순</option>
                  <option value="priority">우선순위순</option>
                </select>
              </div>

              <TodoList
                todos={todos}
                onToggle={toggleTodo}
                onEdit={setEditingTodo}
                onDelete={deleteTodo}
              />
            </>
          ) : (
            <>
              <div className="flex items-center justify-between px-1">
                <p className="text-base font-bold text-gray-800">이번 주 전체 할 일</p>
                <p className="text-sm text-gray-400">
                  {weekTodos.length > 0 ? `${weekTodos.length}개` : ''}
                </p>
              </div>

              <WeeklyTodoList
                todos={weekTodos}
                onToggle={toggleTodo}
                onEdit={setEditingTodo}
                onDelete={deleteTodo}
              />
            </>
          )}
        </div>
      </div>

      {editingTodo && (
        <EditModal
          todo={editingTodo}
          onSave={updates => {
            updateTodo(editingTodo.id, updates);
            setEditingTodo(null);
          }}
          onClose={() => setEditingTodo(null)}
        />
      )}
    </div>
  );
}
