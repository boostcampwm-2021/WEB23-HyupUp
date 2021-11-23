import React, { ReactNode } from 'react';
import * as S from './style';

interface TeamManagementItemProps {
  imageURL: string;
  name: string;
  job: string;
  admin: boolean;
  children: ReactNode;
}

const TeamManagementItem = ({ imageURL, name, job, admin, children }: TeamManagementItemProps) => {
  return (
    <S.ItemContainer>
      <S.Avatar src={imageURL} />
      <S.TextContainer>
        <S.Text>{name}</S.Text>
        <S.Text>{job}</S.Text>
        {admin ? <S.Text>관리자</S.Text> : <S.Text>팀원</S.Text>}
      </S.TextContainer>
      {children}
    </S.ItemContainer>
  );
};

export default TeamManagementItem;
