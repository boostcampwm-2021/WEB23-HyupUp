import styled from 'styled-components';
import plusIcon from '@public/icons/plus-icon.svg';
import minusIcon from '@public/icons/minus-icon.svg';

const Styled = {
  ContentWrapper: styled.div`
    width: 800px;
    form {
      margin-left: auto;
    }
  `,
  UserList: styled.ul`
    height: 350px;

    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
  `,
  Button: styled.button<{ isMinus: boolean }>`
    width: 20px;
    height: 20px;

    background-size: contain;
    background-position: center center;
    background-image: ${({ isMinus }) => (isMinus ? `url(${minusIcon})` : `url(${plusIcon})`)};
  `,
};

export default Styled;
