const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];

export function toDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getWeekDates(baseDate: Date): string[] {
  const day = baseDate.getDay();
  const monday = new Date(baseDate);
  monday.setDate(baseDate.getDate() - (day === 0 ? 6 : day - 1));
  monday.setHours(0, 0, 0, 0);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return toDateString(d);
  });
}

export function getDayName(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return DAY_NAMES[date.getDay()];
}

export function getDateNumber(dateStr: string): number {
  return parseInt(dateStr.split('-')[2], 10);
}

export function getWeekLabel(startDate: string, endDate: string): string {
  const start = new Date(startDate + 'T00:00:00');
  const end = new Date(endDate + 'T00:00:00');
  const startMonth = start.getMonth() + 1;
  const endMonth = end.getMonth() + 1;
  const startYear = start.getFullYear();
  const endYear = end.getFullYear();

  if (startYear !== endYear) {
    return `${startYear}년 ${startMonth}월 ${start.getDate()}일 - ${endYear}년 ${endMonth}월 ${end.getDate()}일`;
  }
  if (startMonth !== endMonth) {
    return `${startYear}년 ${startMonth}월 ${start.getDate()}일 - ${endMonth}월 ${end.getDate()}일`;
  }
  return `${startYear}년 ${startMonth}월 ${start.getDate()}일 - ${end.getDate()}일`;
}

export function formatDateFull(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayName = DAY_NAMES[date.getDay()];
  return `${month}월 ${day}일 ${dayName}요일`;
}
