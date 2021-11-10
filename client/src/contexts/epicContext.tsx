import React, { createContext, Dispatch, useReducer } from 'react';

type Project = {
  id: number;
  name: string;
};
export type Epic = {
  id: number;
  name: string;
  startAt: Date;
  endAt: Date;
  projects: Project;
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

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_EPIC':
      if (Object.keys(state).includes(action.epic.projects.name)) {
        state[action.epic.projects.name].push(action.epic);
        return { ...state };
      } else {
        state[action.epic.projects.name] = [action.epic];
        return { ...state };
      }
    case 'REMOVE_EPIC':
      if (Object.keys(state).includes(action.epic.projects.name)) {
        state[action.epic.projects.name] = state[action.epic.projects.name].filter(
          (el) => el.id !== action.epic.id,
        );
        return { ...state };
      } else {
        throw new Error('invalid project name');
      }
    case 'UPDATE_EPIC':
      if (Object.keys(state).includes(action.epic.projects.name)) {
        state[action.epic.projects.name] = state[action.epic.projects.name].map((el) => {
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
