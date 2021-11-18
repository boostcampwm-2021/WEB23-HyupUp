import styled from 'styled-components';

const S = {
  Title: styled.p`
    margin: 5px;

    font: ${({ theme }) => theme.font.body_regular};
  `,
};

export default S;
