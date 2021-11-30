import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const fill = (radius: number) => keyframes`
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: ${Math.PI * radius * 4};
  }
`;

const S = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    // FIXME: 수치를 어떻게 정해야하나?
    width: 100%;
    height: 100%;
  `,
  Circle: styled.svg<{ radius: number; duration: number }>`
    fill: none;
    animation: ${rotate} ${(props) => props.duration}s linear infinite;

    & circle {
      stroke: ${({ theme }) => theme.color.blue200};
      stroke-dasharray: ${({ radius }) => Math.PI * 2 * radius};
      animation: ${fill(25)} ${(props) => props.duration + 1}s linear infinite;
    }
  `,
};

export default S;
