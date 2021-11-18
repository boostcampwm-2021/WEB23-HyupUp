import styled from 'styled-components';
import searchIcon from '@public/icons/search-icon.svg';

const Styled = {
  Form: styled.form`
    display: flex;
    align-items: center;

    height: 45px;
    padding: 5px 15px;

    background-color: ${({ color, theme }) =>
      color === 'gray' ? theme.color.gray100 : theme.color.white};
    border-radius: 25px;
  `,
  Input: styled.input<{ inputSize?: string }>`
    width: ${({ inputSize }) =>
      inputSize === 'large' ? '800px' : inputSize === 'small' ? '100px' : '350px'};

    background: none;

    font: ${({ theme }) => theme.font.body_small};
  `,
  Button: styled.button`
    width: 25px;
    height: 25px;
    background-image: url(${searchIcon});

    cursor: pointer;
  `,
};

export default Styled;
