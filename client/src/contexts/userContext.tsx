import React, { createContext, Dispatch, useReducer } from 'react';
import produce from 'immer';
import { ProjectType } from '@/types/project';
import { PrivateTask, ProjectTask } from '@/types/task';

export type UserState = {
  id?: number;
  name?: string;
  job?: string;
  email?: string;
  imageURL?: string;
  admin?: boolean;
  organization?: number;
  currentProjectName?: string;
  currentProjectId?: number;
  projects?: Array<ProjectType>;
  privateTasks?: Array<PrivateTask>;
  projectTasks?: Array<ProjectTask>;
};

type UserAction =
  | { type: 'GET_USER'; payload: UserState }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: UserState }
  | { type: 'ADD_PRIVATE_TASK'; payload: PrivateTask };

type ContextType = {
  userState: UserState | null;
  dispatch: Dispatch<UserAction> | null;
};

const reducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'GET_USER':
      if (action.payload.projects?.length) {
        return {
          currentProjectId: action.payload.projects[0].id,
          currentProjectName: action.payload.projects[0].name,
          ...action.payload,
        };
      } else {
        return {
          ...action.payload,
        };
      }

    case 'LOGOUT':
      return {};

    case 'UPDATE_USER':
      return { ...state, ...action.payload };

    case 'ADD_PRIVATE_TASK':
      return produce(state, (draft) => {
        draft.privateTasks?.unshift(action.payload);
      });
    default:
      return {
        ...state,
      };
  }
};

export const UserContext = createContext<ContextType>({
  userState: null,
  dispatch: null,
});

const user: UserState = {};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userState, dispatch] = useReducer(reducer, user);
  return <UserContext.Provider value={{ userState, dispatch }}>{children}</UserContext.Provider>;
};
