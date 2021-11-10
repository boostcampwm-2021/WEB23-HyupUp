import React from 'react';
import styled from 'styled-components';

import DropDown from '@/lib/design/DropDown';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllProjects } from '@/lib/api/project';
import { useUserDispatch, useUserState } from '@/lib/hooks/useContextHooks';
const Title = styled.p`
  margin: 5px;

  font: ${({ theme }) => theme.font.body_regular};
`;

const SideBarDropDown = () => {
  const userState = useUserState();
  const userDispatcher = useUserDispatch();
  const [listState, listStateHandler] = useState<Array<string>>([]);
  const [titleState, titleStateHandler] = useState('프로젝트');
  const itemClickHandler = (e: React.MouseEvent) => {
    const event = e.target as HTMLElement;
    if (event.tagName === 'LI') {
      titleStateHandler(event.innerText);
      userDispatcher({
        type: 'UPDATE_USER',
        payload: {
          currentProject: event.innerText,
        },
      });
    }
  };
  useEffect(() => {
    const projects = getAllProjects(userState.id as number, userState.organization as number);
    projects
      .then((el) => {
        // 아래 로직이 반드시 필요한지 생각해보기
        userDispatcher({
          type: 'UPDATE_USER',
          payload: {
            projects: el,
          },
        });
        return el.map((project) => project.name);
      })
      .then((el) => {
        listStateHandler(el);
        el.length ? titleStateHandler(el[0]) : '';
      });
  }, []);

  return (
    <div>
      <DropDown
        Title={<Title>{titleState}</Title>}
        list={listState}
        handleClick={itemClickHandler}
      />
    </div>
  );
};

export default SideBarDropDown;
