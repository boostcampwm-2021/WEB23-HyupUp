import React from 'react';

import { Button } from '@/lib/design';
import rightArrow from '@public/icons/arrow-right.svg';
import * as S from './style';
import * as avatar from '@/lib/common/avatar';
import { ImageType } from '@/types/image';

const MAXINDEX = 16;

const AvatarForm = ({
  gender,
  setGender,
  avatarIndex,
  setAvatarIndex,
}: {
  gender: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  avatarIndex: number;
  setAvatarIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const changeGender = () => (gender === 'Boy' ? setGender('Girl') : setGender('Boy'));

  const clickLeft = () =>
    !avatarIndex ? setAvatarIndex(MAXINDEX) : setAvatarIndex((prev) => prev - 1);

  const clickRight = () =>
    avatarIndex === MAXINDEX ? setAvatarIndex(0) : setAvatarIndex((prev) => prev + 1);

  return (
    <S.AvatarSelectContainer>
      <button onClick={clickLeft}>
        <S.LeftArrow src={rightArrow} color="red" />
      </button>
      <S.AvatarContainer>
        <S.Avatar src={avatar[(`${gender}${avatarIndex}` as unknown) as ImageType]}></S.Avatar>
        <Button type="button" category="default" size="small" onClick={changeGender}>
          {gender}
        </Button>
      </S.AvatarContainer>
      <button onClick={clickRight}>
        <S.RightArrow src={rightArrow} alt="" />
      </button>
    </S.AvatarSelectContainer>
  );
};

export default AvatarForm;
