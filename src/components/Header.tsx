interface Props {
  weekTotal: number;
  weekCompleted: number;
  dayTotal: number;
  dayCompleted: number;
  isToday: boolean;
}

export function Header({ weekTotal, weekCompleted, dayTotal, dayCompleted, isToday }: Props) {
  const weekPct = weekTotal > 0 ? Math.round((weekCompleted / weekTotal) * 100) : 0;
  const dayPct = dayTotal > 0 ? Math.round((dayCompleted / dayTotal) * 100) : 0;

  return (
    <header className="bg-white px-4 pt-12 pb-5 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">할 일 관리</h1>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue-50 rounded-2xl p-3.5">
          <p className="text-xs font-semibold text-blue-400 mb-1">이번 주</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-blue-600">{weekPct}%</span>
            <span className="text-xs text-blue-400">{weekCompleted}/{weekTotal}개</span>
          </div>
          <div className="mt-2 h-1.5 bg-blue-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-700"
              style={{ width: `${weekPct}%` }}
            />
          </div>
        </div>

        <div className="bg-violet-50 rounded-2xl p-3.5">
          <p className="text-xs font-semibold text-violet-400 mb-1">
            {isToday ? '오늘' : '선택한 날'}
          </p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-violet-600">{dayPct}%</span>
            <span className="text-xs text-violet-400">{dayCompleted}/{dayTotal}개</span>
          </div>
          <div className="mt-2 h-1.5 bg-violet-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-violet-500 rounded-full transition-all duration-700"
              style={{ width: `${dayPct}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
