import styled from 'styled-components';

const S = {
  Form: styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    min-width: 350px;
    padding: 16px;
  `,
  Input: styled.input<{ isTitle?: boolean }>`
    width: 100%;
    padding: 8px 16px;
    margin-bottom: ${({ isTitle }) => (isTitle ? '16px' : '0')};

    background-color: ${({ theme }) => theme.color.gray100};
    color: ${({ theme }) => theme.color.gray400};
    border-radius: 8px;

    font: ${({ theme, isTitle }) => (isTitle ? theme.font.body_medium : theme.font.body_regular)};

    &::placeholder {
      color: ${({ theme }) => theme.color.gray200};
    }
  `,
  Label: styled.label`
    display: flex;
    align-items: center;

    font: ${({ theme }) => theme.font.bold_regular};
    word-break: keep-all;

    & + & {
      margin-top: 8px;
    }

    & input {
      margin-left: 16px;
      cursor: text;

      &::-webkit-calendar-picker-indicator {
        cursor: pointer;
      }
    }
  `,
};

export default S;
