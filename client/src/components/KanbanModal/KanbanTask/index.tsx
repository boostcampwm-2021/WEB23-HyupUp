import React, { useState } from 'react';
import Styled from './style';
import { BackLogTaskProps } from '@/types/task';
import { ImageType } from '@/types/image';
import * as avatar from '@/lib/common/avatar';
import { useInput } from '@/lib/hooks';
import { postTask } from '@/lib/api/task';
import { useRecoilValue } from 'recoil';
import { userListAtom } from '@/recoil/user';
import userAtom from '@/recoil/user';
import { DropDown } from '@/lib/design';

interface TaskProps {
  id: number;
  name: string;
  user?: string;
  userImage?: string;
}

const KanbanTask = ({ task, storyId }: { task: TaskProps; storyId: number }) => {
  const { key, value, onChange } = useInput(task.name);
  const userState = useRecoilValue(userAtom);
  const [isFirstCreate, setFirst] = useState(false);
  const [taskState, setTaskState] = useState<TaskProps>(task);
  const userListState = useRecoilValue(userListAtom);
  const userListwithId = userListState.map((value) => {
    return { ...value, id: value.index };
  });

  const handleInput = async () => {
    if (!value) return;
    if (!isFirstCreate) {
      await postTask(value, 1, storyId, null, userState.currentProjectId);
      setFirst(true);
    }
  };

  const handleUserSelect = (e: React.MouseEvent) => {
    const target = e.target as HTMLLIElement;
    if (target.tagName !== 'LI') return;
    const selectedUser = userListwithId.find((v) => v.index === target.value);
    if (!selectedUser || !selectedUser?.name) return;
    setTaskState((prev) => ({
      ...prev,
      user: selectedUser.name,
      userImage: selectedUser?.imageURL,
    }));
  };

  return (
    <Styled.KanbanTaskWrapper>
      <input value={value} onBlur={handleInput} placeholder={'Type A Task'} onChange={onChange} />
      <Styled.MemberContainer>
        {taskState.user ? (
          <p>
            <img src={avatar[taskState.userImage as ImageType]} alt="userimage" />
            <span>{taskState.user}</span>
          </p>
        ) : (
          <DropDown list={userListwithId} handleClick={handleUserSelect} isMeatBall={true} />
        )}
      </Styled.MemberContainer>
    </Styled.KanbanTaskWrapper>
  );
};

export default KanbanTask;
