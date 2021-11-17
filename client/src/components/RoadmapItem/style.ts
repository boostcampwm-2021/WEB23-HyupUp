import styled from 'styled-components';

const S = {
  Container: styled.div`
    width: 40px;
    height: 23px;
    margin: 25px 0;

    background-color: ${({ theme }) => theme.color.blue300};
    border-radius: 8px;
  `,
};

export default S;
