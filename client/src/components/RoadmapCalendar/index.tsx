import React, { useState } from 'react';
import S from '@/components/RoadmapCalendar/style';
import { getRangeFromDate, getYMD, isSameDay, makeDayRow } from '@/lib/utils/date';
import RoadmapBars from '@/components/RoadmapBars';

const WEEK_OFFSET = 14;

const RoadmapCalendar = () => {
  const [date, setDate] = useState(new Date());
  const today = new Date();
  const isToday = isSameDay(today, date);
  const dayRow = makeDayRow(date);
  const dateRange = getRangeFromDate(date);

  const moveCalendar = (isNext: boolean) => {
    const { year, month, day } = getYMD(date);
    const newDate = new Date(year, month, day + WEEK_OFFSET * (isNext ? 1 : -1));
    setDate(newDate);
  };

  return (
    <S.RoadmapCalendar>
      <S.CalendarHead>
        <S.MonthLabel>{date.getMonth() + 1}월</S.MonthLabel>
        <S.ButtonWrapper>
          <S.CalendarButton onClick={() => moveCalendar(false)}>&lt;</S.CalendarButton>
          <S.CalendarButton onClick={() => moveCalendar(true)}>&gt;</S.CalendarButton>
        </S.ButtonWrapper>
      </S.CalendarHead>
      <S.DaysWrapper>
        {dayRow.map((day: number, i) => (
          <S.DayLabel key={day}>
            {i === Math.floor(WEEK_OFFSET / 2) && isToday ? (
              <S.DayLabelToday>{day}</S.DayLabelToday>
            ) : (
              day
            )}
          </S.DayLabel>
        ))}
      </S.DaysWrapper>
      <RoadmapBars rangeFrom={dateRange.from} rangeTo={dateRange.to} />
      <S.DayColumnWrapper>
        {dayRow.map((day: number) => (
          <S.DayColumn
            key={day}
            highlightColumn={Math.floor(WEEK_OFFSET / 2 + 1)}
            isToday={isToday}
          />
        ))}
      </S.DayColumnWrapper>
    </S.RoadmapCalendar>
  );
};

export default RoadmapCalendar;
