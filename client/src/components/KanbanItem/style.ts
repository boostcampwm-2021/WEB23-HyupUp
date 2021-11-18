import styled from 'styled-components';
import cancelicon from '@public/icons/cancel-icon.svg';

const Styled = {
  KanBanItem: styled.article`
    width: 90%;
    height: 65px;
    border-radius: 8px;
    margin-top: 10px;
    display: flex;
    cursor: move;
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
