import React from 'react';
import GlobalStyle from './styles/GlobalStyle';
import { BrowserRouter } from 'react-router-dom';
import Router from '@/Router';

function App() {
  const user = 'test';
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Router user={user} />
      </BrowserRouter>
    </>
  );
}

export default App;
