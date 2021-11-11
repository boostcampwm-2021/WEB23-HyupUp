import React from 'react';
import * as S from './style';

const Avator = ({ src }: { src: string }) => {
  return (
    <S.AvatorContainer>
      <S.AvatorImage src={src} />
      <S.AvatorStatus backgroundColor={'green300'} />
    </S.AvatorContainer>
  );
};

export default Avator;
