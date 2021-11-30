import styled from 'styled-components';

const Styled = {
  Input: styled.input<{ isHover: boolean }>`
    margin-top: 5px;
    padding-left: 8px;
    padding-top: 5px;
    width: 95%;
    height: 30px;

    font: ${({ theme }) => theme.font.bold_small};
    color: ${({ theme }) => theme.color.gray400};
    ::placeholder {
      font: ${({ theme }) => theme.font.bold_small};
      color: ${({ theme }) => theme.color.gray400};
    }
    cursor: grab;
    background-color: ${({ theme, isHover }) =>
      isHover ? theme.color.gray100 : theme.color.white};
    transition: 20ms ease-in 0s;
  `,

  InputContainer: styled.article`
    display: flex;
    flex-direction: column;

    p {
      font: ${({ theme }) => theme.font.bold_extra_small};
      color: ${({ theme }) => theme.color.gray400};
      font-size: 11px;
      padding: 5px 0 10px 8px;
    }
  `,
};

export default Styled;
