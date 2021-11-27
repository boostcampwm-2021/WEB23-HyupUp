import styled from 'styled-components';
import plusIcon from '@public/icons/plus-icon.svg';
import minusIcon from '@public/icons/minus-icon.svg';
import deleteIcon from '@public/icons/delete-icon.svg';

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
  UserItem: styled.li`
    position: relative;
  `,
  DeleteBox: styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    z-index: 1;

    top: 0;
    right: 0;
    width: 100px;
    height: 70px;

    border-radius: 8px;
    background-color: ${({ theme }) => theme.color.red400};
  `,
  DeleteButton: styled.button`
    margin: 0 20px 0 auto;
    width: 25px;
    height: 25px;
    background-image: url(${deleteIcon});
  `,
};

export default Styled;
