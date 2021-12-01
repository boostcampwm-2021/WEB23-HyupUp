import styled, { keyframes } from 'styled-components';

const fadein = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const S = {
  Container: styled.li<{ activated: boolean; isEmpty?: boolean }>`
    display: flex;
    align-items: center;

    margin: 5px 0;
    padding: 20px 0;

    font: ${({ theme }) => theme.font.body_regular};
    color: ${({ theme }) => theme.color.gray400};
    border-top: ${({ theme, activated }) =>
      activated ? `4px solid ${theme.color.blue200}` : `4px solid transparent`};
    white-space: nowrap;

    cursor: ${({ isEmpty }) => (isEmpty ? 'auto' : 'grab')};

    &:nth-child(1) {
      margin-top: 32px;
      padding-top: 32px;
    }
  `,
  DeleteIcon: styled.img<{ showDelete: boolean }>`
    display: ${({ showDelete }) => (showDelete ? 'block' : 'none')};
    animation: ${fadein} 0.1s ease-in-out;
  `,
  DeleteConfirm: styled.h4`
    margin: 32px;
    font: ${({ theme }) => theme.font.bold_medium};
  `,
  DragIndicator: styled.img<{ showDraggable: boolean }>`
    margin-right: 8px;

    transition: opacity 0.1s ease;
    opacity: ${({ showDraggable }) => (showDraggable ? 1 : 0)};
  `,
};

export default S;
