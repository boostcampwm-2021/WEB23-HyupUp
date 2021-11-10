/* eslint-disable react/no-children-prop */
import React, { ChangeEvent, useRef, useState } from 'react';
import * as S from './style';
import Button from '@/lib/design/Button';
import { useUserState } from '@/lib/hooks/useContextHooks';
import { createTodo } from '@/lib/api/todo';

const TodoInputBar = () => {
  const state = useUserState();
  const [buttonDisabled, buttonDisableHandler] = useState(true);
  const todoInput = useRef<HTMLInputElement>(null);
  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.value !== '') {
      buttonDisableHandler(false);
    } else {
      buttonDisableHandler(true);
    }
  };
  const clickHandler = () => {
    if (typeof state.id === 'number') {
      const target = todoInput.current as HTMLInputElement;
      const todo = createTodo(target.value, state.id);
      // to-do user의 task에 todo 결과 넣기
      target.value = '';
      buttonDisableHandler(true);
    }
  };

  return (
    <S.TodoInputBarContainer>
      <S.InputBox ref={todoInput} placeholder="할 일을 입력하세요." onChange={inputHandler} />
      <Button
        category="cancel"
        size="small"
        children={'할 일 추가하기'}
        onClick={clickHandler}
        disabled={buttonDisabled}
      />
    </S.TodoInputBarContainer>
  );
};

export default TodoInputBar;
