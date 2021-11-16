import React from 'react';
import DropDown from '@/lib/design/DropDown';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllProjects } from '@/lib/api/project';
import { useUserDispatch, useUserState } from '@/lib/hooks/useContextHooks';
import S from '@/components/SideBarDropdown/style';
import { ProjectType } from '@/types/project';

const SideBarDropDown = () => {
  const userState = useUserState();
  const userDispatcher = useUserDispatch();
  const [listState, listStateHandler] = useState<Array<ProjectType>>([]);
  const [titleState, titleStateHandler] = useState('프로젝트');

  const itemClickHandler = (e: React.MouseEvent) => {
    const target = e.target as HTMLLIElement;
    if (target.tagName !== 'LI') return;
    titleStateHandler(target.innerText);
    userDispatcher({
      type: 'UPDATE_USER',
      payload: {
        currentProjectName: target.innerText,
        currentProjectId: +target.value,
      },
    });
  };
  useEffect(() => {
    (async () => {
      const projects = await getAllProjects(
        userState.id as number,
        userState.organization as number,
      );
      const defaultProject = projects.length !== 0 ? projects[0] : undefined;
      const payload = defaultProject
        ? {
            projects: projects,
            currentProjectName: defaultProject.name,
            currentProjectId: defaultProject.id,
          }
        : { projects: projects };
      userDispatcher({
        type: 'UPDATE_USER',
        payload: payload,
      });
      listStateHandler(projects);
      titleStateHandler(projects[0].name);
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
