import React from 'react';
import { RecoilRoot } from 'recoil';
import GlobalStyle from './styles/GlobalStyle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import Router from '@/Router';
import ContextProvider from './contexts';

function App() {
  return (
    <>
      <ContextProvider>
        <RecoilRoot>
          <BrowserRouter>
            <GlobalStyle />
            <Router />
            <ToastContainer style={{ fontSize: 13 }} />
          </BrowserRouter>
        </RecoilRoot>
      </ContextProvider>
    </>
  );
}

export default App;
