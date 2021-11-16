import React from 'react';
import group from '@public/icons/group.svg';
import * as S from './style';

const StatusTitle = () => {
  return (
    <S.TitleContainer>
      <S.Icon src={group} />
      <S.Title>{'출근한 동료들'}</S.Title>
    </S.TitleContainer>
  );
};

export default StatusTitle;
