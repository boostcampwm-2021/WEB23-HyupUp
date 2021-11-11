import React from 'react';
import Header from '@/lib/common/Header';
import TodoInputBar from '@/components/TodoInputBar';
import CoworkerStatus from '@/components/CoworkerStatus';

const MainPage = () => {
  return (
    <>
      <Header />
      <TodoInputBar />
      <CoworkerStatus />
    </>
  );
};

export default MainPage;
