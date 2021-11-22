import React from 'react';
import * as S from './style';
import { DropDown } from '@/lib/design';
import dots from '@public/icons/more_horiz.svg';
import TeamManagementItem from '@/components/TeamManagementItem';
import { useRecoilValue } from 'recoil';
import userAtom from '@/recoil/user';
import { useEffect } from 'react';
import { useState } from 'react';
import { getUsersByOrganization, UserProfile } from '@/lib/api/user';
import TeamInviteBar from '@/components/TeamInviteBar';

const dropDownListForAdmin = [
  {
    id: 1,
    name: '팀원에서 제외',
  },
  {
    id: 2,
    name: '팀원으로 변경',
  },
];

const dropDownListForMember = [
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
  const userState = useRecoilValue(userAtom);
  const [userList, setUserList] = useState<Array<UserProfile>>([]);
  useEffect(() => {
    (async () => {
      const newUserList = await getUsersByOrganization(userState.organization as number);
      setUserList(newUserList);
    })();
  }, [userState.organization]);
  return (
    <S.Container>
      <TeamInviteBar />
      <S.ItemListViewer>
        {userList.map((el) => (
          <TeamManagementItem
            key={el.index}
            imageURL={el.imageURL}
            name={el.name}
            job={el.job}
            admin={el.admin}
            dropDown={
              <DropDown
                Title={<S.ThreeDot src={dots} />}
                list={el.admin ? dropDownListForAdmin : dropDownListForMember}
                handleClick={(e) => e}
              />
            }
          />
        ))}
      </S.ItemListViewer>
    </S.Container>
  );
};
