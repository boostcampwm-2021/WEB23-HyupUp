import styled from 'styled-components';

const S = {
  Container: styled.div`
    display: flex;
    align-items: center;

    cursor: pointer;
  `,
  Icon: styled.div<{ highlight: boolean }>`
    & img {
      filter: ${({ highlight }) =>
        highlight
          ? 'invert(33%) sepia(26%) saturate(3652%) hue-rotate(196deg) brightness(99%) contrast(85%);'
          : ''};
    }
  `,
  Label: styled.span<{ highlight: boolean }>`
    margin-left: 8px;

    font: ${({ theme }) => theme.font.body_regular};
    color: ${({ highlight, theme }) => (highlight ? theme.color.blue400 : theme.color.gray300)};
  `,
};

export default S;
