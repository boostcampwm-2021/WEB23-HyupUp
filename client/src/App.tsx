import React, { useReducer } from 'react';
import GlobalStyle from './styles/GlobalStyle';
import { BrowserRouter } from 'react-router-dom';
import Router from '@/Router';
import { reducer, UserContext } from '@/contexts/User';

const user = {};

function App() {
  const [userState, dispatch] = useReducer(reducer, user);
  return (
    <>
      <UserContext.Provider value={{ userState, dispatch }}>
        <BrowserRouter>
          <GlobalStyle />
          <Router />
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
