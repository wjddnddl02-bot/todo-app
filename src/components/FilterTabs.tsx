import type { FilterType } from '../types';

interface Props {
  filter: FilterType;
  onFilterChange: (f: FilterType) => void;
  stats: { total: number; completed: number; active: number };
}

const TABS: { key: FilterType; label: string; getCount: (s: Props['stats']) => number }[] = [
  { key: 'all', label: '전체', getCount: s => s.total },
  { key: 'active', label: '진행중', getCount: s => s.active },
  { key: 'completed', label: '완료', getCount: s => s.completed },
];

export function FilterTabs({ filter, onFilterChange, stats }: Props) {
  return (
    <div className="flex bg-gray-200 rounded-2xl p-1 gap-1">
      {TABS.map(tab => {
        const active = filter === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onFilterChange(tab.key)}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
              active ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
            }`}
          >
            {tab.label}
            <span
              className={`ml-1.5 text-xs font-bold ${
                active ? 'text-blue-500' : 'text-gray-400'
              }`}
            >
              {tab.getCount(stats)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
