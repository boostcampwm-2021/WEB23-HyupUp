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
  EmptyWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    height: 200px;
    font: ${({ theme }) => theme.font.bold_large};
    color: ${({ theme }) => theme.color.gray300};
  `,
};

export default Styled;
