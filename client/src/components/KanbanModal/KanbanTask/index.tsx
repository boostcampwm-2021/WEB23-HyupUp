import React from 'react';
import { KanbanTaskWrapper } from './style';
import { BackLogTaskProps } from '@/types/task';
import { useInput } from '@/lib/hooks';
import { useRecoilValue } from 'recoil';
import userAtom from '@/recoil/user';
import * as avatar from '@/lib/common/avatar';
import { ImageType } from '@/types/image';

const KanbanTask = ({ task }: { task: BackLogTaskProps }) => {
  const { key, value, onChange } = useInput(task.name);
  const userState = useRecoilValue(userAtom);

  console.log(task);
  return (
    <KanbanTaskWrapper>
      <input value={value} placeholder={'Type A Task'} onChange={onChange} />
      <p>
        <img src={avatar[task.userImage as ImageType]} alt="userimage" />
        <span>{task.user}</span>
      </p>
    </KanbanTaskWrapper>
  );
};

export default KanbanTask;
