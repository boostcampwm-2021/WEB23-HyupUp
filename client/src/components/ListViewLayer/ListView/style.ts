import styled from 'styled-components';

const Styled = {
  Container: styled.section`
    display: flex;
    flex-direction: column;

    width: 753px;
    height: 650px;

    padding: 15px 30px;

    border-radius: 8px;
    background-color: ${({ theme }) => theme.color.gray100};

    overflow-y: scroll;
  `,
};

export default Styled;
