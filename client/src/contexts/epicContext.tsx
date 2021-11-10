import React, { createContext, Dispatch, useReducer } from 'react';

type Epic = {
  id: number;
  name: string;
  startAt: Date;
  endAt: Date;
  projectName: string;
};

type State = {
  [index: string]: Array<Epic>;
};
type Action =
  | { type: 'ADD_EPIC'; epic: Epic }
  | { type: 'REMOVE_EPIC'; epic: Epic }
  | { type: 'UPDATE_EPIC'; epic: Epic };

type EpicDispatch = Dispatch<Action>;

const EpicStateContext = createContext<State | null>(null);
const EpicDispatchContext = createContext<EpicDispatch | null>(null);

function isProjectExist(state: State, projectName: string): boolean {
  return Object.keys(state).includes(projectName);
}

// to-do 필요한 action이 있으면, 아래에 추가할 것
// to-do immutable 방식을 더 생각해볼 것
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_EPIC':
      if (isProjectExist(state, action.epic.projectName)) {
        state[action.epic.projectName] = [action.epic, ...state[action.epic.projectName]];
        return { ...state };
      } else {
        state[action.epic.projectName] = [action.epic];
        return { ...state };
      }
    case 'REMOVE_EPIC':
      if (isProjectExist(state, action.epic.projectName)) {
        state[action.epic.projectName] = state[action.epic.projectName].filter(
          (el) => el.id !== action.epic.id,
        );
        return { ...state };
      } else {
        throw new Error('invalid project name');
      }
    case 'UPDATE_EPIC':
      if (isProjectExist(state, action.epic.projectName)) {
        state[action.epic.projectName] = state[action.epic.projectName].map((el) => {
          if (el.id === action.epic.id) {
            el.name = action.epic.name;
            el.startAt = action.epic.startAt;
            el.endAt = action.epic.endAt;
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

export function EpicProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {});
  return (
    <EpicStateContext.Provider value={state}>
      <EpicDispatchContext.Provider value={dispatch}>{children}</EpicDispatchContext.Provider>
    </EpicStateContext.Provider>
  );
}

export { EpicStateContext, EpicDispatchContext };
