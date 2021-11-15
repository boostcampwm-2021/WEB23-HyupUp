import styled from 'styled-components';

const S = {
  RoadmapCalendar: styled.section`
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

    background-color: ${({ theme }) => theme.color.blue100};
    border-radius: 8px;

    & + & {
      margin-left: 4px;
    }
  `,
  DaysWrapper: styled.div`
    display: flex;
    justify-content: space-between;
  `,
};

export default S;
