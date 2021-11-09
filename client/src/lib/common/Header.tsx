import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { PageIcon } from '@/lib/design/PageIcon';

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
    text-align: center;
  `,
  IconList: styled.ul`
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    width: 30%;
  `,
};

const Header = () => {
  return (
    <Styled.header>
      <Styled.logo to="/">HyupUp</Styled.logo>
      <Styled.IconList>
        <PageIcon to="/" name="home" />
        <PageIcon to="/work" name="work" />
        <PageIcon to="/setting" name="setting" />
      </Styled.IconList>
    </Styled.header>
  );
};

export default Header;
