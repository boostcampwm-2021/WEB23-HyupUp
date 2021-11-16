import React from 'react';
import S from './style';
import arrow from '@public/icons/chevron-down.svg';
import { useState } from 'react';

const BackLogItem = ({ name }: { name: string }) => {
  const [isClick, isClickHandler] = useState(false);
  const clickEventListener = () => {
    isClickHandler(!isClick);
  };
  return (
    <S.ItemContainer>
      <S.StoryText>{name}</S.StoryText>
      <S.ToggleButton onClick={clickEventListener}>
        <S.ToggleImg src={arrow} check={isClick} />
      </S.ToggleButton>
    </S.ItemContainer>
  );
};

export default BackLogItem;
