import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { UserContext } from './contexts/User';
import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';
import WorkPage from './pages/WorkPage';

const Router = () => {
  const { userState } = useContext(UserContext);
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
