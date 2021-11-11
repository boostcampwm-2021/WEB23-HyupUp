import { getUsersByOrganization, UserProfile } from '@/lib/api/user';
import { useUserState } from '@/lib/hooks/useContextHooks';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Avator from './avator';
import * as S from './style';

const CoworkerStatus = () => {
  const [usersList, usersListHandler] = useState<Array<UserProfile>>([]);
  const userState = useUserState();
  useEffect(() => {
    (async () => {
      const users = await getUsersByOrganization(1);
      console.log(users);
      usersListHandler(users);
    })();
  }, []);
  return (
    <S.Container>
      {usersList.map((el, i) => (
        <S.StatusContainer key={i}>
          <Avator src={el.imageURL} />
          <S.Name>{el.name}</S.Name>
        </S.StatusContainer>
      ))}
    </S.Container>
  );
};
export default CoworkerStatus;
