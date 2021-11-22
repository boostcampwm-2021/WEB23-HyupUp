import styled from 'styled-components';

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
  `,
  DayColumnWrapper: styled.section`
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 0;

    width: calc(100% - 32px);
    height: 100%;
  `,
  DayColumn: styled.section<{ highlightColumn: number; isToday: boolean }>`
    width: 100%;

    &:nth-child(${({ highlightColumn, isToday }) => (isToday ? highlightColumn : 0)}) {
      display: flex;

      &::after {
        content: '';
        width: 50%;
        margin-top: 100px;
        border-right: 1px solid ${({ theme }) => theme.color.red400};
      }
    }
  `,
};

export default S;
