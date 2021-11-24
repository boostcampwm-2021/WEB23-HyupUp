import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';
import WorkPage from './pages/WorkPage';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import userAtom from '@/recoil/user';
import AdminPage from './pages/AdminPage';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import { getUser } from './lib/api/user';
import { taskSortByUpdate } from './lib/utils/sort';
import { UserState } from './contexts/userContext';

const Router = () => {
  const userState = useRecoilValue(userAtom);
  const setUserState = useSetRecoilState(userAtom);
  useEffect(() => {
    if (!document.cookie.match('connect.sid')) return;
    (async () => {
      const userData = (await getUser('')) as UserState;
      if (userData.id) {
        userData.privateTasks!.sort((a, b) => taskSortByUpdate(a, b));
        userData.projectTasks!.sort((a, b) => taskSortByUpdate(a, b));
      }
      setUserState(userData);
    })();
  }, [setUserState]);

  return (
    <>
      <Switch>
        <Route exact path="/" render={() => (userState?.email ? <MainPage /> : <LandingPage />)} />
        <Route exact path="/work" render={() => <WorkPage />} />
        <Route exact path="/setting" render={() => <AdminPage />} />
        <Route
          exact
          path="/login"
          render={() => (userState?.email ? <Redirect to="/" /> : <LogInPage />)}
        />
        <Route
          exact
          path="/signup"
          render={() => (userState?.email ? <Redirect to="/" /> : <SignUpPage />)}
        />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
};

export default Router;
