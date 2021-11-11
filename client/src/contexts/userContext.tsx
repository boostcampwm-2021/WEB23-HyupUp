import React, { createContext, Dispatch, useReducer } from 'react';

type ProjectType = {
  id: number;
  name: string;
};

interface PrivateTask {
  id: number;
  name: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProjectTask extends PrivateTask {
  project: ProjectType;
}

export type UserState = {
  id?: number;
  name?: string;
  job?: string;
  email?: string;
  url?: string;
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
  | { type: 'UPDATE_USER'; payload: UserState };

type ContextType = {
  userState: UserState | null;
  dispatch: Dispatch<UserAction> | null;
};

const reducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'GET_USER':
      if (action.payload.projects && action.payload.projects.length !== 0) {
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
