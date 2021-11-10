import React, { createContext, Dispatch, useContext, useReducer } from 'react';

export type UserState = {
  id?: number;
  name?: string;
  job?: string;
  email?: string;
  url?: string;
  admin?: boolean;
  organization?: number;
};

type UserAction = { type: 'GET_USER'; payload: UserState } | { type: 'LOGOUT' };

type ContextType = {
  userState: UserState | null;
  dispatch: Dispatch<UserAction> | null;
};

const reducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'GET_USER':
      return {
        ...action.payload,
      };
    case 'LOGOUT':
      return {};
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

// hooks 로 분리 필요

export const useUserState = () => {
  const { userState } = useContext(UserContext);
  if (!userState) throw new Error('Cannot find UserProvider');
  return userState;
};

export const useUserDispatch = () => {
  const { dispatch } = useContext(UserContext);
  if (!dispatch) throw new Error('Cannot find UserProvider');
  return dispatch;
};
