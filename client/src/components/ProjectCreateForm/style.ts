import styled from 'styled-components';

const Styled = {
  Form: styled.form`
    display: flex;
    align-items: center;

    width: 950px;
    height: 75px;
    padding: 12px;
    margin-left: 20px;

    background-color: ${({ theme }) => theme.color.gray100};
    border-radius: 8px;
  `,
  Input: styled.input`
    width: 760px;
    height: 50px;
    margin-right: 30px;
    padding: 16px;

    border-radius: 8px;

    font: ${({ theme }) => theme.font.body_regular};
  `,
};

export default Styled;
