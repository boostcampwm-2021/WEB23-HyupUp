import React, { useState } from 'react';
import S from '@/components/RoadmapCalendar/style';
import { getYMD, makeDayRow } from '@/lib/utils/date';
import RoadmapItem from '@/components/RoadmapItem';

const WEEK_OFFSET = 14;

const RoadmapCalendar = () => {
  const [date, setDate] = useState(new Date());
  const dayRow = makeDayRow(date);

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
            {i === Math.floor(WEEK_OFFSET / 2) ? (
              <S.DayLabelToday key={day}>{day}</S.DayLabelToday>
            ) : (
              day
            )}
          </S.DayLabel>
        ))}
      </S.DaysWrapper>
      <S.DayColumnWrapper>
        {dayRow.map((day: number) => (
          <S.DayColumn key={day} />
        ))}
      </S.DayColumnWrapper>
      <RoadmapItem />
    </S.RoadmapCalendar>
  );
};

export default RoadmapCalendar;
