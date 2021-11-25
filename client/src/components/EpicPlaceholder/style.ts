import styled from 'styled-components';

const S = {
  Container: styled.form`
    display: flex;
    justify-content: center;
    align-items: center;

    min-width: 350px;
    padding: 16px;
  `,
  Input: styled.input`
    width: 100%;
    padding: 8px 16px;
    margin-right: 16px;

    background-color: ${({ theme }) => theme.color.gray100};
    color: ${({ theme }) => theme.color.gray400};
    border-radius: 8px;

    font: ${({ theme }) => theme.font.body_regular};
  `,
};

export default S;
