import React from 'react';
import Styled from '@/components/ListViewLayer/ListView/style';
import { useUserDispatch, useUserState } from '@/lib/hooks/useContextHooks';
import ListViewHeader from '@/components/ListViewLayer/ListViewHeader';
import ListViewItem from '@/components/ListViewLayer/ListViewItem';

const ListView = () => {
  const state = useUserState();
  const dispatch = useUserDispatch();
  const privateTasks = state.privateTasks;
  const projectTasks = state.projectTasks;
  const allTasks = [...privateTasks!, ...projectTasks!];
  console.log(allTasks);
  return (
    <Styled.Container>
      <ListViewHeader />
      {allTasks.map((item, i) => (
        <ListViewItem item={item.name} key={i} />
      ))}
    </Styled.Container>
  );
};

export default ListView;
