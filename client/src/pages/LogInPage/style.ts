import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
  `,

  Logo: styled(NavLink)`
    font: ${({ theme }) => theme.font.display_medium};
    color: ${({ theme }) => theme.color.gray500};
    text-align: center;
  `,

  LogoContainer: styled.div`
    width: 100%;
    margin-top: 30px;
  `,

  ContentContainer: styled.div`
    width: 80%;
    margin-top: 200px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: ${({ theme }) => theme.color.gray100};
    border-radius: 8px;
    padding: 60px;
  `,
};
