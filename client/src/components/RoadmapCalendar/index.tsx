import React, { useState } from 'react';
import S from '@/components/RoadmapCalendar/style';
import { getRangeFromDate, getYMD, isSameDay, makeDayRow } from '@/lib/utils/date';
import RoadmapBars from '@/components/RoadmapBars';
import arrowIcon from '@public/icons/arrow-right.svg';
import calendar from '@public/icons/calendar-icon.svg';

const WEEK_OFFSET = 14;

const RoadmapCalendar = () => {
  const [date, setDate] = useState(new Date());
  const isToday = isSameDay(new Date(), date);
  const dayRow = makeDayRow(date);
  const dateRange = getRangeFromDate(date);

  const moveCalendar = (isNext: boolean) => {
    const { year, month, day } = getYMD(date);
    const newDate = new Date(year, month, day + WEEK_OFFSET * (isNext ? 1 : -1));
    setDate(newDate);
  };

  return (
    <S.RoadmapCalendar isToday={isToday}>
      <S.CalendarHead>
        <S.MonthYearWrapper>
          <S.YearLabel>{date.getFullYear()}년</S.YearLabel>
          <S.MonthLabel>{date.getMonth() + 1}월</S.MonthLabel>
        </S.MonthYearWrapper>
        <S.ButtonWrapper>
          <S.CalendarButton onClick={() => setDate(new Date())}>
            <S.Today src={calendar} alt="today" />
          </S.CalendarButton>
          <S.CalendarButton onClick={() => moveCalendar(false)}>
            <S.Left src={arrowIcon} alt="left arrow" />
          </S.CalendarButton>
          <S.CalendarButton onClick={() => moveCalendar(true)}>
            <img src={arrowIcon} alt="left arrow" />
          </S.CalendarButton>
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
    </S.RoadmapCalendar>
  );
};

export default RoadmapCalendar;
