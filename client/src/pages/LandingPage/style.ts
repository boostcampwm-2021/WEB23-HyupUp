import styled from 'styled-components';

export const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    height: 100vh;
  `,

  Logo: styled.p`
    font: ${({ theme }) => theme.font.display_medium};
  `,

  Title: styled.p`
    margin: 5px;

    font: ${({ theme }) => theme.font.display_large};
  `,

  Body: styled.p`
    margin: 5px;

    color: ${({ theme }) => theme.color300};

    font: ${({ theme }) => theme.font.body_small};
  `,

  TextContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  `,
};
