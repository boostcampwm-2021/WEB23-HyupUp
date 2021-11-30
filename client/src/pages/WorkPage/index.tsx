import React from 'react';
import styled from 'styled-components';

import SideBar from '@/layers/SideBar';
import SideBarEntry from '@/components/SideBarEntry';
import Roadmap from '@/layers/Roadmap';
import Kanban from '@/layers/Kanban';
import Backlog from '@/layers/Backlog';
import useTabs from '@/lib/hooks/useTabs';
import Header from '@/layers/Header';

import roadmap from '@public/icons/calendar-icon.svg';
import board from '@public/icons/board-icon.svg';
import backlog from '@public/icons/time-icon.svg';

import { getEpicsByProjectId } from '@/lib/api/epic';
import { getAllStories } from '@/lib/api/story';
import { getUsersInfoWithProject } from '@/lib/api/user';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import userAtom, { userListAtom } from '@/recoil/user';
import storyListAtom from '@/recoil/story/atom';
import epicListAtom from '@/recoil/epic';
import { makeEpicWithDate } from '@/lib/utils/epic';
import { sortEpicsByOrder } from '@/lib/utils/sort';

const WorkPage = () => {
  const user = useRecoilValue(userAtom);
  const setUserListState = useSetRecoilState(userListAtom);
  const setStoryListState = useSetRecoilState(storyListAtom);
  const setEpicListState = useSetRecoilState(epicListAtom);

  const tabs = [
    <Roadmap key={0} projectId={user?.currentProjectId} />,
    <Kanban key={1} />,
    <Backlog key={2} />,
  ];
  const { currentIndex, currentTab, changeTab } = useTabs(0, tabs);

  const sideBarEntries = [
    <SideBarEntry key={0} icon={roadmap} name={'로드맵'} highlight={currentIndex === 0} />,
    <SideBarEntry key={1} icon={board} name={'칸반보드'} highlight={currentIndex === 1} />,
    <SideBarEntry key={2} icon={backlog} name={'백로그'} highlight={currentIndex === 2} />,
  ];

  React.useEffect(() => {
    (async () => {
      if (!user.currentProjectId) return;
      const result = await getUsersInfoWithProject(user.organization as number);
      const epics = await getEpicsByProjectId(user.currentProjectId);
      const stories = await getAllStories(user.currentProjectId);

      if (result) setUserListState(result);
      if (epics)
        setEpicListState(
          epics.map((epic) => makeEpicWithDate(epic)).sort((a, b) => sortEpicsByOrder(a, b)),
        );
      if (stories) setStoryListState(stories);
    })();
  }, [
    setEpicListState,
    setStoryListState,
    setUserListState,
    user.organization,
    user.currentProjectId,
  ]);

  return (
    <>
      <Header />
      <S.Container>
        <SideBar entries={sideBarEntries} changeTab={changeTab} needDropDown={true}></SideBar>
        {currentTab}
      </S.Container>
    </>
  );
};

export default WorkPage;

const S = {
  Container: styled.div`
    display: flex;
    margin-top: 60px;
  `,
};
