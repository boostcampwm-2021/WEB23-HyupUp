import React, { useEffect, useState } from 'react';
import Styled from '@/layers/ListView/style';
import { updateTask } from '@/lib/api/task';
import { updateTodo, deleteTodo } from '@/lib/api/todo';
import ListViewHeader from '@/components/ListViewHeader';
import ListViewItem from '@/components/ListViewItem';
import { PrivateTask } from '@/types/task';
import { ProjectType } from '@/types/project';
import { useRecoilState, useRecoilValue } from 'recoil';
import { privateTasksSelector, projectTasksSelector } from '@/recoil/user';
import { allTasksSelector } from '@/recoil/user/selector';

export type ListState = 'all' | 'private' | 'project' | 'done';

export interface TaskProp extends PrivateTask {
  project?: ProjectType;
}

type AllTasks = TaskProp[];

const ListView = () => {
  const [privateTasks, setPrivateTasks] = useRecoilState(privateTasksSelector);
  const [projectTasks, setProjectTasks] = useRecoilState(projectTasksSelector);
  const allTasks = useRecoilValue(allTasksSelector);

  const [listState, setListState] = useState<ListState>('all');
  const [renderTasks, setRenderTasks] = useState<AllTasks>([]);

  const handleListState = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.id) return;
    setListState(target.id as ListState);
  };

  const onClickFinish = async (task: TaskProp) => {
    if (task.project) {
      setProjectTasks((prev) => [
        {
          ...task,
          status: !task.status,
        },
        ...prev.filter((el) => el.id !== task.id),
      ]);
      await updateTask(task.id, task.name, !task.status);
    } else {
      setPrivateTasks((prev) => [
        {
          ...task,
          status: !task.status,
        },
        ...prev.filter((el) => el.id !== task.id),
      ]);
      await updateTodo(task.id, task.name, !task.status);
    }
  };

  const onClickDelete = async (task: TaskProp) => {
    if (task.project) return;
    setPrivateTasks((prev) => [...prev.filter((el) => el.id !== task.id)]);
    await deleteTodo(task.id);
  };

  useEffect(() => {
    if (listState === 'all') {
      setRenderTasks(allTasks.filter((task) => !task.status));
    } else if (listState === 'private') {
      setRenderTasks(privateTasks.filter((task) => !task.status));
    } else if (listState === 'project') {
      setRenderTasks(projectTasks.filter((task) => !task.status));
    } else {
      setRenderTasks(allTasks.filter((task) => task.status));
    }
  }, [listState, privateTasks, projectTasks, allTasks]);

  return (
    <Styled.Container>
      <ListViewHeader listState={listState} handleListState={handleListState} />
      <Styled.ItemWrapper>
        {renderTasks.map((task, i) => (
          <ListViewItem
            task={task}
            key={i + '-' + task.id}
            onClickMethod={listState === 'done' ? onClickDelete : onClickFinish}
          />
        ))}
      </Styled.ItemWrapper>
    </Styled.Container>
  );
};

export default ListView;
