import styled from 'styled-components';

const HANDLE_WIDTH = '12px';

const S = {
  Container: styled.div<{ columns: number }>`
    display: grid;
    grid-template-columns: repeat(${({ columns }) => columns}, 1fr);

    margin: 25px 0;
  `,
  Spacer: styled.div`
    width: 100%;
  `,
  Bar: styled.div`
    display: flex;
    justify-content: space-between;

    width: 100%;
    height: 23px;

    background-color: ${({ theme }) => theme.color.blue300};
    border-radius: 8px;
  `,
  FrontHandle: styled.div`
    width: ${HANDLE_WIDTH};
    height: 100%;

    cursor: col-resize;
    z-index: 9;
  `,
  RearHandle: styled.div`
    width: ${HANDLE_WIDTH};
    height: 100%;

    cursor: col-resize;
    z-index: 9;
  `,
};

export default S;
