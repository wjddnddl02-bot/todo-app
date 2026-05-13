import type { Todo, Priority } from '../types';
import { PRIORITY_LABELS, PRIORITY_COLORS } from '../types';
import { getDayName, getDateNumber } from '../utils/date';

interface Props {
  todos: Todo[];
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

const PRIORITIES: Priority[] = ['high', 'medium', 'low'];

function DayBadge({ date }: { date: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-lg flex-shrink-0">
      {getDayName(date)}
      <span className="text-gray-400">{getDateNumber(date)}</span>
    </span>
  );
}

export function WeeklyTodoList({ todos, onToggle, onEdit, onDelete }: Props) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <div className="text-6xl mb-4">📅</div>
        <p className="text-base font-medium">이번 주 할 일이 없습니다</p>
        <p className="text-sm mt-1 text-gray-300">일별 보기에서 할 일을 추가해보세요!</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {PRIORITIES.map(priority => {
        const group = todos
          .filter(t => t.priority === priority)
          .sort((a, b) => a.date.localeCompare(b.date) || b.createdAt - a.createdAt);
        if (group.length === 0) return null;

        const colors = PRIORITY_COLORS[priority];
        const completed = group.filter(t => t.completed).length;
        const pct = Math.round((completed / group.length) * 100);

        return (
          <div key={priority}>
            {/* Priority section header */}
            <div className="flex items-center gap-2 mb-2 px-1">
              <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${colors.dot}`} />
              <span className={`text-sm font-bold ${colors.text}`}>
                {PRIORITY_LABELS[priority]}
              </span>
              <span className="text-xs text-gray-400 ml-auto">
                {completed}/{group.length}개 완료
              </span>
              <span className={`text-xs font-bold ${colors.text}`}>{pct}%</span>
            </div>

            {/* Priority progress bar */}
            <div className={`h-1.5 ${colors.bg} rounded-full overflow-hidden mb-3 mx-1`}>
              <div
                className={`h-full ${colors.dot} rounded-full transition-all duration-500`}
                style={{ width: `${pct}%` }}
              />
            </div>

            <div className="space-y-2">
              {group.map(todo => {
                const c = PRIORITY_COLORS[todo.priority];
                return (
                  <div
                    key={todo.id}
                    className={`bg-white rounded-2xl shadow-sm overflow-hidden border-l-4 ${c.leftBar} transition-opacity ${
                      todo.completed ? 'opacity-60' : ''
                    }`}
                  >
                    <div className="flex items-start p-3.5 gap-3">
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
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <DayBadge date={todo.date} />
                          <p
                            className={`text-sm font-medium leading-snug ${
                              todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
                            }`}
                          >
                            {todo.text}
                          </p>
                        </div>
                        {todo.memo && (
                          <p
                            className={`mt-1 text-xs leading-relaxed ${
                              todo.completed ? 'line-through text-gray-400' : 'text-gray-500'
                            }`}
                          >
                            {todo.memo}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-0.5 flex-shrink-0">
                        <button
                          onClick={() => onEdit(todo)}
                          className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:bg-blue-50 hover:text-blue-500 active:scale-90 transition-all"
                          aria-label="수정"
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('이 할 일을 삭제할까요?')) onDelete(todo.id);
                          }}
                          className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-500 active:scale-90 transition-all"
                          aria-label="삭제"
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
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
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
