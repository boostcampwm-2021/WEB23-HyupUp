import React from 'react';
import * as S from './style';
import { DropDown } from '@/lib/design';
import dots from '@public/icons/more_horiz.svg';
import TeamManagementItem from '@/components/TeamManagementItem';

const dropDownList = [
  {
    id: 1,
    name: '팀원에서 제외',
  },
  {
    id: 2,
    name: '관리자로 변경',
  },
];

export const GroupManagement = () => {
  return (
    <S.Container>
      <S.ItemListViewer>
        <TeamManagementItem
          imageURL="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
          name="이찬호"
          job="개발자"
          admin={true}
          dropDown={
            <DropDown
              Title={<S.ThreeDot src={dots} />}
              list={dropDownList}
              handleClick={(e) => e}
            />
          }
        />
        <TeamManagementItem
          imageURL="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
          name="이찬호"
          job="BIZ HR"
          admin={true}
          dropDown={
            <DropDown
              Title={<S.ThreeDot src={dots} />}
              list={dropDownList}
              handleClick={(e) => e}
            />
          }
        />
      </S.ItemListViewer>
    </S.Container>
  );
};
