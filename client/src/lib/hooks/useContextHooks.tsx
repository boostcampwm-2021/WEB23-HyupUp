import { useContext } from 'react';

import { EpicStateContext, EpicDispatchContext } from '@/contexts/epicContext';
import { StoryStateContext, StoryDispatchContext } from '@/contexts/storyContext';
import { UserContext } from '@/contexts/userContext';

export function useEpicState() {
  const state = useContext(EpicStateContext);
  if (!state) throw new Error('Cannot find EpicProvider'); // 유효하지 않을땐 에러를 발생
  return state;
}

export function useEpicDispatch() {
  const dispatch = useContext(EpicDispatchContext);
  if (!dispatch) throw new Error('Cannot find EpicProvider'); // 유효하지 않을땐 에러를 발생
  return dispatch;
}

export function useStoryState() {
  const state = useContext(StoryStateContext);
  if (!state) throw new Error('Cannot find StoryProvider'); // 유효하지 않을땐 에러를 발생
  return state;
}

export function useStoryDispatch() {
  const dispatch = useContext(StoryDispatchContext);
  if (!dispatch) throw new Error('Cannot find StoryProvider'); // 유효하지 않을땐 에러를 발생
  return dispatch;
}

export const useUserState = () => {
  const { userState } = useContext(UserContext);
  if (!userState) throw new Error('Cannot find UserProvider');
  return userState;
};

export const useUserDispatch = () => {
  const { dispatch } = useContext(UserContext);
  if (!dispatch) throw new Error('Cannot find UserProvider');
  return dispatch;
};
