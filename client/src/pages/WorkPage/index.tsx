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

import { getEpicById, getEpicsByProjectId } from '@/lib/api/epic';
import { getAllStories } from '@/lib/api/story';
import { useEpicDispatch, useStoryDispatch } from '@/lib/hooks/useContextHooks';
import useSocketReceive from '@/lib/hooks/useSocketReceive';
import { toast } from 'react-toastify';
import { errorMessage } from '@/lib/common/message';
import { useRecoilValue } from 'recoil';
import userAtom from '@/recoil/user';

const WorkPage = () => {
  const epicDispatcher = useEpicDispatch();
  const storyDispatcher = useStoryDispatch();
  const user = useRecoilValue(userAtom);
  useSocketReceive('GET_EPIC', async (epicId: number) => {
    try {
      const data = await getEpicById(epicId);
      if (!data) throw new Error(errorMessage.GET_EPIC);
      epicDispatcher({ type: `ADD_EPIC`, epic: data });
    } catch (e) {
      toast.error((e as Error).message);
    }
  });

  const tabs = [
    <Roadmap key={0} projectId={user?.currentProjectId} />,
    <Kanban key={1} projectId={user?.currentProjectId} />,
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
      const epics = await getEpicsByProjectId(user.currentProjectId);
      // FIXME: getAllStories 의 응답이 제대로 안돌아옴
      // 여기서 막혀서 epic 로드가 실패해서 Roadmap 컴포넌트에 에픽 항목들까지 렌더링이 안되는 문제
      // const stories = await getAllStories(user.currentProjectId);
      epicDispatcher({ type: 'LOAD_EPIC', epics });
      // storyDispatcher({ type: 'LOAD_STORY', stories });
    })();
  }, [epicDispatcher, storyDispatcher, user.currentProjectId]);

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
