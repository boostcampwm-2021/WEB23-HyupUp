import React from 'react';
import * as S from './style';

interface BackLogTaskProps {
  name: string;
  task: string;
  imageURL: string;
}

const BackLogTask = ({ name, task, imageURL }: BackLogTaskProps) => {
  return (
    <S.ItemContainer>
      <S.Text>{task}</S.Text>
      <S.UserProfile>
        <S.Avatar src={imageURL} />
        <S.Text>{name}</S.Text>
      </S.UserProfile>
    </S.ItemContainer>
  );
};

export default BackLogTask;
