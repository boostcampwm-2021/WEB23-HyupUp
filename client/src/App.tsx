import React from 'react';
import GlobalStyle from './styles/GlobalStyle';
import { BrowserRouter } from 'react-router-dom';
import Router from '@/Router';
import ContextProvider from './contexts';

function App() {
  return (
    <>
      <ContextProvider>
        <BrowserRouter>
          <GlobalStyle />
          <Router />
        </BrowserRouter>
      </ContextProvider>
    </>
  );
}

export default App;
