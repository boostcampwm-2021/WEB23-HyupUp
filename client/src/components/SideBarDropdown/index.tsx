import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useRecoilState } from 'recoil';
import produce from 'immer';
import DropDown from '@/lib/design/DropDown';
import S from '@/components/SideBarDropdown/style';
import { ProjectType } from '@/types/project';
import userAtom from '@/recoil/user';
import { getAllProjectsByUser } from '@/lib/api/project';

type ProjectData = {
  projects: ProjectType[];
  currentProjectName: string;
  currentProjectId: number;
};

const SideBarDropDown = () => {
  const [userState, setUserState] = useRecoilState(userAtom);
  const [listState, setListState] = useState<Array<ProjectType>>([]);
  const [titleState, setTitleState] = useState('프로젝트');
  const location = useLocation<ProjectType>();

  const itemClickHandler = (e: React.MouseEvent) => {
    const target = e.target as HTMLLIElement;
    if (target.tagName !== 'LI') return;
    setTitleState(target.innerText);
    setUserState((prev) =>
      produce(prev, (draft) => {
        draft.currentProjectName = target.innerText;
        draft.currentProjectId = +target.value;
      }),
    );
  };
  useEffect(() => {
    (async () => {
      const data: ProjectData = {
        projects: [],
        currentProjectId: 0,
        currentProjectName: '',
      };
      // 관리자 페이지에서 넘어온 경우
      if (location.state) {
        data.projects.push(...userState.projects!);
        data.currentProjectId = location.state.id;
        data.currentProjectName = location.state.name;
      } else {
        const projects = await getAllProjectsByUser(
          userState.id as number,
          userState.organization as number,
        );
        if (!projects) return;
        data.projects = projects;
        if (projects.find((el) => el.id === userState.currentProjectId)) {
          data.currentProjectId = userState.currentProjectId!;
          data.currentProjectName = userState.currentProjectName!;
        } else if (projects.length) {
          data.currentProjectId = projects[0].id;
          data.currentProjectName = projects[0].name;
        }
      }
      setUserState((prev) =>
        produce(prev, (draft) => ({
          ...draft,
          ...data,
        })),
      );
      setListState(data.projects);
      setTitleState(data.currentProjectName || '');
    })();
  }, []);

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
