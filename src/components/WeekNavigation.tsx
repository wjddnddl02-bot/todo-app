interface Props {
  weekLabel: string;
  onPrevWeek: () => void;
  onNextWeek: () => void;
}

export function WeekNavigation({ weekLabel, onPrevWeek, onNextWeek }: Props) {
  return (
    <div className="flex items-center justify-between px-3 pt-3">
      <button
        onClick={onPrevWeek}
        className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:bg-gray-100 active:scale-90 transition-all"
        aria-label="이전 주"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <p className="text-sm font-semibold text-gray-700">{weekLabel}</p>
      <button
        onClick={onNextWeek}
        className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:bg-gray-100 active:scale-90 transition-all"
        aria-label="다음 주"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
