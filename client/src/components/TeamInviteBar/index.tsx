import React, { useState, ChangeEvent } from 'react';

import { Button } from '@/lib/design';

import * as S from './style';
import { sendEmail } from '@/lib/api/email';
import { useRecoilValue } from 'recoil';
import userAtom from '@/recoil/user';

const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

const TeamInviteBar = () => {
  const [value, setValue] = useState('');
  const [flag, setFlag] = useState(true);
  const userState = useRecoilValue(userAtom);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!regExp.test(e.target.value)) return;
    if (!flag) return;
    const newFlag = !flag;
    setValue(e.target.value);
    setFlag(newFlag);
  };

  const onClick = () => {
    const newFlag = !flag;
    setFlag(newFlag);
    setValue('');
    sendEmail(userState.organization as number, value);
  };

  return (
    <S.EmailInputBarContainer>
      <Button category="confirm" size="small" disabled={flag} onClick={onClick}>
        초대하기
      </Button>
      <S.InputBox placeholder="초대할 사람의 이메일을 입력하세요." onChange={onChange} />
    </S.EmailInputBarContainer>
  );
};

export default TeamInviteBar;
