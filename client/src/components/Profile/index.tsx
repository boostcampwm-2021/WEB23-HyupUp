import { Styled } from '@/components/Profile/style';
import React, { useState, useRef } from 'react';
import useOutSideClick from '@/lib/hooks/useOutSideClick';
import { useUserDispatch } from '@/lib/hooks/useContextHooks';
import { useSocketSendUser } from '@/lib/hooks';
import { logOut } from '@/lib/api/user';
import { useRecoilValue } from 'recoil';
import userAtom from '@/recoil/user';
import * as avatar from '@/lib/common/avatar';
import { ImageType } from '@/types/image';

const Profile = () => {
  const [openState, setOpenState] = useState(false);
  const userState = useRecoilValue(userAtom);
  const userDispatch = useUserDispatch();
  const toggleDropDown = () => setOpenState((openState) => !openState);
  const handleOutClick = () => setOpenState((openState) => !openState);
  const emitLogout = useSocketSendUser('LOGOUT');
  const handleLogout = async () => {
    emitLogout(userState.id);
    userDispatch({ type: 'LOGOUT' });
    await logOut();
    location.pathname = '/';
  };
  const ref = useRef(null);

  useOutSideClick(ref, handleOutClick);
  return (
    <Styled.Profile>
      <img onClick={toggleDropDown} src={avatar[userState.imageURL as ImageType]}></img>
      {openState && (
        <div className="list-container" ref={ref}>
          <ul className="dropdown-list">
            <li>{userState.name}</li>
            <li className="logout" onClick={handleLogout}>
              로그아웃
            </li>
          </ul>
        </div>
      )}
    </Styled.Profile>
  );
};

export default Profile;
