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

    button {
      width: 250px;
      height: 50px;
      color: ${({ theme }) => theme.color.gray400};
    }

    article {
      margin-top: 10px;
    }

    article:nth-child(2) {
      margin-top: 0px;
    }
  `,
  KanBanColumnTitle: styled.h4<{ isTopEnter: boolean }>`
    width: 90%;
    text-align: center;
    padding-top: 12px;
    padding-bottom: 8px;
    font: ${({ theme }) => theme.font.bold_regular};
    border-bottom: ${({ isTopEnter, theme }) =>
      isTopEnter ? `4px solid ${theme.color.blue200}` : `4px solid transparent`};
  `,
};

export default Styled;
