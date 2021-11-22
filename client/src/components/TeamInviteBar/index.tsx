import React, { useState, ChangeEvent, FormEvent } from 'react';

import { Button } from '@/lib/design';

import * as S from './style';
import { sendEmail } from '@/lib/api/email';
import { useRecoilValue } from 'recoil';
import userAtom from '@/recoil/user';

const TeamInviteBar = ({ onCloseClick }: { onCloseClick: (e: React.MouseEvent) => void }) => {
  const [value, setValue] = useState('');
  const userState = useRecoilValue(userAtom);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendEmail(userState.organization as number, value);
    setValue('');
  };

  return (
    <S.EmailInputBarContainer onSubmit={onSubmit}>
      <S.InputBox
        placeholder="이메일을 여기에 입력하세요."
        onChange={onChange}
        value={value}
        type="email"
      />
      <S.ButtonContainer>
        <Button size="small" category="cancel" onClick={onCloseClick} type="button">
          취소
        </Button>
        <Button size="small" category="confirm" type="submit">
          발송
        </Button>
      </S.ButtonContainer>
    </S.EmailInputBarContainer>
  );
};

export default TeamInviteBar;
