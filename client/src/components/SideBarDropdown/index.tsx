import React from 'react';
import DropDown from '@/lib/design/DropDown';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllProjects } from '@/lib/api/project';
import { useUserDispatch, useUserState } from '@/lib/hooks/useContextHooks';
import S from '@/components/SideBarDropdown/style';

const SideBarDropDown = () => {
  const userState = useUserState();
  const userDispatcher = useUserDispatch();
  const [listState, listStateHandler] = useState<Array<string>>([]);
  const [titleState, titleStateHandler] = useState('프로젝트');
  console.log(userState);
  const itemClickHandler = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    console.log(target);
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
      // const projects = await getAllProjects(
      //   userState.id as number,
      //   userState.organization as number,
      // );
      const projects = await getAllProjects(1, 1);
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
  }, [userDispatcher, userState.id, userState.organization]);

  return (
    <div>
      <DropDown
        Title={<S.Title>{titleState}</S.Title>}
        list={listState}
        handleClick={itemClickHandler}
      />
    </div>
  );
};

export default SideBarDropDown;
