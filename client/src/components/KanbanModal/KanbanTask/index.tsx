import React, { useState } from 'react';
import Styled from './style';
import { useInput } from '@/lib/hooks';
import { updateTask } from '@/lib/api/task';
import { useRecoilValue } from 'recoil';
import { userListAtom } from '@/recoil/user';
import { DropDown } from '@/lib/design';
import * as avatar from '@/lib/common/avatar';
import { ImageType } from '@/types/image';
import { KanbanTaskType } from '@/types/story';

const KanbanTask = ({ task }: { task: KanbanTaskType }) => {
  const { value, onChange } = useInput(task?.name);
  const [taskState, setTask] = useState<KanbanTaskType>(task);
  const userListState = useRecoilValue(userListAtom);
  const userListWithId = userListState.map((value) => {
    return { ...value, id: value.index };
  });
  const handleInput = async () => {
    if (!taskState) return;
    await updateTask(taskState.id as number, value, false, taskState.userId);

    setTask((prev) => ({
      ...prev,
      name: value,
    }));
  };

  const handleUserSelect = async (e: React.MouseEvent) => {
    const target = e.target as HTMLLIElement;
    if (target.tagName !== 'LI' || !taskState) return;
    const selectedUser = userListWithId.find((v) => v.index === target.value);
    if (!selectedUser) return;
    await updateTask(Number(taskState.id), value, false, selectedUser.id);
    setTask((prev) => ({
      ...prev,
      user: selectedUser.name,
      userImage: selectedUser.imageURL,
      userId: target.value,
    }));
  };

  return (
    <Styled.KanbanTaskWrapper>
      <input
        type="text"
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
            list={userListWithId}
            handleClick={handleUserSelect}
          />
        </Styled.MemberContainer>
      ) : (
        <Styled.DropdownWrapper>
          <DropDown list={userListWithId} handleClick={handleUserSelect} isMeatBall={true} />
        </Styled.DropdownWrapper>
      )}
    </Styled.KanbanTaskWrapper>
  );
};

export default KanbanTask;
