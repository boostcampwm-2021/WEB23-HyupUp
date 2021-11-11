import React, { createContext, Dispatch, useReducer } from 'react';
import producer from 'immer';

type Story = {
  id: number;
  name: string;
  status: string;
  epicName?: string;
  epicId?: number;
};

type CreateStory = {
  id: number;
  name: string;
};

type UpdateStory = {
  id: number;
  name?: string;
  status?: string;
  epicName?: string;
  epicId?: number;
};

type State = Array<Story>;

type Action =
  | { type: 'ADD_STORY'; story: CreateStory }
  | { type: 'REMOVE_STORY'; id: number }
  | { type: 'UPDATE_STORY'; story: UpdateStory }
  | { type: 'DROP_STORY' };

type StoryDispatch = Dispatch<Action>;

const StoryStateContext = createContext<State | null>(null);
const StoryDispatchContext = createContext<StoryDispatch | null>(null);

// to-do 필요한 action이 있으면, 아래에 추가할 것
// to-do immutable 방식을 더 생각해볼 것
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_STORY':
      return producer(state, (draft) => {
        draft.push({ ...action.story, status: 'TODO' });
      });
    case 'REMOVE_STORY':
      return producer(state, (draft) => {
        return draft.filter((el) => el.epicId !== action.id);
      });
    case 'UPDATE_STORY':
      return producer(state, (draft) => {
        return draft.map((el) => {
          if (el.id !== action.story.id) return el;
          return {
            ...el,
            ...action.story,
          };
        });
      });
    case 'DROP_STORY':
      return [];
    default:
      throw new Error('unhandled action');
  }
}

export function StoryProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <StoryStateContext.Provider value={state}>
      <StoryDispatchContext.Provider value={dispatch}>{children}</StoryDispatchContext.Provider>
    </StoryStateContext.Provider>
  );
}

export { StoryStateContext, StoryDispatchContext };
