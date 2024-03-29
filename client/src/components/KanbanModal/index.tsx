import React, { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Styled from '@/components/KanbanModal/style';
import KanbanTask from './KanbanTask/index';
import KanbanModalTitle from './KanbanModalTitle/index';
import { Modal, Button, DropDown } from '@/lib/design';

import { deleteTask, getTasksByStoryId } from '@/lib/api/task';
import { updateStoryWithId } from '@/lib/api/story';
import { EpicType } from '@/types/epic';
import { TaskProps, KanbanModalType } from '@/types/story';
import { useEpicState } from '@/lib/hooks/useContextHooks';
import storyListAtom from '@/recoil/story';
import { postTask } from '@/lib/api/task';
import produce from 'immer';
import { useSocketSend } from '@/lib/hooks';
import userAtom from '@/recoil/user';

type TaskListType = Array<TaskProps>;

const defaultTaskItem = {
  name: '',
  id: '',
  user: '',
  userImage: '',
};

const KanbanModal = ({ story, isItemModalOpen, setModalOpen }: KanbanModalType) => {
  const epicListState = useEpicState();
  const setStoryListState = useSetRecoilState(storyListAtom);
  const [epic, setEpic] = useState<EpicType>();
  const [taskList, setTaskList] = useState<TaskListType>([]);
  const emitUpdateEpic = useSocketSend('UPDATE_EPIC_STORY');
  const userState = useRecoilValue(userAtom);
  const handleEpicSelect = async (e: React.MouseEvent) => {
    if ((e.target as HTMLLIElement).tagName !== 'LI') return;
    const epicId = epicListState.find((v) => v.id === (e.target as HTMLLIElement).value)?.id;

    await updateStoryWithId({ ...story, epicId: epicId });
    emitUpdateEpic(story.id, userState.currentProjectId);
    setStoryListState((prev) =>
      produce(prev, (draft) => {
        const idx = draft.findIndex((value) => value.id === story.id);
        draft[idx] = { ...story, epicId: epicId };
      }),
    );
  };

  const handleDelete = async (key: number) => {
    setTaskList((prev) => prev.filter((v) => v.id !== key));
    await deleteTask(key);
  };

  const handleAddBtn = async () => {
    const insertedId = await postTask({
      name: '',
      status: 1,
      storyId: Number(story.id),
      userId: null,
      projectId: null,
    });
    const taskItem = { ...defaultTaskItem, id: insertedId };
    setTaskList((taskList) => [...taskList, taskItem]);
  };

  const handleCloseClick = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    (async () => {
      if (!isItemModalOpen) return;
      const { epicId, id } = story;
      setEpic(epicListState.find((v) => v.id === epicId));
      const taskResult = await getTasksByStoryId(id as number);
      if (!taskResult) return;
      setTaskList(taskResult);
    })();
  }, [story, isItemModalOpen, epicListState]);

  return (
    <Modal shouldConfirm={false} visible={isItemModalOpen} onClose={handleCloseClick} size="LARGE">
      <Styled.ContentWrapper>
        <KanbanModalTitle story={story} />
        <Styled.ControlWrapper>
          <DropDown
            Title={<h4>{epic?.name ? epic.name : 'Epic을 등록하세요'}</h4>}
            list={epicListState}
            handleClick={handleEpicSelect}
          />
          <Button category={'default'} size={'small'} onClick={() => handleAddBtn()}>
            ADD TASK
          </Button>
        </Styled.ControlWrapper>
        {taskList
          ?.sort((a, b) => b.id - a.id)
          .map((task) => (
            <KanbanTask key={task.id} task={task} handleDelete={handleDelete} />
          ))}
      </Styled.ContentWrapper>
    </Modal>
  );
};

export default KanbanModal;
