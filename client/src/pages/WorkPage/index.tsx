import React from 'react';
import styled from 'styled-components';

import SideBar from '@/layers/SideBar';
import SideBarEntry from '@/components/SideBarEntry';
import Roadmap from '@/layers/Roadmap';
import Kanban from '@/layers/Kanban';
import Backlog from '@/layers/Backlog';
import useTabs from '@/lib/hooks/useTabs';

import roadmap from '@public/icons/calendar-icon.svg';
import board from '@public/icons/board-icon.svg';
import backlog from '@public/icons/time-icon.svg';

import { getEpicById, getEpicsByProjectId } from '@/lib/api/epic';
import { getAllStories } from '@/lib/api/story';
import { getUsersInfoWithProject } from '@/lib/api/user';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import userAtom, { userListAtom } from '@/recoil/user';
import storyListAtom from '@/recoil/story/atom';
import { useEpicDispatch } from '@/lib/hooks/useContextHooks';
import { useSocketReceive } from '@/lib/hooks';
import { getStoryById } from '@/lib/api/story';
import produce from 'immer';
import { EpicType } from '@/types/epic';
import { StoryType } from '@/types/story';

const WorkPage = () => {
  const user = useRecoilValue(userAtom);
  const setUserListState = useSetRecoilState(userListAtom);
  const setStoryListState = useSetRecoilState(storyListAtom);
  const dispatchEpic = useEpicDispatch();
  const setStoryList = useSetRecoilState(storyListAtom);
  const userState = useRecoilValue(userAtom);

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

  useSocketReceive(
    'UPDATE_EPIC_BAR',
    async (epicId: number, projectId: number) => {
      if (projectId !== userState.currentProjectId) return;
      const updatedEpic = await getEpicById(epicId);
      if (!updatedEpic) return;
      dispatchEpic({
        type: 'UPDATE_EPIC',
        epic: updatedEpic,
      });
    },
    [userState.currentProjectId],
  );

  useSocketReceive(
    'UPDATE_EPIC_ORDER',
    async (updatedEpicId: number, projectId: number) => {
      if (projectId !== userState.currentProjectId) return;
      const updatedEpic = await getEpicById(updatedEpicId);
      if (!updatedEpic) return;
      dispatchEpic({
        type: 'UPDATE_EPIC',
        epic: updatedEpic,
      });
    },
    [userState.currentProjectId],
  );

  useSocketReceive(
    'GET_EPIC',
    async (epicId: number, projectId: number) => {
      if (userState.currentProjectId !== projectId) return;
      const data = await getEpicById(epicId);
      if (!data) return;
      dispatchEpic({ type: `ADD_EPIC`, epic: data });
    },
    [userState.currentProjectId],
  );

  useSocketReceive(
    'DELETE_EPIC',
    async (epicId: number, projectId: number) => {
      if (userState.currentProjectId !== projectId) return;
      dispatchEpic({ type: 'REMOVE_EPIC', id: epicId });
    },
    [userState.currentProjectId],
  );

  useSocketReceive(
    'UPDATE_EPIC_STORY',
    async (storyId: number, projectId: number) => {
      if (userState.currentProjectId !== projectId) return;
      const data = await getStoryById(storyId);
      if (!data) return;
      setStoryList((prev) =>
        produce(prev, (draft) => {
          const idx = draft.findIndex((story) => story.id === storyId);
          draft[idx] = data;
        }),
      );
    },
    [userState.currentProjectId],
  );

  useSocketReceive(
    'NEW_STORY',
    async (storyId: number, projectId: number) => {
      if (userState.currentProjectId !== projectId) return;
      const data = await getStoryById(storyId);
      if (!data) return;
      setStoryList((prev) => produce(prev, (draft) => [...draft, data as StoryType]));
    },
    [userState.currentProjectId],
  );

  useSocketReceive(
    'DELETE_STORY',
    async (storyId: number, projectId: number) => {
      if (userState.currentProjectId !== projectId) return;
      setStoryList((prev) =>
        produce(prev, (draft) => draft.filter((story) => story.id !== storyId)),
      );
    },
    [userState.currentProjectId],
  );

  useSocketReceive(
    'UPDATE_STORY',
    async (storyId: number, projectId: number) => {
      if (userState.currentProjectId !== projectId) return;
      const data = await getStoryById(storyId);
      if (!data) return;
      setStoryList((prev) =>
        produce(prev, (draft) =>
          draft.filter((story) => story.id !== storyId).concat([data as StoryType]),
        ),
      );
    },
    [userState.currentProjectId],
  );

  React.useEffect(() => {
    (async () => {
      if (!user.currentProjectId) return;
      const result = await getUsersInfoWithProject(user.organization as number);
      const epics = await getEpicsByProjectId(user.currentProjectId);
      const stories = await getAllStories(user.currentProjectId);

      if (result) setUserListState(result);
      if (epics) dispatchEpic({ type: 'LOAD_EPIC', epics });
      if (stories) setStoryListState(stories);
    })();
  }, [dispatchEpic, setStoryListState, setUserListState, user.organization, user.currentProjectId]);

  return (
    <>
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
