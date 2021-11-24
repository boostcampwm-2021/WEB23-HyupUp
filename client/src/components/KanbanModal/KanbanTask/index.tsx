import React from 'react';
import { BackLogTaskProps } from '@/types/task';

const KanbanTask = ({ task }: { task: BackLogTaskProps }) => {
  return <div>{task.name}</div>;
};

export default KanbanTask;
