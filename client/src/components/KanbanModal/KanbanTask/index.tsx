import React from 'react';
import { KanbanTaskWrapper } from './style';
import { BackLogTaskProps } from '@/types/task';
import { useInput } from '@/lib/hooks';
import { useRecoilValue } from 'recoil';
import userAtom from '@/recoil/user';
import avatar, { ImageType } from '@/lib/common/avatar';

const KanbanTask = ({ task }: { task: BackLogTaskProps }) => {
  const { key, value, onChange } = useInput(task.name);
  const userState = useRecoilValue(userAtom);

  return (
    <KanbanTaskWrapper>
      <input value={value} placeholder={'Type A Task'} onChange={onChange} />
      <p>
        <img src={avatar[userState.imageURL as ImageType]} alt="userimage" />
        <span>{userState.name}</span>
      </p>
    </KanbanTaskWrapper>
  );
};

export default KanbanTask;
