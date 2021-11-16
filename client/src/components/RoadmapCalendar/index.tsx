import React, { useState } from 'react';
import S from '@/components/RoadmapCalendar/style';

const RoadmapCalendar = () => {
  const [date, setDate] = useState(new Date());

  const makeDayRow = (date: Date) => {
    const daysArray = new Array<number>();
    [...Array(8)]
      .map((_, i) => date.getDate() - i)
      .reverse()
      .forEach((day: number) => daysArray.push(day));
    [...Array(7)]
      .map((_, i) => date.getDate() + i + 1)
      .forEach((day: number) => daysArray.push(day));
    return daysArray;
  };

  return (
    <S.RoadmapCalendar>
      <S.CalendarHead>
        <S.MonthLabel>{date.getMonth() + 1}월</S.MonthLabel>
        <S.ButtonWrapper>
          <S.CalendarButton>&lt;</S.CalendarButton>
          <S.CalendarButton>&gt;</S.CalendarButton>
        </S.ButtonWrapper>
      </S.CalendarHead>
      <S.DaysWrapper>
        {makeDayRow(date).map((day: number) => (
          <S.DayLabel key={day}>{day + 1}</S.DayLabel>
        ))}
      </S.DaysWrapper>
      <S.DayColumnWrapper>
        {makeDayRow(date).map((day: number) => (
          <S.DayColumn key={day} />
        ))}
      </S.DayColumnWrapper>
    </S.RoadmapCalendar>
  );
};

export default RoadmapCalendar;
