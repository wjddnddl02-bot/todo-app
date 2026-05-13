import { useState, useEffect } from 'react';
import type { Todo, Priority } from '../types';
import { PRIORITY_LABELS, PRIORITY_COLORS } from '../types';

interface Props {
  todo: Todo;
  onSave: (updates: Partial<Pick<Todo, 'text' | 'memo' | 'priority'>>) => void;
  onClose: () => void;
}

const PRIORITIES: Priority[] = ['high', 'medium', 'low'];

export function EditModal({ todo, onSave, onClose }: Props) {
  const [text, setText] = useState(todo.text);
  const [priority, setPriority] = useState<Priority>(todo.priority);
  const [memo, setMemo] = useState(todo.memo);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleSave = () => {
    if (!text.trim()) return;
    onSave({ text: text.trim(), priority, memo: memo.trim() });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet panel */}
      <div className="relative w-full max-w-lg bg-white rounded-t-3xl px-4 pt-3 pb-8 space-y-5 animate-slide-up safe-bottom">
        {/* Handle */}
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto" />

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">할 일 수정</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Text input */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">할 일</label>
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            className="w-full text-base text-gray-800 bg-gray-50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
            autoFocus
          />
        </div>

        {/* Priority */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">우선순위</label>
          <div className="flex gap-2">
            {PRIORITIES.map(p => {
              const colors = PRIORITY_COLORS[p];
              const isSelected = priority === p;
              return (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                    isSelected
                      ? `${colors.bg} ${colors.text} ${colors.border}`
                      : 'bg-gray-50 text-gray-400 border-transparent'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isSelected ? colors.dot : 'bg-gray-300'}`} />
                  {PRIORITY_LABELS[p]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Memo */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            메모 <span className="font-normal normal-case">(선택사항)</span>
          </label>
          <textarea
            value={memo}
            onChange={e => setMemo(e.target.value)}
            placeholder="메모를 입력하세요..."
            rows={3}
            className="w-full text-sm text-gray-600 placeholder-gray-300 bg-gray-50 rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pt-1">
          <button
            onClick={onClose}
            className="flex-1 py-3.5 rounded-2xl text-base font-semibold text-gray-500 bg-gray-100 active:scale-95 transition-transform"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={!text.trim()}
            className="flex-1 py-3.5 rounded-2xl text-base font-semibold text-white bg-blue-500 disabled:opacity-40 active:scale-95 transition-transform"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
