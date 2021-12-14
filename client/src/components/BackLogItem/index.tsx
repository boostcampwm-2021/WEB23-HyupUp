import React, { useEffect, useState } from 'react';
import { useRecoilRefresher_UNSTABLE } from 'recoil';
import S from './style';
import arrow from '@public/icons/chevron-down.svg';

import { tasksSelector } from '@/recoil/story';
import BackLogTaskContainer from '../BackLogTaskContainer';

const BackLogItem = ({ name, id }: { name: string; id: number }) => {
  const [clicked, setClicked] = useState(false);

  const refresh = useRecoilRefresher_UNSTABLE(tasksSelector(id));
  useEffect(() => {
    return refresh();
  }, [refresh]);

  const clickEventListener = () => {
    const newClicked = !clicked;
    setClicked(newClicked);
    if (!newClicked) return;
  };

  return (
    <div>
      <S.ItemContainer>
        <S.StoryText>{name}</S.StoryText>
        <S.ToggleButton onClick={clickEventListener}>
          <S.ToggleImg src={arrow} click={clicked} />
        </S.ToggleButton>
      </S.ItemContainer>
      {clicked && <BackLogTaskContainer storyId={id} />}
    </div>
  );
};

export default BackLogItem;
