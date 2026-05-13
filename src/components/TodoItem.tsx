import type { Todo } from '../types';
import { PRIORITY_LABELS, PRIORITY_COLORS } from '../types';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onEdit, onDelete }: Props) {
  const colors = PRIORITY_COLORS[todo.priority];

  const handleDelete = () => {
    if (window.confirm('이 할 일을 삭제할까요?')) {
      onDelete(todo.id);
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm overflow-hidden border-l-4 ${colors.leftBar} transition-opacity ${
        todo.completed ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-start p-4 gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          className={`mt-0.5 w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all active:scale-90 ${
            todo.completed
              ? 'bg-blue-500 border-blue-500'
              : 'border-gray-300 hover:border-blue-400'
          }`}
          aria-label={todo.completed ? '완료 취소' : '완료 표시'}
        >
          {todo.completed && (
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p
            className={`text-base font-medium leading-snug ${
              todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
            }`}
          >
            {todo.text}
          </p>
          {todo.memo && (
            <p
              className={`mt-1 text-sm leading-relaxed ${
                todo.completed ? 'line-through text-gray-400' : 'text-gray-500'
              }`}
            >
              {todo.memo}
            </p>
          )}
          <span
            className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
            {PRIORITY_LABELS[todo.priority]}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-0.5 flex-shrink-0 ml-1">
          <button
            onClick={() => onEdit(todo)}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:bg-blue-50 hover:text-blue-500 active:scale-90 transition-all"
            aria-label="수정"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-500 active:scale-90 transition-all"
            aria-label="삭제"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
