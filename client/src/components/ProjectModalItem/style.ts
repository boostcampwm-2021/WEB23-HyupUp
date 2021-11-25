import styled from 'styled-components';
import plusIcon from '@public/icons/plus-icon.svg';
import minusIcon from '@public/icons/minus-icon.svg';

const Styled = {
  ItemWrapper: styled.div<{ isClickedMinus?: boolean }>`
    position: relative;
    z-index: 300;
    transform: ${({ isClickedMinus }) => (isClickedMinus ? 'translateX(-70px)' : 'translateX(0)')};
    transition: 500ms ease-in-out;
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
