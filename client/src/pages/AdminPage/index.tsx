import React from 'react';
import styled from 'styled-components';

import group from '@public/icons/group.svg';
import file from '@public/icons/file-copy.svg';

import { SideBarEntry } from '@/components';
import { Header, SideBar } from '@/layers';
import { useTabs } from '@/lib/hooks';
import { GroupManagement } from '@/layers/GroupManagement';
import { ProjectManagement } from '@/layers/ProjectManagement';

const AdminPage = () => {
  const tabs = [<GroupManagement key={0} />, <ProjectManagement key={1} />];
  const { currentIndex, currentTab, changeTab } = useTabs(0, tabs);
  const sideBarEntries = [
    <SideBarEntry key={0} icon={group} name={'팀원 관리'} highlight={currentIndex === 0} />,
    <SideBarEntry key={0} icon={file} name={'프로젝트 관리'} highlight={currentIndex === 1} />,
  ];
  return (
    <>
      <Header />
      <S.Container>
        <SideBar entries={sideBarEntries} changeTab={changeTab} needDropDown={false} />
        {currentTab}
      </S.Container>
    </>
  );
};

export default AdminPage;

const S = {
  Container: styled.div`
    display: flex;
    margin-top: 60px;
  `,
};
