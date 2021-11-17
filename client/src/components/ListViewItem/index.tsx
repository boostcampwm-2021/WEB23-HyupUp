import React, { useMemo } from 'react';
import projectIcon from '@public/icons/project-icon.svg';
import personalIcon from '@public/icons/personal-icon.svg';
import Styled from '@/components/ListViewItem/style';
import { TaskProp } from '@/layers/ListView';
import Button from '@/lib/design/Button';

interface ListItemProp {
  task: TaskProp;
  onClickMethod: (task: TaskProp) => void;
}

const ListViewItem = ({ task, onClickMethod }: ListItemProp) => {
  const buttonComponent = useMemo(() => {
    if (!task.status) {
      return (
        <Button size="small" category="default" onClick={() => onClickMethod(task)}>
          완료
        </Button>
      );
    } else if (!task.project) {
      return (
        <Button size="small" category="confirm" onClick={() => onClickMethod(task)}>
          삭제
        </Button>
      );
    }
  }, [task, onClickMethod]);

  return (
    <Styled.Container>
      <Styled.Title>
        <img src={task.project ? projectIcon : personalIcon} />
        <h3>{task.project ? 'PROJECT' : 'PERSONAL'}</h3>
      </Styled.Title>
      <Styled.Content>{task.name}</Styled.Content>
      {buttonComponent}
    </Styled.Container>
  );
};

export default ListViewItem;
