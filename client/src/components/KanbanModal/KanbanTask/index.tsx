import React from 'react';
import { KanbanTaskWrapper } from './style';
import { BackLogTaskProps } from '@/types/task';

const KanbanTask = ({ task }: { task: BackLogTaskProps }) => {
  return <KanbanTaskWrapper>{task.name}</KanbanTaskWrapper>;
};

export default KanbanTask;
