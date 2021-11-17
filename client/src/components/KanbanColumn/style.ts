import styled from 'styled-components';

const Styled = {
  Column: styled.div`
    width: 30%;
    height: 100%;

    display: flex;
    flex-direction: column;

    align-items: center;
    position: relative;

    border-radius: 8px;
    background-color: ${({ theme }) => theme.color.white};

    h4 {
      padding-top: 12px;
      font: ${({ theme }) => theme.font.bold_regular};
    }

    button {
      width: 250px;
      height: 50px;

      position: absolute;
      bottom: 15px;

      color: ${({ theme }) => theme.color.gray400};
    }
  `,
};

export default Styled;
