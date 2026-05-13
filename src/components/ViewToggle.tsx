interface Props {
  viewMode: 'day' | 'week';
  onChangeMode: (mode: 'day' | 'week') => void;
}

export function ViewToggle({ viewMode, onChangeMode }: Props) {
  return (
    <div className="flex bg-gray-200 rounded-2xl p-1 gap-1">
      <button
        onClick={() => onChangeMode('day')}
        className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
          viewMode === 'day' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
        }`}
      >
        일별 보기
      </button>
      <button
        onClick={() => onChangeMode('week')}
        className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
          viewMode === 'week' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
        }`}
      >
        주간 전체
      </button>
    </div>
  );
}
