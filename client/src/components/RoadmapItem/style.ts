import styled from 'styled-components';

const S = {
  Container: styled.div`
    width: 48px;
    height: 24px;
    margin: 27px;

    background-color: ${({ theme }) => theme.color.blue300};
    border-radius: 8px;
  `,
};

export default S;
