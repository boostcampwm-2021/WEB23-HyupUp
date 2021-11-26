import styled from 'styled-components';

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
};

export default Styled;
