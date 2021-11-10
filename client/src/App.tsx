import React from 'react';
import GlobalStyle from './styles/GlobalStyle';
import { BrowserRouter } from 'react-router-dom';
import Router from '@/Router';
import { UserProvider } from '@/contexts/User';

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <GlobalStyle />
          <Router />
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
