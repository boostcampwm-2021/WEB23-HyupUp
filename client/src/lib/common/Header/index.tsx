import React from 'react';
import Profile from '@/lib/common/Profile';
import { PageIcon } from '@/lib/design/PageIcon';
import { Styled } from '@/lib/common/Header/style';

const Header = () => {
  return (
    <Styled.header>
      <Styled.logo to="/">HyupUp</Styled.logo>
      <Styled.IconList>
        <PageIcon to="/" name="home" />
        <PageIcon to="/work" name="work" />
        <PageIcon to="/setting" name="setting" />
      </Styled.IconList>
      <Profile />
    </Styled.header>
  );
};

export default Header;
