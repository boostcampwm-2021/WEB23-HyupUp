import React from 'react';
import styled from 'styled-components';

import SideBar from '@/components/SideBar';
import SideBarEntry from '@/components/SideBarEntry';
import Roadmap from '@/components/Roadmap';
import Kanban from '@/components/Kanban';
import Backlog from '@/components/Backlog';
import useTabs from '@/lib/hooks/useTabs';
import Header from '@/lib/common/Header';

import roadmap from '@public/icons/calendar-icon.svg';
import board from '@public/icons/board-icon.svg';
import backlog from '@public/icons/time-icon.svg';

import { getEpicsByProjectId } from '@/lib/api/epic';
import { useEpicDispatch, useUserState } from '@/lib/hooks/useContextHooks';
import { Epic } from '@/contexts/epicContext';

const WorkPage = () => {
  const epicDispatcher = useEpicDispatch();
  const user = useUserState();

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
      // TODO: App에 진입시 요청하도록 수정
      const epics = await getEpicsByProjectId(user.currentProjectId);
      epics.forEach((epic: Epic) => epicDispatcher({ type: `ADD_EPIC`, epic }));
    })();
  }, []);

  return (
    <>
      <Header />
      <S.Container>
        <SideBar entries={sideBarEntries} changeTab={changeTab}></SideBar>
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
