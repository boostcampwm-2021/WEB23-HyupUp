import React, { useEffect, useState } from 'react';

import { getUsersByOrganization, UserProfile } from '@/lib/api/user';
import { Button, DropDown } from '@/lib/design';

import TeamManagementItem from '../TeamManagementItem';
import dots from '@public/icons/more_horiz.svg';

import * as S from './style';
import { useRecoilValue } from 'recoil';
import userAtom from '@/recoil/user';
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

const generateUser = (
  list: Array<UserProfile>,
  showEditModal: (e: React.MouseEvent, index: number) => void,
) =>
  list.map((el) => (
    <TeamManagementItem key={el.index} {...el}>
      {
        <DropDown
          Title={<S.ThreeDot src={dots} />}
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
  forceRender,
}: {
  onModalButtonClick: () => void;
  showEditModal: (e: React.MouseEvent, index: number) => void;
  forceRender: { flag: boolean };
}) => {
  const userState = useRecoilValue(userAtom);
  const [userList, setUserList] = useState<Array<UserProfile>>([]);
  const [userName, setUserName] = useState('');
  const [filterdUserList, setFilteredUserList] = useState<Array<UserProfile>>([]);

  useEffect(() => {
    (async () => {
      const newUserList = await getUsersByOrganization(userState.organization as number);
      setUserList(newUserList.filter((el) => el.index !== userState.id));
    })();
  }, [userState.id, userState.organization, forceRender]);

  const searchUserByName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUserName = e.target.value;
    setUserName(newUserName);
    if (userList.length === 0) return;
    const newUserList = userList.filter((el) => new RegExp(newUserName, 'i').test(el.name));
    setFilteredUserList(newUserList);
  };

  return (
    <>
      <S.SearchBarContainer>
        <SearchBar
          value={userName}
          onChange={searchUserByName}
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
      {filterdUserList.length === 0 && userName === ''
        ? generateUser(userList, showEditModal)
        : generateUser(filterdUserList, showEditModal)}
    </>
  );
};
