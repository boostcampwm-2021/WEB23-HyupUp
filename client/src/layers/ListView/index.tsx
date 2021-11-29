import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useInView } from 'react-intersection-observer';

import Styled from '@/layers/ListView/style';
import { updateTask } from '@/lib/api/task';
import { updateTodo, deleteTodo } from '@/lib/api/todo';
import ListViewHeader from '@/components/ListViewHeader';
import ListViewItem from '@/components/ListViewItem';

import userAtom, { privateTasksSelector, projectTasksSelector } from '@/recoil/user';
import { allTasksSelector } from '@/recoil/user/selector';
import { getAlltasks } from '@/lib/api/user';
import { Spinner } from '@/lib/design';
import { AllTask } from '@/types/task';

export type ListState = 'all' | 'private' | 'project' | 'done';

const ListView = () => {
  const userState = useRecoilValue(userAtom);
  const privateTasks = useRecoilValue(privateTasksSelector);
  const projectTasks = useRecoilValue(projectTasksSelector);
  const [allTasks, setAllTasks] = useRecoilState(allTasksSelector);

  const [listState, setListState] = useState<ListState>('all');
  const [renderTasks, setRenderTasks] = useState<AllTask[]>([]);
  // infinite Scroll
  const [isScrollEnd, setIsScrollEnd] = useState(false);
  const [ref, inView] = useInView();
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (inView && !loading) {
      setOffset((prev) => prev + 10);
    }
  }, [inView]);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const newTasks = await getAlltasks(userState.id!, offset);
      setAllTasks((prev) => [...prev, ...newTasks]);
      if (newTasks.length < 10) {
        setIsScrollEnd(true);
        return;
      }
      setLoading(false);
    })();
  }, [offset, setAllTasks, userState.id]);

  const handleListState = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.id) return;
    setListState(target.id as ListState);
  };

  const onClickFinish = async (task: AllTask) => {
    if (task.projectId) {
      setAllTasks((prev) => [
        {
          ...task,
          status: !task.status,
        },
        ...prev.filter((el) => !(el.id === task.id && task.projectId)),
      ]);
      await updateTask(task.id, task.name, !task.status);
    } else {
      setAllTasks((prev) => [
        {
          ...task,
          status: !task.status,
        },
        ...prev.filter((el) => !(el.id === task.id && !task.projectId)),
      ]);
      await updateTodo(task.id, task.name, !task.status);
    }
  };

  const onClickDelete = async (task: AllTask) => {
    if (task.projectId) return;
    setAllTasks((prev) => [...prev.filter((el) => !(el.id === task.id && !task.projectId))]);
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
        {!isScrollEnd &&
          (loading ? <Spinner widthLevel={8} heightValue={70} /> : <div ref={ref} />)}
      </Styled.ItemWrapper>
    </Styled.Container>
  );
};

export default ListView;
