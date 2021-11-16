import React, { useState } from 'react';
import S from './style';
import arrow from '@public/icons/chevron-down.svg';
import BackLogTask from '../BackLogTask';
import { getTasksByStoryId } from '@/lib/api/task';
import { TaskProps } from '@/lib/api/task';

const BackLogItem = ({ name, id }: { name: string; id: number }) => {
  const [isClick, isClickHandler] = useState(false);
  const [tasks, setTasks] = useState<Array<TaskProps>>([]);
  const clickEventListener = async () => {
    isClickHandler(!isClick);
    if (isClick === true) return;
    setTasks(await getTasksByStoryId(id));
  };
  return (
    <div>
      <S.ItemContainer>
        <S.StoryText>{name}</S.StoryText>
        <S.ToggleButton onClick={clickEventListener}>
          <S.ToggleImg src={arrow} check={isClick} />
        </S.ToggleButton>
      </S.ItemContainer>
      <S.TaskContainer check={isClick}>
        {tasks.map((el) => (
          <BackLogTask key={el.id} name={el.user} imageURL={el.userImage} task={el.name} />
        ))}
      </S.TaskContainer>
    </div>
  );
};

export default BackLogItem;
