import { useState, useEffect, useCallback } from 'react';
import type { Todo, Priority, FilterType, SortType } from '../types';
import { toDateString } from '../utils/date';

const STORAGE_KEY = 'todos-v2';
const PRIORITY_ORDER: Record<Priority, number> = { high: 0, medium: 1, low: 2 };

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function migrate(raw: unknown[]): Todo[] {
  return (raw as Partial<Todo>[]).map(t => ({
    id: t.id ?? generateId(),
    text: t.text ?? '',
    memo: t.memo ?? '',
    priority: (t.priority as Priority) ?? 'medium',
    completed: t.completed ?? false,
    createdAt: t.createdAt ?? Date.now(),
    date: t.date ?? toDateString(new Date(t.createdAt ?? Date.now())),
  }));
}

function loadFromStorage(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return migrate(JSON.parse(raw) as unknown[]);
    // Migrate from old key
    const old = localStorage.getItem('todos-v1');
    if (old) return migrate(JSON.parse(old) as unknown[]);
    return [];
  } catch {
    return [];
  }
}

interface UseTodosOptions {
  selectedDate: string;
  weekDates: string[];
}

export function useTodos({ selectedDate, weekDates }: UseTodosOptions) {
  const [todos, setTodos] = useState<Todo[]>(loadFromStorage);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('createdAt');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback(
    (text: string, priority: Priority, memo: string) => {
      if (!text.trim()) return;
      setTodos(prev => [
        {
          id: generateId(),
          text: text.trim(),
          memo: memo.trim(),
          priority,
          completed: false,
          createdAt: Date.now(),
          date: selectedDate,
        },
        ...prev,
      ]);
    },
    [selectedDate]
  );

  const updateTodo = useCallback(
    (id: string, updates: Partial<Pick<Todo, 'text' | 'memo' | 'priority' | 'completed'>>) => {
      setTodos(prev => prev.map(t => (t.id === id ? { ...t, ...updates } : t)));
    },
    []
  );

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }, []);

  const dayTodos = todos.filter(t => t.date === selectedDate);

  const filtered = dayTodos
    .filter(t => {
      if (filter === 'active') return !t.completed;
      if (filter === 'completed') return t.completed;
      return true;
    })
    .sort((a, b) => {
      if (sort === 'priority') {
        const diff = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
        if (diff !== 0) return diff;
      }
      return b.createdAt - a.createdAt;
    });

  const stats = {
    total: dayTodos.length,
    completed: dayTodos.filter(t => t.completed).length,
    active: dayTodos.filter(t => !t.completed).length,
  };

  const weekStats = weekDates.map(date => {
    const dateTodos = todos.filter(t => t.date === date);
    return {
      date,
      total: dateTodos.length,
      completed: dateTodos.filter(t => t.completed).length,
    };
  });

  const weekTodos = todos.filter(t => weekDates.includes(t.date));
  const weekTotal = weekStats.reduce((sum, d) => sum + d.total, 0);
  const weekCompleted = weekStats.reduce((sum, d) => sum + d.completed, 0);

  return {
    todos: filtered,
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
  };
}
