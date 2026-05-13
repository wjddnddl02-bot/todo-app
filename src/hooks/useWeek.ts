import { useState, useMemo } from 'react';
import { toDateString, getWeekDates, getWeekLabel } from '../utils/date';

export function useWeek() {
  const todayStr = toDateString(new Date());
  const [baseDate, setBaseDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(todayStr);

  const weekDates = useMemo(() => getWeekDates(baseDate), [baseDate]);
  const weekLabel = useMemo(() => getWeekLabel(weekDates[0], weekDates[6]), [weekDates]);

  const goToPrevWeek = () => {
    setBaseDate(prev => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 7);
      return d;
    });
    setSelectedDate(prev => {
      const d = new Date(prev + 'T00:00:00');
      d.setDate(d.getDate() - 7);
      return toDateString(d);
    });
  };

  const goToNextWeek = () => {
    setBaseDate(prev => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 7);
      return d;
    });
    setSelectedDate(prev => {
      const d = new Date(prev + 'T00:00:00');
      d.setDate(d.getDate() + 7);
      return toDateString(d);
    });
  };

  return {
    today: todayStr,
    weekDates,
    weekLabel,
    selectedDate,
    setSelectedDate,
    goToPrevWeek,
    goToNextWeek,
  };
}
