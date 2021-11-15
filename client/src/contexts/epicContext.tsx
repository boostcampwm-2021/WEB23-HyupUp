import React, { createContext, Dispatch, useReducer } from 'react';
import producer from 'immer';

export type EpicType = {
  id: number;
  name: string;
  startAt: Date;
  endAt: Date;
};

type EpicState = Array<EpicType>;

type EpicAction =
  | { type: 'ADD_EPIC'; epic: EpicType }
  | { type: 'REMOVE_EPIC'; id: number }
  | { type: 'UPDATE_EPIC'; epic: EpicType }
  | { type: 'DROP_EPIC' };

type EpicDispatch = Dispatch<EpicAction>;

const EpicStateContext = createContext<EpicState | null>(null);
const EpicDispatchContext = createContext<EpicDispatch | null>(null);

// to-do 필요한 action이 있으면, 아래에 추가할 것
// to-do immutable 방식을 더 생각해볼 것
function reducer(state: EpicState, action: EpicAction): EpicState {
  switch (action.type) {
    case 'ADD_EPIC':
      return producer(state, (draft) => {
        draft.push(action.epic);
      });
    case 'REMOVE_EPIC':
      return producer(state, (draft) => {
        return draft.filter((el) => el.id !== action.id);
      });
    case 'UPDATE_EPIC':
      return producer(state, (draft) => {
        return draft.map((el) => {
          if (el.id !== action.epic.id) return el;
          return {
            ...el,
            ...action.epic,
          };
        });
      });
    case 'DROP_EPIC':
      return [];
    default:
      throw new Error('unhandled action');
  }
}

export function EpicProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <EpicStateContext.Provider value={state}>
      <EpicDispatchContext.Provider value={dispatch}>{children}</EpicDispatchContext.Provider>
    </EpicStateContext.Provider>
  );
}

export { EpicStateContext, EpicDispatchContext };
