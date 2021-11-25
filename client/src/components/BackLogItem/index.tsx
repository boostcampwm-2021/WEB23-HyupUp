import React, { useState } from 'react';
import S from './style';
import arrow from '@public/icons/chevron-down.svg';
import BackLogTask from '../BackLogTask';
import { getTasksByStoryId } from '@/lib/api/task';
import { BackLogTaskProps } from '@/types/task';
import avatar, { ImageType } from '@/lib/common/avatar';

const BackLogItem = ({ name, id }: { name: string; id: number }) => {
  const [clicked, setClicked] = useState(false);
  const [tasks, setTasks] = useState<Array<BackLogTaskProps>>([]);
  const clickEventListener = async () => {
    const newClicked = !clicked;
    setClicked(newClicked);
    if (!newClicked) return;
    const newTasks = await getTasksByStoryId(id);
    setTasks(newTasks ?? []);
  };
  return (
    <div>
      <S.ItemContainer>
        <S.StoryText>{name}</S.StoryText>
        <S.ToggleButton onClick={clickEventListener}>
          <S.ToggleImg src={arrow} click={clicked} />
        </S.ToggleButton>
      </S.ItemContainer>
      <S.TaskContainer click={clicked}>
        {tasks.map((el) => (
          <BackLogTask
            key={el.id}
            name={el.user}
            imageURL={avatar[el.userImage as ImageType]}
            task={el.name}
          />
        ))}
      </S.TaskContainer>
    </div>
  );
};

export default BackLogItem;
