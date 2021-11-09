import { createContext, Dispatch } from 'react';

export type UserState = {
  id?: number;
  name?: string;
  job?: string;
  email?: string;
  url?: string;
  admin?: boolean;
  organization?: number;
};

type UserAction = { type: 'GET_USER'; data: UserState } | { type: 'LOGOUT' };

type ContextType = {
  userState: UserState | null;
  dispatch: Dispatch<UserAction> | null;
};

export const reducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'GET_USER':
      return {
        ...action.data,
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
