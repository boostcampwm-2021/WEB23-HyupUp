import React, { useState, useRef } from 'react';
import Styled from './style';
import { useInput } from '@/lib/hooks';
import { postTask, updateTask } from '@/lib/api/task';
import { useRecoilValue } from 'recoil';
import { userListAtom } from '@/recoil/user';
import userAtom from '@/recoil/user';
import { DropDown } from '@/lib/design';
import * as avatar from '@/lib/common/avatar';
import { ImageType } from '@/types/image';
import { KanbanTaskType } from '@/types/story';

export type KanbanTaskPropType = {
  task?: KanbanTaskType;
  storyId?: number;
};

const KanbanTask = ({ task, storyId }: KanbanTaskPropType) => {
  const { key, value, onChange } = useInput(task?.name);
  const userState = useRecoilValue(userAtom);
  const [taskState, setTaskState] = useState<KanbanTaskType | undefined>(task);
  const userListState = useRecoilValue(userListAtom);
  const userListwithId = userListState.map((value) => {
    return { ...value, id: value.index };
  });

  const handleInput = async () => {
    if (!value) return;
    if (!taskState || taskState === undefined) return;
    if (!taskState.preExist) {
      await postTask(value, 1, storyId as number, null, userState.currentProjectId);
    } else {
      const userId = taskState.userId;
      await updateTask(taskState.id as number, value, false, userId);
    }
    setTaskState((prev) => ({
      ...prev,
      name: value,
      preExist: true,
    }));
  };

  const handleUserSelect = async (e: React.MouseEvent) => {
    const target = e.target as HTMLLIElement;
    if (target.tagName !== 'LI') return;
    if (!taskState || taskState === undefined) return;
    const selectedUser = userListwithId.find((v) => v.index === target.value);
    if (!selectedUser || !selectedUser?.name) return;
    if (!taskState.preExist) {
      await postTask('', 1, storyId as number, selectedUser.id, userState.currentProjectId);
    } else {
      await updateTask(taskState.id as number, value, false, selectedUser.id);
    }
    setTaskState((prev) => ({
      ...prev,
      user: selectedUser.name,
      userImage: selectedUser.imageURL,
      userId: target.value,
      preExist: true,
    }));
  };

  return (
    <Styled.KanbanTaskWrapper>
      <input
        type="text"
        {...value}
        onBlur={handleInput}
        placeholder={task?.name ? task.name : 'Type A Task'}
        onChange={onChange}
      />
      {taskState?.user ? (
        <Styled.MemberContainer>
          <DropDown
            Title={
              <p>
                <img
                  className="userImage"
                  src={avatar[taskState.userImage as ImageType]}
                  alt="userimage"
                />
                <span>{taskState.user}</span>
              </p>
            }
            list={userListwithId}
            handleClick={handleUserSelect}
          />
        </Styled.MemberContainer>
      ) : (
        <Styled.DropdownWrapper>
          <DropDown list={userListwithId} handleClick={handleUserSelect} isMeatBall={true} />
        </Styled.DropdownWrapper>
      )}
    </Styled.KanbanTaskWrapper>
  );
};

export default KanbanTask;
