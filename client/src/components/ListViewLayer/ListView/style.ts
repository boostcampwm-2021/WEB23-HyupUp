import styled from 'styled-components';

const Styled = {
  Container: styled.section`
    width: 753px;
    height: 680px;

    padding: 15px 30px;

    border-radius: 8px;
    background-color: ${({ theme }) => theme.color.gray100};
  `,
  ItemWrapper: styled.ul`
    height: 550px;
    margin-top: 90px;

    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
};

export default Styled;
