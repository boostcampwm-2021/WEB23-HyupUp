import styled, { keyframes } from 'styled-components';
import { RoadmapBarsStatus } from '@/types/epic';
import { statusToColor } from '@/components/RoadmapItem/style';

const fadein = keyframes`
  from {
    opacity: 0;
  }
  to {
    opcaity: 0.8;
  }
`;

const S = {
  Container: styled.div`
    position: relative;

    width: 25px;
    height: 25px;
  `,
  TooltipContainer: styled.div<{ hidden: boolean }>`
    position: absolute;
    display: ${({ hidden }) => (hidden ? 'flex' : 'none')};
    flex-direction: column;
    top: 0px;
    left: -458px;

    min-width: 450px;
    padding: 16px;

    z-index: 9;
    opacity: 0.9;
    background-color: ${({ theme }) => theme.color.gray400};
    border-radius: 8px;
    color: ${({ theme }) => theme.color.white};
    animation: ${fadein} 0.1s ease-in-out;
  `,
  Line: styled.div`
    padding: 8px;
  `,
  Emphasize: styled.span<{ status: RoadmapBarsStatus }>`
    color: ${({ theme, status }) => statusToColor(status, theme.color)};
    font: ${({ theme }) => theme.font.bold_regular};
  `,
};

export default S;
