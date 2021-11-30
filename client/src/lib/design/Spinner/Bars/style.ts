import styled, { keyframes } from 'styled-components';

const anim = keyframes`
  0% {
    height: 100%;
  }
  20% {
    height: 10%;
  }
  80% {
    height: 10%;
  }
  100% {
    height: 100%;
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
  BarsWrapper: styled.div<{ width: number; height: number }>`
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;

    display: flex;
    align-items: center;
  `,
  Line: styled.div<{ width: number; count: number; duration: number }>`
    width: ${({ width, count }) => width / (count * 2)}px;

    background-color: ${({ theme }) => theme.color.blue200};
    animation: ${anim} ${(props) => props.duration}s linear infinite;

    & + & {
      margin-left: 5px;
    }

    ${({ count, duration }) =>
      [...Array(count)]
        .map(
          (_, i) =>
            `&:nth-child(${i + 1}) {
      animation-delay: ${(duration / (count * 2)) * (i + 1)}s;
    }`,
        )
        .join('\n\n')}
  `,
};

export default S;
