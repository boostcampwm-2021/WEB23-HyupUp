import styled from 'styled-components';
import deleteIcon from '@public/icons/delete-icon.svg';

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
  UserItem: styled.li`
    position: relative;
  `,
  DeleteBox: styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    z-index: 200;

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
