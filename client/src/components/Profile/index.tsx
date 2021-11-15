import { Styled } from '@/components/Profile/style';
import React, { useState, useRef } from 'react';
import useOutSideClick from '@/lib/hooks/useOutSideClick';

const Profile = () => {
  const [openState, setOpenState] = useState(false);
  const toggleDropDown = () => setOpenState((openState) => !openState);
  const handleOutClick = () => setOpenState((openState) => !openState);
  const handleLogout = () => console.log('Logout');
  const ref = useRef(null);

  useOutSideClick(ref, handleOutClick);
  return (
    <Styled.Profile>
      <section onClick={toggleDropDown}></section>
      {openState && (
        <div className="list-container" ref={ref}>
          <ul className="dropdown-list">
            <li>이름</li>
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
