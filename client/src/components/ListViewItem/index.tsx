import React, { useMemo } from 'react';
import projectIcon from '@public/icons/project-icon.svg';
import personalIcon from '@public/icons/personal-icon.svg';
import Styled from '@/components/ListViewItem/style';
import Button from '@/lib/design/Button';
import { AllTask } from '@/types/task';

interface ListItemProp {
  task: AllTask;
  onClickMethod: (task: AllTask) => Promise<void>;
}

const maxViewLength = 50;

const ListViewItem = ({ task, onClickMethod }: ListItemProp) => {
  const buttonComponent = useMemo(() => {
    if (!task.status) {
      return (
        <Button
          size="small"
          category="default"
          onClick={() => {
            onClickMethod(task);
          }}
        >
          완료
        </Button>
      );
    } else if (!task.projectId) {
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
        <img src={task.projectId ? projectIcon : personalIcon} />
        <h3>{task.projectId ? 'PROJECT' : 'PERSONAL'}</h3>
      </Styled.Title>
      <Styled.Content>
        {task.name.length < maxViewLength ? task.name : task.name.slice(0, maxViewLength) + '...'}
      </Styled.Content>
      {buttonComponent}
    </Styled.Container>
  );
};

export default ListViewItem;
