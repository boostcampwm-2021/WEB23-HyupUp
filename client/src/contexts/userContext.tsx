import React, { createContext, Dispatch, useReducer } from 'react';

type Project = {
  id: number;
  name: string;
};

export type UserState = {
  id?: number;
  name?: string;
  job?: string;
  email?: string;
  url?: string;
  admin?: boolean;
  organization?: number;
  currentProject?: string;
  projects?: Array<Project>;
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
      state = {
        currentProject:
          action.payload.projects && action.payload.projects.length !== 0
            ? action.payload.projects[0].name
            : '',
        ...action.payload,
      };
      return { ...state };
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
