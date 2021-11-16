import React from 'react';
import * as S from './style';

const Avatar = ({ src, status }: { src: string; status: boolean }) => {
  return (
    <S.AvatarContainer>
      <S.AvatarImage src={src} />
      <S.AvatarStatus isOnline={status} />
    </S.AvatarContainer>
  );
};

export default Avatar;
