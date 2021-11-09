import React from 'react';
import styled from 'styled-components';

import SideBar from '@/components/SideBar';
import SideBarEntry from '@/components/SideBarEntry';
import Roadmap from '@/components/Roadmap';
import Kanban from '@/components/Kanban';
import Backlog from '@/components/Backlog';
import useTabs from '@/lib/hooks/useTabs';

import roadmap from '@public/icons/calendar-icon.svg';
import board from '@public/icons/board-icon.svg';
import backlog from '@public/icons/time-icon.svg';

const WorkPage = () => {
  const tabs = [<Roadmap></Roadmap>, <Kanban></Kanban>, <Backlog></Backlog>];
  const { currentIndex, currentTab, changeTab } = useTabs(0, tabs);

  const sideBarEntries = [
    <SideBarEntry icon={roadmap} name={'로드맵'} highlight={currentIndex === 0} />,
    <SideBarEntry icon={board} name={'칸반보드'} highlight={currentIndex === 1} />,
    <SideBarEntry icon={backlog} name={'백로그'} highlight={currentIndex === 2} />,
  ];

  return (
    <S.Container>
      <SideBar entries={sideBarEntries} changeTab={changeTab}></SideBar>
      {currentTab}
    </S.Container>
  );
};

export default WorkPage;

const S = {
  Container: styled.div`
    display: flex;
  `,
};
