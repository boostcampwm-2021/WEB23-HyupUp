import React, { useEffect, useMemo, useState } from 'react';
import Styled from '@/layers/ListView/style';
import { useUserDispatch, useUserState } from '@/lib/hooks/useContextHooks';
import { updateTask } from '@/lib/api/task';
import { updateTodo, deleteTodo } from '@/lib/api/todo';
import ListViewHeader from '@/components/ListViewHeader';
import ListViewItem from '@/components/ListViewItem';
import { PrivateTask } from '@/types/task';
import { ProjectType } from '@/types/project';

export type ListState = 'all' | 'private' | 'project' | 'done';

export interface TaskProp extends PrivateTask {
  project?: ProjectType;
}

type AllTasks = TaskProp[];

const ListView = () => {
  const userState = useUserState();
  const userDispatch = useUserDispatch();
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

  const onClickFinish = (task: TaskProp) => {
    if (task.project) {
      userDispatch({ type: 'FINISH_PROJECT_TASK', payload: task.id });
      updateTask(task.id, task.name, !task.status);
    } else {
      userDispatch({ type: 'FINISH_PRIVATE_TASK', payload: task.id });
      updateTodo(task.id, task.name, !task.status);
    }
  };

  const onClickDelete = (task: TaskProp) => {
    if (task.project) return;
    userDispatch({ type: 'DELETE_PRIVATE_TASK', payload: task.id });
    deleteTodo(task.id);
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
          <ListViewItem
            task={task}
            key={'' + i + task.id}
            onClickMethod={listState === 'done' ? onClickDelete : onClickFinish}
          />
        ))}
      </Styled.ItemWrapper>
    </Styled.Container>
  );
};

export default ListView;
