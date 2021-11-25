import styled from 'styled-components';

const S = {
  Container: styled.li<{ activated: boolean }>`
    display: flex;
    align-items: center;

    margin: 5px 0;
    padding: 20px 0;

    font: ${({ theme }) => theme.font.body_regular};
    color: ${({ theme }) => theme.color.gray400};
    border-top: ${({ theme, activated }) =>
      activated ? `4px solid ${theme.color.blue200}` : `4px solid transparent`};
    white-space: nowrap;

    cursor: grab;

    &:nth-child(1) {
      margin-top: 32px;
      padding-top: 32px;
    }
  `,
  DragIndicator: styled.img<{ showDraggable: boolean }>`
    margin-right: 8px;

    transition: opacity 0.1s ease;
    opacity: ${({ showDraggable }) => (showDraggable ? 1 : 0)};
  `,
};

export default S;
