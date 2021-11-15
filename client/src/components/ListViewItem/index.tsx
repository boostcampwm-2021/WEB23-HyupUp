import React from 'react';
import Styled from '@/components/ListViewItem/style';
import { TaskProp } from '@/layers/ListView';
import Button from '@/lib/design/Button';

const ListViewItem = ({ task }: { task: TaskProp }) => {
  return (
    <Styled.Container>
      <Styled.Title>{task.project ? task.project.name : 'TODO'}</Styled.Title>
      <Styled.Content>{task.name}</Styled.Content>
      <Button size="small" category="default" onClick={() => console.log()}>
        완료
      </Button>
    </Styled.Container>
  );
};

export default ListViewItem;
