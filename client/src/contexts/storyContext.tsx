import React, { createContext, Dispatch, useReducer } from 'react';

type Story = {
  id: number;
  name: string;
  status: string;
  projectName: string;
  epics: string;
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

function isProjectExist(state: State, projectName: string): boolean {
  return Object.keys(state).includes(projectName);
}

// to-do 필요한 action이 있으면, 아래에 추가할 것
// to-do immutable 방식을 더 생각해볼 것
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_STORY':
      if (isProjectExist(state, action.story.projectName)) {
        state[action.story.projectName] = [action.story, ...state[action.story.projectName]];
        return { ...state };
      } else {
        state[action.story.projectName] = [action.story];
        return { ...state };
      }
    case 'REMOVE_STORY':
      if (isProjectExist(state, action.story.projectName)) {
        state[action.story.projectName] = state[action.story.projectName].filter(
          (el) => el.id !== action.story.id,
        );
        return { ...state };
      } else {
        throw new Error('invalid project name');
      }
    case 'UPDATE_STORY':
      if (isProjectExist(state, action.story.projectName)) {
        state[action.story.projectName] = state[action.story.projectName].map((el) => {
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
