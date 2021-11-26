import styled from 'styled-components';
import { RoadmapBarsStatus } from '@/types/epic';

const HANDLE_WIDTH = '5px';

const statusToColor = (
  status: RoadmapBarsStatus,
  color: { blue300: string; red300: string; green300: string },
) => {
  const { blue300, red300, green300 } = color;
  switch (status) {
    case 'NOT_STARTED':
      return red300;
    case 'STARTED':
      return green300;
    case 'ALL_DONE':
      return blue300;
  }
};

const S = {
  Container: styled.div<{ columns: number }>`
    display: grid;
    grid-template-columns: repeat(${({ columns }) => columns}, 1fr);

    margin: 27px 0;
  `,
  Spacer: styled.div`
    width: 100%;
    height: 25px;
  `,
  Bar: styled.div<{ status: RoadmapBarsStatus }>`
    position: relative;
    display: flex;
    justify-content: space-between;

    width: 100%;
    height: 25px;

    background-color: ${({ status, theme }) => statusToColor(status, theme.color)};
  `,
  FrontHandle: styled.div<{ status: RoadmapBarsStatus }>`
    display: flex;

    width: ${HANDLE_WIDTH};
    height: 100%;

    background-color: ${({ theme }) => theme.color.white};
    cursor: col-resize;
    z-index: 1;

    &::after {
      content: '';
      width: 100%;
      height: 100%;

      border-radius: 8px 0 0 8px;
      background-color: ${({ status, theme }) => statusToColor(status, theme.color)};
    }
  `,
  RearHandle: styled.div<{ status: RoadmapBarsStatus }>`
    display: flex;
    position: absolute;
    right: 0px;

    width: ${HANDLE_WIDTH};
    height: 100%;

    background-color: ${({ theme }) => theme.color.white};
    cursor: col-resize;
    z-index: 1;

    &::after {
      content: '';
      width: 100%;
      height: 100%;

      border-radius: 0 8px 8px 0;
      background-color: ${({ status, theme }) => statusToColor(status, theme.color)};
    }
  `,
};

export default S;
