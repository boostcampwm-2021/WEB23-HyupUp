import styled from 'styled-components';

const S = {
  RoadmapCalendar: styled.section<{ isToday: boolean }>`
    position: relative;
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;
    padding: 16px;

    background-color: ${({ theme }) => theme.color.white};
    border-radius: 8px;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;

      width: 50%;
      height: calc(100% - 200px);
      margin-top: 100px;
      padding-top: 100px;

      border-right: 1px solid ${({ theme, isToday }) =>
        isToday ? theme.color.red400 : 'transparent'};
  `,
  CalendarHead: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 24px;
  `,
  MonthYearWrapper: styled.div`
    display: flex;
    align-items: flex-end;
  `,
  YearLabel: styled.h5`
    font: ${({ theme }) => theme.font.body_medium};
  `,
  MonthLabel: styled.h3`
    margin-left: 8px;
    font: ${({ theme }) => theme.font.bold_medium};
  `,
  ButtonWrapper: styled.div`
    display: flex;
  `,
  CalendarButton: styled.button`
    width: 30px;
    height: 30px;

    background-color: ${({ theme }) => theme.color.gray100};
    border-radius: 8px;
    z-index: 1;

    & + & {
      margin-left: 4px;
    }
  `,
  Today: styled.img`
    width: 20px;
    height: 20px;
  `,
  Left: styled.img`
    transform: rotateY(180deg);
  `,
  DaysWrapper: styled.div`
    position: sticky;
    top: 16px;

    display: flex;
    justify-content: space-between;

    padding: 8px 0;

    border-bottom: 1px solid ${({ theme }) => theme.color.gray100};
  `,
  DayLabel: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;

    font: ${({ theme }) => theme.font.body_extra_small};
  `,
  DayLabelToday: styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 25px;
    height: 25px;

    background-color: ${({ theme }) => theme.color.red100};
    border-radius: 30px;

    color: ${({ theme }) => theme.color.red400};
    font: ${({ theme }) => theme.font.bold_extra_small};
  `,
};

export default S;
