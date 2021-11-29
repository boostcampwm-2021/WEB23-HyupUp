import React, { useState } from 'react';

import { UserProfile } from '@/types/users';
import { Button, DropDown, Spinner } from '@/lib/design';

import TeamManagementItem from '../TeamManagementItem';

import * as S from './style';
import SearchBar from '@/lib/design/SearchBar';

const dropDownListForUser = (admin: boolean) => [
  {
    id: 1,
    name: '팀원에서 제외',
  },
  {
    id: 2,
    name: admin ? '팀원으로 변경' : '관리자로 변경',
  },
];

const generateUserProfileItem = (
  list: Array<UserProfile>,
  showEditModal: (e: React.MouseEvent, index: number) => void,
) =>
  list.map((el) => (
    <TeamManagementItem key={el.index} {...el}>
      {
        <DropDown
          isMeatBall
          list={dropDownListForUser(el.admin)}
          handleClick={(e) => {
            showEditModal(e, el.index);
          }}
        />
      }
    </TeamManagementItem>
  ));

export const TeamItemViewer = ({
  onModalButtonClick,
  showEditModal,
  userProfileList,
}: {
  onModalButtonClick: () => void;
  showEditModal: (e: React.MouseEvent, index: number) => void;
  userProfileList: Array<UserProfile>;
}) => {
  const [userName, setUserName] = useState('');
  const [filterdUserList, setFilteredUserList] = useState<Array<UserProfile>>([]);

  const searchUserByName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUserName = e.target.value;
    setUserName(newUserName);
    if (userProfileList.length === 0) return;
    const newUserList = userProfileList.filter((el) => new RegExp(newUserName, 'i').test(el.name));
    setFilteredUserList(newUserList);
  };

  return (
    <>
      <S.SearchBarContainer>
        <SearchBar
          value={userName}
          onChange={searchUserByName}
          placeholder="찾으시는 팀원의 이름을 입력하세요."
          onSubmit={(e) => {
            e.preventDefault();
          }}
        />
      </S.SearchBarContainer>
      <div>
        <Button category="confirm" size="small" onClick={onModalButtonClick} type="button">
          팀원 초대하기
        </Button>
      </div>
      {userProfileList.length !== 0 ? (
        filterdUserList.length === 0 && userName === '' ? (
          generateUserProfileItem(userProfileList, showEditModal)
        ) : (
          generateUserProfileItem(filterdUserList, showEditModal)
        )
      ) : (
        <Spinner heightValue={500} />
      )}
    </>
  );
};
