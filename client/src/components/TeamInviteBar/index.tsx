import React, { useState, ChangeEvent } from 'react';

import { Button } from '@/lib/design';

import * as S from './style';

const TeamInviteBar = () => {
  const [value, setValue] = useState('');
  const [flag, setFlag] = useState(true);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    // to-do email 형식으로 value 확인
    if (e.target.value) return;
    const newFlag = !flag;
    setValue(e.target.value);
    setFlag(newFlag);
  };

  const onClick = () => {
    const newFlag = !flag;
    setFlag(newFlag);
    // to-do email api 넣기
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
