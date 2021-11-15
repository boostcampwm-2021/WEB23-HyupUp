import React from 'react';
import * as S from './style';

const Avator = ({ src, status }: { src: string; status: boolean }) => {
  return (
    <S.AvatorContainer>
      <S.AvatorImage src={src} />
      <S.AvatorStatus status={status} />
    </S.AvatorContainer>
  );
};

export default Avator;
