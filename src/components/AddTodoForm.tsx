import { useState } from 'react';
import type { Priority } from '../types';
import { PRIORITY_LABELS, PRIORITY_COLORS } from '../types';

interface Props {
  onAdd: (text: string, priority: Priority, memo: string) => void;
}

const PRIORITIES: Priority[] = ['high', 'medium', 'low'];

export function AddTodoForm({ onAdd }: Props) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [memo, setMemo] = useState('');
  const [showMemo, setShowMemo] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority, memo);
    setText('');
    setMemo('');
    setPriority('medium');
    setShowMemo(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-4 space-y-3">
      {/* Text input row */}
      <div className="flex items-center gap-2">
        <svg
          className="w-5 h-5 text-gray-300 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="새 할 일을 입력하세요"
          className="flex-1 text-base text-gray-800 placeholder-gray-300 outline-none"
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="px-4 py-2 bg-blue-500 text-white text-sm font-bold rounded-xl disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all"
        >
          추가
        </button>
      </div>

      {/* Priority selector */}
      <div className="flex items-center gap-2">
        {PRIORITIES.map(p => {
          const colors = PRIORITY_COLORS[p];
          const isSelected = priority === p;
          return (
            <button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                isSelected
                  ? `${colors.bg} ${colors.text} ${colors.border}`
                  : 'bg-gray-50 text-gray-400 border-gray-100'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${isSelected ? colors.dot : 'bg-gray-300'}`}
              />
              {PRIORITY_LABELS[p]}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setShowMemo(v => !v)}
          className={`ml-auto text-xs px-2.5 py-1.5 rounded-lg transition-colors font-medium ${
            showMemo ? 'bg-gray-100 text-gray-600' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          {showMemo ? '메모 접기' : '+ 메모'}
        </button>
      </div>

      {/* Memo textarea */}
      {showMemo && (
        <textarea
          value={memo}
          onChange={e => setMemo(e.target.value)}
          placeholder="메모를 추가하세요... (선택사항)"
          rows={2}
          className="w-full text-sm text-gray-600 placeholder-gray-300 bg-gray-50 rounded-xl px-3 py-2.5 outline-none resize-none"
        />
      )}
    </form>
  );
}
