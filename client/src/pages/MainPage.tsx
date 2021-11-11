import React from 'react';
import Header from '@/lib/common/Header';
import TodoInputBar from '@/components/TodoInputBar';
import ListView from '@/components/ListViewLayer/ListView';

const MainPage = () => {
  return (
    <>
      <Header />
      <TodoInputBar />
      <ListView />
    </>
  );
};

export default MainPage;
