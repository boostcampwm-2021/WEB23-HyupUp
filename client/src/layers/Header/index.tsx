import React from 'react';
import Profile from '@/components/Profile';
import { PageIcon } from '@/lib/design/PageIcon';
import { Styled } from '@/layers/Header/style';
import Logo from '@/lib/design/Logo';

const Header = () => {
  return (
    <Styled.header>
      <Logo to="/" />
      <Styled.iconList>
        <PageIcon exact to="/" name="home" />
        <PageIcon to="/work" name="work" />
        <PageIcon to="/setting" name="setting" />
      </Styled.iconList>
      <Profile />
    </Styled.header>
  );
};

export default Header;
