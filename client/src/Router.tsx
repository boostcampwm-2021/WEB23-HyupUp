import React, { useEffect, useState, useMemo, Suspense } from 'react';
import { useRecoilState } from 'recoil';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';
import { useSocketSend } from '@/lib/hooks';
import userAtom from '@/recoil/user';
import AdminPage from './pages/AdminPage';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import { getUser } from './lib/api/user';
import { Spinner } from './lib/design';
import { UserState } from './recoil/user/atom';
import { Header } from './layers';

const WorkPage = React.lazy(() => import('./pages/WorkPage'));

const Router = () => {
  const [userState, setUserState] = useRecoilState(userAtom);
  const [loading, setLoading] = useState(true);
  const emitLoginEvent = useSocketSend('LOGIN');

  useEffect(() => {
    if (!document.cookie.match('status')) {
      setLoading(false);
      return;
    }
    (async () => {
      const userData = (await getUser('')) as UserState;
      if (userData.projects && userData.projects?.length > 0) {
        userData.currentProjectId = userData.projects[0].id;
        userData.currentProjectName = userData.projects[0].name;
      }
      setUserState(userData);
      setLoading(false);
    })();
  }, [setUserState]);

  useEffect(() => {
    if (!document.cookie.match('status') || !userState.id || !userState.organization) return;
    emitLoginEvent({ userId: userState.id, organizationId: userState.organization });
  }, [emitLoginEvent, userState]);

  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);

  return (
    <>
      {loading ? (
        <Spinner colorValue="white" widthLevel={12} />
      ) : (
        <>
          {userState?.email && <Header />}
          <Routes>
            <Route path="/" element={userState?.email ? <MainPage /> : <LandingPage />} />
            <Route
              path="/work"
              element={
                userState?.email ? (
                  <Suspense fallback={<Spinner widthLevel={12} />}>
                    <WorkPage />
                  </Suspense>
                ) : (
                  <Navigate to={'/'} />
                )
              }
            />
            <Route
              path="/setting"
              element={userState?.email ? <AdminPage /> : <Navigate to={'/'} />}
            />
            <Route
              path="/login"
              element={userState?.email ? <Navigate to={'/'} /> : <LogInPage />}
            />
            <Route
              path="/signup"
              element={
                userState?.email ? (
                  <Navigate to={'/'} />
                ) : (
                  <SignUpPage token={query.get('token') ?? ''} />
                )
              }
            />
            <Route path="*" element={<Navigate to={'/'} />} />
          </Routes>
        </>
      )}
    </>
  );
};

export default Router;
