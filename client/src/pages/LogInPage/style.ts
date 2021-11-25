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
    height: 480px;
    margin-top: 200px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    background-color: ${({ theme }) => theme.color.gray100};
    border-radius: 8px;
    padding: 60px;
  `,

  SudoLogin: styled.button`
    margin: 15px auto;
    border-radius: 8px;
    padding: 13px 50px;
    font: ${({ theme }) => theme.font.bold_small};
    background-color: ${({ theme }) => theme.color.blue400};
    color: ${({ theme }) => theme.color.white};
  `,
};
