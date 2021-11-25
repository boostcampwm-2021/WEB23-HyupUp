import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import group from '@public/icons/group.svg';
import file from '@public/icons/file-copy.svg';

import { SideBarEntry } from '@/components';
import { Header, SideBar } from '@/layers';
import { useTabs } from '@/lib/hooks';
import userAtom, { userListAtom } from '@/recoil/user';
import { getUsersInfoWithProject } from '@/lib/api/user';
import { GroupManagement } from '@/layers/GroupManagement';
import { ProjectManagement } from '@/layers/ProjectManagement';

const AdminPage = () => {
  const userState = useRecoilValue(userAtom);
  const setUserListState = useSetRecoilState(userListAtom);
  const tabs = [<GroupManagement key={0} />, <ProjectManagement key={1} />];
  const { currentIndex, currentTab, changeTab } = useTabs(0, tabs);
  const sideBarEntries = [
    <SideBarEntry key={0} icon={group} name={'팀원 관리'} highlight={currentIndex === 0} />,
    <SideBarEntry key={0} icon={file} name={'프로젝트 관리'} highlight={currentIndex === 1} />,
  ];

  useEffect(() => {
    (async () => {
      const result = await getUsersInfoWithProject(userState.organization as number);
      if (!result) return;
      setUserListState(result);
    })();
  }, [userState.organization, setUserListState]);

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
