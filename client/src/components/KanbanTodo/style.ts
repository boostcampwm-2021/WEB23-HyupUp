import styled from 'styled-components';
import cancelicon from '@public/icons/cancel-icon.svg';

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

  KanBanItem: styled.article`
    width: 90%;
    height: 65px;
    border-radius: 8px;
    margin-top: 10px;
    display: flex;

    background-color: ${({ theme }) => theme.color.gray100};

    input {
      background-color: ${({ theme }) => theme.color.gray100};

      margin-top: 15px;
      padding: 15px;
      width: 90%;
      height: 30px;

      font: ${({ theme }) => theme.font.bold_small};
      font-size: 14px;
    }
  `,

  CancelIcon: styled.p`
    display: inline-block;

    width: 15px;
    height: 15px;
    margin-top: 5px;
    border-radius: 50%;
    background-image: url(${cancelicon});
    background-repeat: no-repeat;
    background-position: center;
    :hover {
      cursor: pointer;
    }
  `,
};

export default Styled;
