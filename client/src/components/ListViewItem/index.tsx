import React from 'react';
import Styled from '@/components/ListViewItem/style';
import { TaskProp } from '@/layers/ListView';
import Button from '@/lib/design/Button';

interface ListItemProp {
  task: TaskProp;
  onClickMethod: (task: TaskProp) => void;
}

const ListViewItem = ({ task, onClickMethod }: ListItemProp) => {
  return (
    <Styled.Container>
      <Styled.Title>{task.project ? task.project.name : 'TODO'}</Styled.Title>
      <Styled.Content>{task.name}</Styled.Content>
      {!task.status ? (
        <Button size="small" category="default" onClick={() => onClickMethod(task)}>
          완료
        </Button>
      ) : (
        !task.project && (
          <Button size="small" category="confirm" onClick={() => onClickMethod(task)}>
            삭제
          </Button>
        )
      )}
    </Styled.Container>
  );
};

export default ListViewItem;
