import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { getUsersByOrganization, UserProfile } from '@/lib/api/user';
import { useUserState } from '@/lib/hooks/useContextHooks';
import useSocketSend from '@/lib/hooks/useSocketSend';
import useSocketReceive from '@/lib/hooks/useSocketReceive';

import Avator from '@/components/CoworkerStatusItem/Avator';
import * as S from './style';
import StatusTitle from '@/components/CoworkerStatusItem/StatusTitle';

interface UserStatus extends UserProfile {
  status: boolean;
}

interface userSocketInstance {
  sid: string;
  userId: number;
}

const CoworkerStatus = () => {
  const [usersList, usersListHandler] = useState<Array<UserStatus>>([]);
  const [usersIdList, usersIdListHandler] = useState<Array<number>>([]);
  const [users, usersHandler] = useState<Array<UserProfile>>([]);
  const socketSend = useSocketSend('LOGIN');
  const userState = useUserState();

  useSocketReceive('LOGIN_CALLBACK', (userIds: Array<userSocketInstance>) => {
    const ids = userIds.map((el) => el.userId);
    usersIdListHandler(ids);
  });

  useSocketReceive('ON', (userId: number) => {
    usersIdListHandler([...usersIdList, userId]);
  });

  useSocketReceive('OFF', (userId: number) => {
    usersIdListHandler(usersIdList.filter((el) => el !== userId));
  });

  // todo error 발생 원인 찾기
  useEffect(() => {
    socketSend(userState.id as number);
  }, [userState]);

  useEffect(() => {
    (async () => {
      const users = await getUsersByOrganization(userState.organization as number);
      usersHandler([...users]);
    })();
  }, [userState.organization]);

  useEffect(() => {
    const usersWithOutMe = users.filter((el) => el.index !== userState.id);
    const updateUsers = usersWithOutMe.map((el) => {
      if (usersIdList.includes(el.index))
        return {
          ...el,
          status: true,
        };
      return {
        ...el,
        status: false,
      };
    });
    const logInUsers = updateUsers.filter((el) => el.status === true);
    const logOutUsers = updateUsers.filter((el) => el.status === false);
    usersListHandler([...logInUsers, ...logOutUsers]);
  }, [userState.id, users, usersIdList]);

  return (
    <S.Container>
      <StatusTitle />
      <S.UsersContainer>
        {usersList.map((el) => (
          <S.StatusContainer key={el.index}>
            <Avator src={el.imageURL} status={el.status} />
            <S.Name>{el.name}</S.Name>
          </S.StatusContainer>
        ))}
      </S.UsersContainer>
    </S.Container>
  );
};
export default CoworkerStatus;
