import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import produce from 'immer';
import DropDown from '@/lib/design/DropDown';
import S from '@/components/SideBarDropdown/style';
import { ProjectType } from '@/types/project';
import userAtom from '@/recoil/user';
import { getAllProjects } from '@/lib/api/project';

const SideBarDropDown = () => {
  const [userState, setUserState] = useRecoilState(userAtom);
  const [listState, listStateHandler] = useState<Array<ProjectType>>([]);
  const [titleState, titleStateHandler] = useState('프로젝트');

  const itemClickHandler = (e: React.MouseEvent) => {
    const target = e.target as HTMLLIElement;
    if (target.tagName !== 'LI') return;
    titleStateHandler(target.innerText);
    setUserState((prev) =>
      produce(prev, (draft) => ({
        ...draft,
        currentProjectName: target.innerText,
        currentProjectId: +target.value,
      })),
    );
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
      setUserState((prev) =>
        produce(prev, (draft) => ({
          ...draft,
          ...payload,
        })),
      );
      listStateHandler(projects);
      titleStateHandler(projects[0].name);
    })();
  }, [userState.id, userState.organization, setUserState]);

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
