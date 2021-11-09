import React from 'react';
import styled from 'styled-components';

import SideBar from '@/components/SideBar';
import SideBarEntry from '@/components/SideBarEntry';
import Roadmap from '@/components/Roadmap';

import home from '@public/icons/home-icon.svg';
import board from '@public/icons/board-icon.svg';
import backlog from '@public/icons/time-icon.svg';

const WorkPage = () => {
  const sideBarEntries = [
    <SideBarEntry icon={home} name={'로드맵'} />,
    <SideBarEntry icon={board} name={'칸반보드'} />,
    <SideBarEntry icon={backlog} name={'백로그'} />,
  ];
  return (
    <S.Container>
      <SideBar entries={sideBarEntries}></SideBar>
      <Roadmap></Roadmap>
    </S.Container>
  );
};

export default WorkPage;

const S = {
  Container: styled.div`
    display: flex;
  `,
};
