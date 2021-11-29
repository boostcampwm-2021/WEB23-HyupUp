import styled from 'styled-components';
import { SpinnerProps } from '.';

const getGridToPx = (grid: number) => 96.67 * grid - 20;

const Styled = {
  SpinnerWrapper: styled.section<SpinnerProps>`
    display: flex;
    justify-content: center;
    align-items: center;

    width: ${({ widthLevel = 10 }) => getGridToPx(widthLevel) + 'px'};
    height: ${({ heightValue }) => heightValue + 'px'};

    border-radius: 8px;
    background-color: ${({ theme, colorValue }) => {
      switch (colorValue) {
        case 'white':
          return theme.color.white;
        case 'blue':
          return theme.color.blue100;
        case 'red':
          return theme.color.red100;
        default:
          return theme.color.gray100;
      }
    }};
  `,
  Spinner: styled.div<{ colorValue: string }>`
    width: 60px;
    height: 60px;

    border-radius: 70px;
    border: 7px solid;
    border-color: ${({ theme, colorValue }) =>
      colorValue === 'gray' || colorValue === 'white' ? theme.color.blue100 : theme.color.white};
    border-top-color: ${({ theme, colorValue }) =>
      colorValue === 'red' ? theme.color.red200 : theme.color.blue200};
    animation: 1s spin infinite linear;
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `,
};

export default Styled;
