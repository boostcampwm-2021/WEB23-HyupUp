import { Styled } from '@/lib/common/Profile/style';
import React, { useState, useRef } from 'react';
import useOutSideClick from '@/lib/hooks/useOutSideClick';

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);
  const logOutHandler = () => console.log('Logout');
  const ref = useRef(null);

  const handleOutClick = () => {
    toggling();
  };

  useOutSideClick(ref, handleOutClick);
  return (
    <Styled.Profile>
      <section onClick={toggling}></section>
      {isOpen && (
        <div className="list-container" ref={ref}>
          <ul className="dropdown-list">
            <li>이름</li>
            <li className="logout" onClick={logOutHandler}>
              로그아웃
            </li>
          </ul>
        </div>
      )}
    </Styled.Profile>
  );
};

export default Profile;
