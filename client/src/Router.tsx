import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';
import WorkPage from './pages/WorkPage';

const Router = ({ user }: { user: string }) => {
  return (
    <>
      <Switch>
        <Route exact path="/" render={() => (user ? <MainPage /> : <LandingPage />)} />
        <Route exact path="/work" render={() => <WorkPage />} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
};

export default Router;
