import React, { useEffect, useState } from 'react';
import { getUsersByOrganization } from '@/lib/api/user';
import { UserProfile } from '@/types/users';
import useSocketReceive from '@/lib/hooks/useSocketReceive';
import Avatar from '@/components/CoworkerStatusItem/Avatar';
import * as S from './style';
import StatusTitle from '@/components/CoworkerStatusItem/StatusTitle';
import { useRecoilValue } from 'recoil';
import userAtom from '@/recoil/user';
import * as avatar from '@/lib/common/avatar';
import { ImageType } from '@/types/image';

interface UserStatus extends UserProfile {
  status: boolean;
}

interface UserSocketInstance {
  sid: string;
  userId: number;
}

const CoworkerStatus = () => {
  const [usersList, setUsersList] = useState<Array<UserStatus>>([]);
  const [usersIdList, setUsersIdList] = useState<Array<number>>([]);
  const [users, setUsers] = useState<Array<UserProfile>>([]);
  const userState = useRecoilValue(userAtom);

  useSocketReceive('LOGIN_CALLBACK', (userInfo: Array<UserSocketInstance>) => {
    if (userInfo.length === 0) return;
    const ids = userInfo.map((el) => el.userId);
    setUsersIdList(ids);
  });

  useSocketReceive('ON', (userId: number) => {
    setUsersIdList([...usersIdList, userId]);
  });

  useSocketReceive('OFF', (userId: number) => {
    setUsersIdList(usersIdList.filter((el) => el !== userId));
  });

  useEffect(() => {
    (async () => {
      const users = await getUsersByOrganization(userState.organization as number);
      setUsers([...users]);
    })();
  }, [userState.organization]);

  useEffect(() => {
    const usersWithOutMe = users.filter((el) => el.index !== userState.id);
    const updateUsers = usersWithOutMe.map((el) => ({
      ...el,
      status: usersIdList.includes(el.index),
    }));

    const sorted = updateUsers.sort((a, b) => {
      if (a.status && !b.status) return -1;
      if (!a.status && b.status) return 1;
      return -1;
    });

    setUsersList(sorted);
  }, [userState.id, users, usersIdList]);

  return (
    <S.Container>
      <StatusTitle />
      <S.UsersContainer>
        {usersList.map((el) => (
          <S.StatusContainer key={el.index}>
            <Avatar src={avatar[el.imageURL as ImageType]} status={el.status} />
            <S.Name>{el.name}</S.Name>
          </S.StatusContainer>
        ))}
      </S.UsersContainer>
    </S.Container>
  );
};
export default CoworkerStatus;
