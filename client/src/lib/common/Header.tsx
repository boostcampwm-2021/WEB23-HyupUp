import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Styled = {
  header: styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;

    max-width: 1140px;
    width: 100%;

    position: absolute;
    top: 25px;
  `,
  logo: styled(NavLink)`
    font: ${({ theme }) => theme.font.display_medium};
    color: ${({ theme }) => theme.color.gray500};
  `,
};

const Header = () => {
  return (
    <Styled.header>
      <Styled.logo to="/">HyupUp</Styled.logo>
    </Styled.header>
  );
};

export default Header;
