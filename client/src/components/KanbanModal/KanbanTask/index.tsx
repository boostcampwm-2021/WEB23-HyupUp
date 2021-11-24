import React from 'react';
import { KanbanTaskWrapper } from './style';
import { BackLogTaskProps } from '@/types/task';

const KanbanTask = ({ task }: { task: BackLogTaskProps }) => {
  console.log(task);
  return (
    <KanbanTaskWrapper>
      <h4>{task.name}</h4>
      <p>
        <img src={task.userImage} alt="userimage" />
        <span>{task.user}</span>
      </p>
    </KanbanTaskWrapper>
  );
};

export default KanbanTask;
