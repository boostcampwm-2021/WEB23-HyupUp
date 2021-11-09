import React from 'react';
import SideBar from '@/components/SideBar';
import SideBarEntry from '@/components/SideBarEntry';

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
    <>
      <div>this will be work page</div>
      <SideBar entries={sideBarEntries}></SideBar>
    </>
  );
};

export default WorkPage;
