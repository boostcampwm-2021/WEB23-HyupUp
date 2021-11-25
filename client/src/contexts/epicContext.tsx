import React, { createContext, Dispatch, useReducer } from 'react';
import producer from 'immer';
import { EpicType, EpicWithString, isEpicType } from '@/types/epic';
import { makeEpicWithDate } from '@/lib/utils/epic';
import { sortEpicsByOrder } from '@/lib/utils/sort';

type EpicState = Array<EpicType>;

type EpicAction =
  | { type: 'ADD_EPIC'; epic: EpicType | EpicWithString }
  | { type: 'REMOVE_EPIC'; id: number }
  | { type: 'UPDATE_EPIC'; epic: EpicType | EpicWithString }
  | { type: 'LOAD_EPIC'; epics: EpicWithString[] | undefined }
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
        draft.push(isEpicType(action.epic) ? action.epic : makeEpicWithDate(action.epic));
      });
    case 'REMOVE_EPIC':
      return producer(state, (draft) => {
        return draft.filter((el) => el.id !== action.id);
      });
    case 'UPDATE_EPIC':
      return producer(state, (draft) => {
        return draft
          .map((el) => {
            const newEpic = isEpicType(action.epic) ? action.epic : makeEpicWithDate(action.epic);
            if (el.id !== newEpic.id) return el;
            return {
              ...el,
              ...newEpic,
            };
          })
          .sort((a, b) => sortEpicsByOrder(a, b));
      });
    case 'LOAD_EPIC':
      return [...action.epics.map((epic) => makeEpicWithDate(epic))].sort((a, b) =>
        sortEpicsByOrder(a, b),
      );
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
