import styled from 'styled-components';

const S = {
  RoadmapCalendar: styled.section`
    position: relative;

    width: 100%;
    height: 100%;
    padding: 16px;

    background-color: ${({ theme }) => theme.color.white};
    border-radius: 8px;
  `,
  CalendarHead: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 24px;
  `,
  MonthLabel: styled.h3`
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

    & + & {
      margin-left: 4px;
    }
  `,
  DaysWrapper: styled.div`
    display: flex;
    justify-content: space-between;

    margin-bottom: 18px;
    padding: 8px 0;

    border-bottom: 1px solid ${({ theme }) => theme.color.gray100};
  `,
  DayLabel: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;

    font: ${({ theme }) => theme.font.body_small};
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
    font: ${({ theme }) => theme.font.bold_small};
  `,
  DayColumnWrapper: styled.section`
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 0;

    width: calc(100% - 32px);
    height: 100%;
  `,
  DayColumn: styled.section`
    width: 100%;
  `,
};

export default S;
