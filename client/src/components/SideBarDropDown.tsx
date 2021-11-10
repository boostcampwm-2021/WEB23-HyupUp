import React from 'react';
import styled from 'styled-components';

import DropDown from '@/lib/design/DropDown';
import { useState } from 'react';
import { useEffect } from 'react';
const Title = styled.p`
  margin: 5px;

  font: ${({ theme }) => theme.font.body_regular};
`;

interface Project {
  id: number;
  name: string;
}
const SideBarDropDown = () => {
  const SERVER_URL = 'http://localhost:3000';
  const [listState, listStateHandler] = useState([]);
  const [titleState, titleStateHandler] = useState(<Title>프로젝트</Title>);
  const itemClickHandler = (e: React.MouseEvent) => {
    const event = e.target as HTMLElement;
    if (event.tagName === 'LI') {
      titleStateHandler(<Title>{event.innerText}</Title>);
    }
  };
  useEffect(() => {
    fetch(`${SERVER_URL}/api/projects?userId=${1}&organizationId=${1}`)
      .then((res) => res.json())
      .then((projectList) => projectList.map((el: Project) => el.name))
      .then((nameList) => {
        listStateHandler(nameList);
        titleStateHandler(<Title>{nameList[0]}</Title>);
      })
      .catch(() => {
        window.location.reload();
      });
  }, []);
  return (
    <div>
      <DropDown Title={titleState} list={listState} handleClick={itemClickHandler} />
    </div>
  );
};

export default SideBarDropDown;
