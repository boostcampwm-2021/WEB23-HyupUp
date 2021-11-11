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
    const target = e.target as HTMLElement;
    if (target.tagName === 'LI') {
      titleStateHandler(target.innerText);
      userDispatcher({
        type: 'UPDATE_USER',
        payload: {
          currentProject: target.innerText,
        },
      });
    }
  };
  useEffect(() => {
    (async () => {
      const projects = await getAllProjects(
        userState.id as number,
        userState.organization as number,
      );
      userDispatcher({
        type: 'UPDATE_USER',
        payload: {
          projects: projects,
        },
      });
      const projectNames = projects.map((project) => project.name);
      listStateHandler(projectNames);
      projectNames.length ? titleStateHandler(projectNames[0]) : '';
    })();
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
