import React, { createContext, Dispatch, useReducer } from 'react';

type Project = {
  id: number;
  name: string;
};

type Epic = {
  id: number;
  name: string;
  startAt: Date;
  endAt: Date;
  projects: Project;
};

type Story = {
  id: number;
  name: string;
  status: string;
  projects: Project;
  epics: Epic;
};

type State = {
  [index: string]: Array<Story>;
};
type Action =
  | { type: 'ADD_STORY'; story: Story }
  | { type: 'REMOVE_STORY'; story: Story }
  | { type: 'UPDATE_STORY'; story: Story };

type StoryDispatch = Dispatch<Action>;

const StoryStateContext = createContext<State | null>(null);
const StoryDispatchContext = createContext<StoryDispatch | null>(null);

// to-do 필요한 action이 있으면, 아래에 추가할 것
// to-do epic 관련 변경 로직 추가할 것
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_STORY':
      if (Object.keys(state).includes(action.story.projects.name)) {
        state[action.story.projects.name].push(action.story);
        return { ...state };
      } else {
        state[action.story.projects.name] = [action.story];
        return { ...state };
      }
    case 'REMOVE_STORY':
      if (Object.keys(state).includes(action.story.projects.name)) {
        state[action.story.projects.name] = state[action.story.projects.name].filter(
          (el) => el.id !== action.story.id,
        );
        return { ...state };
      } else {
        throw new Error('invalid project name');
      }
    case 'UPDATE_STORY':
      if (Object.keys(state).includes(action.story.projects.name)) {
        state[action.story.projects.name] = state[action.story.projects.name].map((el) => {
          if (el.id === action.story.id) {
            el.name = action.story.name;
            el.status = action.story.status;
            return el;
          } else {
            return el;
          }
        });
        return { ...state };
      } else {
        throw new Error('invalid project name');
      }
    default:
      throw new Error('unhandled action');
  }
}

export function StoryProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {});
  return (
    <StoryStateContext.Provider value={state}>
      <StoryDispatchContext.Provider value={dispatch}>{children}</StoryDispatchContext.Provider>
    </StoryStateContext.Provider>
  );
}

export { StoryStateContext, StoryDispatchContext };