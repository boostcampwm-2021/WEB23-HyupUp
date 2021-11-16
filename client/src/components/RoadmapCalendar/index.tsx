import React, { useState } from 'react';
import S from '@/components/RoadmapCalendar/style';
import { getYMD } from '@/lib/utils/date';

const WEEK_OFFSET = 14;
const FRONT_HALF = 8;
const REAR_HALF = 7;

const RoadmapCalendar = () => {
  const [date, setDate] = useState(new Date());

  const makeDayRow = (date: Date) => {
    const daysArray = new Array<number>();
    [...Array(FRONT_HALF)]
      .map((_, i) => date.getDate() - i)
      .reverse()
      .forEach((day: number) => daysArray.push(day));
    [...Array(REAR_HALF)]
      .map((_, i) => date.getDate() + i + 1)
      .forEach((day: number) => daysArray.push(day));
    return daysArray;
  };

  const toNext = () => {
    const { year, month, day } = getYMD(date);
    const newDate = new Date(year, month, day + WEEK_OFFSET);
    setDate(newDate);
  };

  const toPrev = () => {
    const { year, month, day } = getYMD(date);
    const newDate = new Date(year, month, day - WEEK_OFFSET);
    setDate(newDate);
  };

  return (
    <S.RoadmapCalendar>
      <S.CalendarHead>
        <S.MonthLabel>{date.getMonth() + 1}월</S.MonthLabel>
        <S.ButtonWrapper>
          <S.CalendarButton onClick={() => toPrev()}>&lt;</S.CalendarButton>
          <S.CalendarButton onClick={() => toNext()}>&gt;</S.CalendarButton>
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
