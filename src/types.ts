export type Priority = 'high' | 'medium' | 'low';
export type FilterType = 'all' | 'active' | 'completed';
export type SortType = 'createdAt' | 'priority';

export interface Todo {
  id: string;
  text: string;
  memo: string;
  priority: Priority;
  completed: boolean;
  createdAt: number;
  date: string; // YYYY-MM-DD
}

export const PRIORITY_LABELS: Record<Priority, string> = {
  high: '높음',
  medium: '중간',
  low: '낮음',
};

export const PRIORITY_COLORS: Record<
  Priority,
  { bg: string; text: string; border: string; dot: string; leftBar: string }
> = {
  high: {
    bg: 'bg-red-50',
    text: 'text-red-600',
    border: 'border-red-200',
    dot: 'bg-red-500',
    leftBar: 'border-l-red-500',
  },
  medium: {
    bg: 'bg-amber-50',
    text: 'text-amber-600',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
    leftBar: 'border-l-amber-500',
  },
  low: {
    bg: 'bg-green-50',
    text: 'text-green-600',
    border: 'border-green-200',
    dot: 'bg-green-500',
    leftBar: 'border-l-green-500',
  },
};
