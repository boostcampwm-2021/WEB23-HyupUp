import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';
import WorkPage from './pages/WorkPage';
import { useRecoilValue } from 'recoil';
import user from '@/recoil/user';

const Router = () => {
  const userState = useRecoilValue(user);
  return (
    <>
      <Switch>
        <Route exact path="/" render={() => (userState?.email ? <MainPage /> : <LandingPage />)} />
        <Route exact path="/work" render={() => <WorkPage />} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
};

export default Router;
