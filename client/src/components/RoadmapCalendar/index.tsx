import React from 'react';
import S from '@/components/RoadmapCalendar/style';
import { addDate, getRangeFromDate, isSameDay, makeDayRow } from '@/lib/utils/date';
import RoadmapBars from '@/components/RoadmapBars';
import arrowIcon from '@public/icons/arrow-right.svg';
import calendar from '@public/icons/calendar-icon.svg';
import { useRecoilState, useResetRecoilState } from 'recoil';
import calendarAtom, { WEEK_OFFSET } from '@/recoil/calendar/atom';

const RoadmapCalendar = () => {
  const [date, setDate] = useRecoilState(calendarAtom);
  const isToday = isSameDay(new Date(), date.middle);
  const resetDate = useResetRecoilState(calendarAtom);
  const dayRow = makeDayRow(date.middle);
  const dateRange = getRangeFromDate(date.middle);

  const moveCalendar = (isNext: boolean) => {
    const offset = WEEK_OFFSET * (isNext ? 1 : -1);
    setDate({
      middle: addDate(date.middle, offset),
      rangeFrom: addDate(date.rangeFrom, offset),
      rangeTo: addDate(date.rangeTo, offset),
    });
  };

  return (
    <S.RoadmapCalendar isToday={isToday}>
      <S.CalendarHead>
        <S.MonthYearWrapper>
          <S.YearLabel>{date.middle.getFullYear()}년</S.YearLabel>
          <S.MonthLabel>{date.middle.getMonth() + 1}월</S.MonthLabel>
        </S.MonthYearWrapper>
        <S.ButtonWrapper>
          <S.CalendarButton onClick={() => resetDate()}>
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
