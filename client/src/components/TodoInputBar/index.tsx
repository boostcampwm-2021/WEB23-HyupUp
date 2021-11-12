import React, { ChangeEvent, useRef, useState } from 'react';
import * as S from './style';
import Button from '@/lib/design/Button';
import { useUserDispatch, useUserState } from '@/lib/hooks/useContextHooks';
import { createTodo } from '@/lib/api/todo';

const TodoInputBar = () => {
  const userState = useUserState();
  const userDispatch = useUserDispatch();

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
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (typeof userState.id === 'number') {
      const target = todoInput.current as HTMLInputElement;
      const todo = await createTodo(target.value, userState.id);
      if (todo) {
        userDispatch({ type: 'ADD_PRIVATE_TASK', payload: todo });
      }
      target.value = '';
      buttonDisableHandler(true);
    }
  };

  return (
    <S.TodoInputBarContainer onSubmit={submitHandler}>
      <S.InputBox ref={todoInput} placeholder="할 일을 입력하세요." onChange={inputHandler} />
      <Button
        category="cancel"
        size="small"
        onClick={() => {
          return;
        }}
        disabled={buttonDisabled}
      >
        {'할 일 추가하기'}
      </Button>
    </S.TodoInputBarContainer>
  );
};

export default TodoInputBar;
