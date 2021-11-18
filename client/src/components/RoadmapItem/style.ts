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
    height: 23px;
  `,
  Bar: styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;

    width: 100%;
    height: 23px;

    background-color: ${({ theme }) => theme.color.blue300};
  `,
  FrontHandle: styled.div`
    display: flex;

    width: ${HANDLE_WIDTH};
    height: 100%;

    background-color: ${({ theme }) => theme.color.white};
    cursor: col-resize;
    z-index: 9;

    &::after {
      content: '';
      width: 100%;
      height: 100%;

      border-radius: 8px 0 0 8px;
      background-color: ${({ theme }) => theme.color.blue300};
    }
  `,
  RearHandle: styled.div`
    display: flex;
    position: absolute;
    right: 0px;

    width: ${HANDLE_WIDTH};
    height: 100%;

    background-color: ${({ theme }) => theme.color.white};
    cursor: col-resize;
    z-index: 9;

    &::after {
      content: '';
      width: 100%;
      height: 100%;

      border-radius: 0 8px 8px 0;
      background-color: ${({ theme }) => theme.color.blue300};
    }
  `,
};

export default S;
