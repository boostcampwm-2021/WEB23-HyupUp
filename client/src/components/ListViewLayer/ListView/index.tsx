import React, { useEffect, useMemo, useState } from 'react';
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
  const [listState, setListState] = useState<ListState>('all');
  const allTasks: AllTasks = useMemo(
    () =>
      [...userState.privateTasks!, ...userState.projectTasks!].sort((a, b) =>
        a.updatedAt < b.updatedAt ? 1 : -1,
      ),
    [userState],
  );
  const [renderTasks, setRenderTasks] = useState<AllTasks>([]);

  const handleListState = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.id) return;
    setListState(target.id as ListState);
  };

  useEffect(() => {
    if (listState === 'all') {
      setRenderTasks(allTasks.filter((task) => task.status === false));
    } else if (listState === 'private') {
      setRenderTasks(allTasks.filter((task) => !task.project && task.status === false));
    } else if (listState === 'project') {
      setRenderTasks(allTasks.filter((task) => task.project?.name && task.status === false));
    } else {
      setRenderTasks(allTasks.filter((task) => task.status));
    }
  }, [listState, userState]);

  return (
    <Styled.Container>
      <ListViewHeader listState={listState} handleListState={handleListState} />
      <Styled.ItemWrapper>
        {renderTasks.map((task, i) => (
          <ListViewItem task={task} key={'' + i + task.id} />
        ))}
      </Styled.ItemWrapper>
    </Styled.Container>
  );
};

export default ListView;
