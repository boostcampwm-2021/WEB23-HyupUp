import React, { ReactNode } from 'react';
import * as S from './style';

interface TeamManagementItemProps {
  imageURL: string;
  name: string;
  job: string;
  admin: boolean;
  dropDown: ReactNode;
}

const TeamManagementItem = ({ imageURL, name, job, admin, dropDown }: TeamManagementItemProps) => {
  return (
    <S.ItemContainer>
      <S.Avatar src={imageURL} />
      <S.TextContainer>
        <S.Text>{name}</S.Text>
        <S.Text>{job}</S.Text>
        {admin ? <S.Text>관리자</S.Text> : <S.Text>팀원</S.Text>}
      </S.TextContainer>
      {dropDown}
    </S.ItemContainer>
  );
};

export default TeamManagementItem;
