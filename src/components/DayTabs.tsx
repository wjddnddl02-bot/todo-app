import { getDayName, getDateNumber } from '../utils/date';

interface DayStat {
  date: string;
  total: number;
  completed: number;
}

interface Props {
  weekDates: string[];
  weekStats: DayStat[];
  selectedDate: string;
  today: string;
  onSelectDate: (date: string) => void;
}

export function DayTabs({ weekDates, weekStats, selectedDate, today, onSelectDate }: Props) {
  return (
    <div className="flex gap-1 px-3 pt-2 pb-3">
      {weekDates.map(date => {
        const stat = weekStats.find(s => s.date === date) ?? { date, total: 0, completed: 0 };
        const isSelected = date === selectedDate;
        const isToday = date === today;
        const pct = stat.total > 0 ? Math.round((stat.completed / stat.total) * 100) : 0;

        return (
          <button
            key={date}
            onClick={() => onSelectDate(date)}
            className={`flex-1 flex flex-col items-center gap-1 py-2.5 rounded-2xl transition-all active:scale-95 ${
              isSelected
                ? 'bg-blue-500 shadow-md shadow-blue-200'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <span
              className={`text-xs font-medium ${
                isSelected ? 'text-blue-100' : isToday ? 'text-blue-500' : 'text-gray-400'
              }`}
            >
              {getDayName(date)}
            </span>
            <span
              className={`text-base font-bold leading-none ${
                isSelected ? 'text-white' : isToday ? 'text-blue-500' : 'text-gray-800'
              }`}
            >
              {getDateNumber(date)}
            </span>
            {stat.total > 0 ? (
              <div
                className={`w-6 h-1 rounded-full overflow-hidden ${
                  isSelected ? 'bg-blue-400' : 'bg-gray-200'
                }`}
              >
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isSelected ? 'bg-white' : 'bg-blue-500'
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            ) : (
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  isSelected ? 'bg-blue-400' : 'bg-gray-200'
                }`}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
