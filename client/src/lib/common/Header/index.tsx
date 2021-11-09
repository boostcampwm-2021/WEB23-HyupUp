import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { PageIcon } from '@/lib/design/PageIcon';
import useOutSideClick from '@/lib/hooks/useOutSideClick';

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
  Profile: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 10%;
    position: relative;

    section {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: black;
    }

    .list-container {
      width: 120px;
      height: 70px;

      position: absolute;
      top: 60px;
      right: 35px;

      background-color: ${({ theme }) => theme.color.gray100};
      border-radius: 10px;
    }

    .dropdown-list {
      width: 100%;
      height: 80%;

      display: flex;
      flex-direction: column;
      justify-content: space-around;

      list-style: none;
      font: ${({ theme }) => theme.font.bold_small};
    }

    li {
      padding-top: 15px;
      padding-left: 15px;
    }
  `,
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);
  const logOutHandler = () => console.log('Logout');
  const ref = useRef(null);

  const handleOutClick = () => {
    toggling();
  };

  return (
    <Styled.header>
      <Styled.logo to="/">HyupUp</Styled.logo>
      <Styled.IconList>
        <PageIcon to="/" name="home" />
        <PageIcon to="/work" name="work" />
        <PageIcon to="/setting" name="setting" />
      </Styled.IconList>
      <Styled.Profile>
        <section onClick={toggling}></section>
        {isOpen && (
          <div className="list-container" ref={ref}>
            <ul className="dropdown-list">
              <li>이름</li>
              <li className="logout" onClick={logOutHandler}>
                로그아웃
              </li>
            </ul>
          </div>
        )}
      </Styled.Profile>
    </Styled.header>
  );
};

export default Header;
