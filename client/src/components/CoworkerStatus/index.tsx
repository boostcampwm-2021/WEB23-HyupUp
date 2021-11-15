import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { getUsersByOrganization, UserProfile } from '@/lib/api/user';
import { useUserState } from '@/lib/hooks/useContextHooks';
import useSocketSend from '@/lib/hooks/useSocketSend';
import useSocketReceive from '@/lib/hooks/useSocketReceive';

import Avator from './Avator';
import * as S from './style';

interface UserStatus extends UserProfile {
  status: boolean;
}

const CoworkerStatus = () => {
  const [usersList, usersListHandler] = useState<Array<UserStatus>>([]);
  const [usersIdList, usersIdListHandler] = useState<Array<number>>([]);
  const socketSend = useSocketSend('LOGIN');
  const userState = useUserState();

  useSocketReceive('LOGIN_CALLBACK', (userIds: Array<number>) => {
    usersIdListHandler(userIds);
  });

  useSocketReceive('ON', (userId: number) => {
    usersIdListHandler([...usersIdList, userId]);
  });

  useSocketReceive('OFF', (userId: number) => {
    usersIdListHandler(usersIdList.filter((el) => el !== userId));
  });

  useEffect(() => {
    socketSend(userState.id as number);
  }, [userState]);

  useEffect(() => {
    (async () => {
      const users = await getUsersByOrganization(userState.organization as number);
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
      usersListHandler(updateUsers);
    })();
  }, [usersIdList]);

  return (
    <S.Container>
      {usersList.map((el) => (
        <S.StatusContainer key={el.index}>
          <Avator src={el.imageURL} status={el.status} />
          <S.Name>{el.name}</S.Name>
        </S.StatusContainer>
      ))}
    </S.Container>
  );
};
export default CoworkerStatus;
