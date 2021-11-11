import React from 'react';
import { PrivateTask, ProjectTask } from '@/contexts/userContext';

const ListViewItem = ({ task }: { task: PrivateTask | ProjectTask }) => {
  return <div>{task.name}</div>;
};

export default ListViewItem;
