import React, { useContext } from 'react';

import { EpicStateContext, EpicDispatchContext } from '@/contexts/epicContext';
import { StoryStateContext, StoryDispatchContext } from '@/contexts/storyContext';

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
