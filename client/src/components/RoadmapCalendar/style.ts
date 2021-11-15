import styled from 'styled-components';

const S = {
  RoadmapCalendar: styled.section`
    width: 100%;
    height: 100%;
    padding: 16px;

    background-color: ${({ theme }) => theme.color.white};
    border-radius: 8px;
  `,
  CalendarHead: styled.h3`
    margin-bottom: 24px;
    font: ${({ theme }) => theme.font.bold_medium};
  `,
  DaysWrapper: styled.div`
    display: flex;
    justify-content: space-between;
  `,
};

export default S;
