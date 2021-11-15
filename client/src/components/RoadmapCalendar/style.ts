import styled from 'styled-components';

const S = {
  RoadmapCalendar: styled.section`
    width: 100%;
    height: 100%;
    padding: 16px;

    background-color: ${({ theme }) => theme.color.white};
    border-radius: 8px;
  `,
};

export default S;
