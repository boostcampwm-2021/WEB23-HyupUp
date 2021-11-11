import React, { useEffect, useState } from 'react';
import Styled from '@/components/ListViewLayer/ListView/style';
import { useUserState } from '@/lib/hooks/useContextHooks';
import ListViewHeader from '@/components/ListViewLayer/ListViewHeader';
import ListViewItem from '@/components/ListViewLayer/ListViewItem';
import { PrivateTask, ProjectType } from '@/contexts/userContext';

export type ListState = 'all' | 'private' | 'project' | 'done';

export interface TaskProp extends PrivateTask {
  project?: ProjectType;
}

type AllTasks = TaskProp[];

const ListView = () => {
  const userState = useUserState();
  const privateTasks = userState.privateTasks;
  const projectTasks = userState.projectTasks;
  const allTasks: AllTasks = [...privateTasks!, ...projectTasks!].sort((a, b) =>
    a.updatedAt < b.updatedAt ? 1 : -1,
  );

  const [listState, setListState] = useState<ListState>('all');

  const handleListState = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.id) return;
    setListState(target.id as ListState);
  };

  return (
    <Styled.Container>
      <ListViewHeader listState={listState} handleListState={handleListState} />
      <Styled.ItemWrapper>
        {allTasks.map((task, i) => (
          <ListViewItem task={task} key={'' + i + task.id} />
        ))}
      </Styled.ItemWrapper>
    </Styled.Container>
  );
};

export default ListView;
